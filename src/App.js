import { useState, useEffect, useRef, useCallback } from "react";
import { db } from "./firebase";
import { subjects } from "./data/index";
import useAuth from "./hooks/useAuth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { grading } from "./data/economics";
import ExamSetup from "./screens/ExamSetup";
import YearSelect from "./screens/YearSelect";
import ExamQuiz from "./screens/ExamQuiz";
import CbtQuiz from "./screens/CbtQuiz";
import Profile from "./screens/Profile";
import Feedback from "./screens/Feedback";
import { NotesCourses, NotesTopics, NotesView } from "./screens/Notes";
import { PastQCourses, PastQTopics, PastQView } from "./screens/PastQuestions";
import Settings from "./screens/Settings";
import Header from "./components/Header";
import { HomeCardSkeleton } from "./components/Skeleton";
import useOnlineStatus from "./hooks/useOnlineStatus";
import OfflineIndicator from "./components/OfflineIndicator";
import OfflineFallback from "./components/OfflineFallback";
import useStreak from "./hooks/useStreak";
import useFirebase from "./hooks/useFirebase";
import useQuiz from "./hooks/useQuiz";
import { useApp } from "./context/AppContext";
import useNotifications from "./hooks/useNotifications";
import NotificationSettings from "./screens/NotificationSettings";
import useFCM from "./hooks/useFCM";
import useToast from "./hooks/useToast";
import Toast from "./components/Toast";

// ---------------------------------------------------------------------
// UTILITIES
// ---------------------------------------------------------------------
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ---------------------------------------------------------------------
// STREAK TIERS
// ---------------------------------------------------------------------
const STREAK_TIERS = [
  { min: 100, icon: "👑", label: "Legend", color: "#9333ea", msg: "100+ days — you're unstoppable!" },
  { min: 60,  icon: "🏆", label: "Champion", color: "#dc2626", msg: "2 months straight — incredible!" },
  { min: 30,  icon: "💎", label: "Diamond", color: "#0ea5e9", msg: "30-day streak — elite student energy!" },
  { min: 21,  icon: "🔥🔥🔥", label: "On Fire", color: "#ea580c", msg: "3 weeks strong — keep the momentum!" },
  { min: 14,  icon: "🔥🔥", label: "Dedicated", color: "#f59e0b", msg: "2 weeks in — serious commitment!" },
  { min: 7,   icon: "🔥", label: "Week Streak", color: "#c8a84b", msg: "Full week! You're building a habit!" },
  { min: 3,   icon: "⚡", label: "Building", color: "#16a34a", msg: "3+ days — keep the streak alive!" },
  { min: 0,   icon: "🌟", label: "Starting", color: "#6b7280", msg: "Come back tomorrow to grow your streak!" },
];

function getStreakTier(count) {
  return STREAK_TIERS.find((t) => count >= t.min);
}

// ---------------------------------------------------------------------
// HOME CARDS
// ---------------------------------------------------------------------
const HOME_CARDS = [
  { id: "cbt",      icon: "⏱️", title: "CBT Practice",  desc: "1 hour · 50 random questions",   color: "#0d9488" },
  { id: "exam",     icon: "📝", title: "Exam Mode",      desc: "Custom time & question count",   color: "#2563eb" },
  { id: "notes",    icon: "📖", title: "Study Notes",    desc: "Key points & full explanations", color: "#16a34a" },
  { id: "pastq",    icon: "🗂️", title: "Past Questions", desc: "Study by topic with solutions",  color: "#ea580c" },
  { id: "grading",  icon: "🏆", title: "Grading System", desc: "JUPEB grade scale & points",     color: "#7c3aed" },
  { id: "settings", icon: "⚙️", title: "Settings",       desc: "Day / Night display mode",       color: "#374151" },
];

// ---------------------------------------------------------------------
// GRADE LABELS
// ---------------------------------------------------------------------
const GRADE_LABELS = [
  { min: 70, label: "Excellent! Grade A 🥳", short: "Grade A", emoji: "🏆" },
  { min: 60, label: "Very Good! Grade B 💪", short: "Grade B", emoji: "📚" },
  { min: 50, label: "Good! Grade C 📚",      short: "Grade C", emoji: "📚" },
  { min: 45, label: "Merit — Grade D",       short: "Grade D", emoji: "💪" },
  { min: 40, label: "Pass — Grade E",        short: "Grade E", emoji: "💪" },
  { min: 0,  label: "Fail — Keep Studying! 🔁", short: "Keep pushing", emoji: "💪" },
];

function getGrade(pct) {
  return GRADE_LABELS.find((g) => pct >= g.min);
}

// ---------------------------------------------------------------------
// MODE LABELS
// ---------------------------------------------------------------------
const MODE_LABELS = {
  cbt:   { title: "CBT Practice",   sub: "Select a subject to start" },
  exam:  { title: "Exam Mode",      sub: "Select a subject" },
  notes: { title: "Study Notes",    sub: "Select a subject" },
  pastq: { title: "Past Questions", sub: "Select a subject" },
};

// ---------------------------------------------------------------------
// STREAK BANNER (extracted)
// ---------------------------------------------------------------------
function StreakBanner({ streak, t }) {
  if (!streak || streak.count < 1) return null;
  const tier = getStreakTier(streak.count);
  return (
    <div style={{
      background: t.keyBg, border: `1px solid ${tier.color}66`, borderRadius: 12,
      padding: "12px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 12,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12, background: `${tier.color}22`,
        border: `1px solid ${tier.color}55`, display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 20, flexShrink: 0,
      }}>
        {tier.icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 15, fontWeight: "bold", color: tier.color }}>
            {streak.count}-day streak
          </span>
          <span style={{
            fontSize: 9, fontWeight: "bold", letterSpacing: 1, color: tier.color,
            background: `${tier.color}22`, border: `1px solid ${tier.color}44`,
            borderRadius: 20, padding: "2px 7px", textTransform: "uppercase",
          }}>
            {tier.label}
          </span>
        </div>
        <div style={{ fontSize: 11, color: t.keyText, opacity: 0.85 }}>
          {tier.msg}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// QUIZ QUIT MODAL (extracted + accessibility)
// ---------------------------------------------------------------------
function QuitModal({ open, onConfirm, onCancel, t }) {
  const modalRef = useRef(null);
  useEffect(() => {
    if (open && modalRef.current) {
      const prevFocus = document.activeElement;
      modalRef.current.focus();
      return () => prevFocus?.focus();
    }
  }, [open]);
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quit-dialog-title"
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 3000,
      }}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        style={{
          background: t.bgCard, borderRadius: 18, padding: "28px 24px",
          width: 290, textAlign: "center", border: `1px solid ${t.border}`,
          boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
        <div id="quit-dialog-title" style={{ fontSize: 16, fontWeight: "bold", color: t.heading, marginBottom: 8 }}>
          Quit Quiz?
        </div>
        <div style={{ fontSize: 13, color: t.textSub, lineHeight: 1.7, marginBottom: 24 }}>
          Your progress will be lost and your score won't be saved.
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: "13px 0", borderRadius: 10, border: "none",
              background: "#dc3545", color: "#fff", fontWeight: "bold",
              fontSize: 14, cursor: "pointer",
            }}
          >
            Yes, Quit
          </button>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: "13px 0", borderRadius: 10, background: t.bgInner,
              color: t.textSub, border: `1px solid ${t.border}`,
              fontWeight: "bold", fontSize: 14, cursor: "pointer",
            }}
          >
            Keep Going
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// RESULT SCREEN (extracted)
// ---------------------------------------------------------------------
function ResultScreen({ qs, answers, t, onRetry, onHome, activeSubject, mode }) {
  const [copied, setCopied] = useState(false);
  const correct = qs.filter((q, i) => answers[i] === q.answer).length;
  const skipped = qs.filter((_, i) => !answers[i]).length;
  const wrong = qs.length - correct - skipped;
  const pct = qs.length > 0 ? Math.round((correct / qs.length) * 100) : 0;
  const grade = getGrade(pct);
  const subjectName = activeSubject?.name || "JUPEB";
  const modeLabel = mode === "CBT" ? "CBT Practice" : "Exam Mode";
  const shareText = `${grade.emoji} I just scored ${pct}% (${correct}/${qs.length}) on ` +
    `${subjectName} ${modeLabel} — ${grade.short}!\n\n` +
    `🎓 Practice free JUPEB past questions on StudyNaija:\n` +
    `👉 https://studynaija.vercel.app\n\n` +
    `#JUPEB #StudyNaija #ExamPrep`;

  const handleWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(shareText); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch {}
  };
  const handleNativeShare = () => {
    if (navigator.share) navigator.share({ title: "StudyNaija — JUPEB Exam Prep", text: shareText, url: "https://studynaija.vercel.app" }).catch(() => {});
    else handleCopy();
  };
  const goldBtnStyle = {
    width: "100%", background: t.goldBtn, border: "none", borderRadius: 12,
    color: t.goldBtnText, fontSize: 14, fontWeight: "bold", padding: 14,
    cursor: "pointer", display: "block", marginBottom: 10,
  };
  const statPills = [
    { value: correct, label: "Correct ✓", bg: t.correctBg, border: t.correctBorder, color: t.correctBorder, text: t.correctText },
    { value: wrong,   label: "Wrong ✗",   bg: t.wrongBg,   border: t.wrongBorder,   color: t.wrongBorder,   text: t.wrongText },
    { value: skipped, label: "Skipped",   bg: t.bgCard,    border: t.border,        color: t.textSub,       text: t.textMuted },
  ];
  return (
    <div style={{ padding: "16px" }}>
      {/* Score card */}
      <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "28px 16px", marginBottom: 16, textAlign: "center" }}>
        <div style={{ fontSize: 52 }}>📝</div>
        <div style={{ fontSize: 38, fontWeight: "bold", color: t.gold, margin: "8px 0" }}>{pct}%</div>
        <div style={{ fontSize: 16, color: t.heading, fontWeight: "bold" }}>{correct} / {qs.length} correct</div>
        <div style={{ fontSize: 13, color: t.textSub, marginTop: 8 }}>{grade.label}</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 18 }}>
          {statPills.map((p) => (
            <div key={p.label} style={{ background: p.bg, border: `1px solid ${p.border}`, borderRadius: 12, padding: "10px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: "bold", color: p.color }}>{p.value}</div>
              <div style={{ fontSize: 11, color: p.text }}>{p.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Share card */}
      <div style={{ background: "#075e54", border: "1px solid #128c7e", borderRadius: 16, padding: "18px 16px", marginBottom: 16, textAlign: "center" }}>
        <div style={{ fontSize: 13, color: "#dcf8c6", marginBottom: 14, lineHeight: 1.7 }}>
          📢 <strong>Share your score!</strong><br />Help a friend discover free JUPEB prep 👇
        </div>
        <button onClick={handleWhatsApp} style={{ width: "100%", background: "#25d366", border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: "bold", padding: "14px 0", cursor: "pointer", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>💬</span> Share on WhatsApp
        </button>
        <button onClick={handleNativeShare} style={{ width: "100%", background: "transparent", border: "1px solid #128c7e", borderRadius: 12, color: copied ? "#25d366" : "#dcf8c6", fontSize: 13, fontWeight: "bold", padding: "11px 0", cursor: "pointer", transition: "color 0.2s" }}>
          {copied ? "✅ Copied to clipboard!" : "📋 Copy / Share via other apps"}
        </button>
        <div style={{ marginTop: 14, background: "rgba(0,0,0,0.25)", borderRadius: 10, padding: "10px 12px", fontSize: 11, color: "#dcf8c6", textAlign: "left", lineHeight: 1.8, whiteSpace: "pre-line", opacity: 0.85 }}>
          {shareText}
        </div>
      </div>
      <button onClick={onRetry} style={goldBtnStyle}>Try Again</button>
      <button onClick={onHome} style={{ width: "100%", background: "transparent", border: `1px solid ${t.border}`, borderRadius: 12, color: t.textSub, fontSize: 13, padding: 12, cursor: "pointer", marginBottom: 20 }}>Back to Home</button>
      <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading, marginBottom: 12 }}>Question Breakdown</div>
      {qs.map((q, i) => {
        const userAns = answers[i];
        const isRight = userAns === q.answer;
        const isSkipped = !userAns;
        const borderColor = isSkipped ? t.border : isRight ? t.correctBorder : t.wrongBorder;
        const statusColor = isSkipped ? t.textMuted : isRight ? t.correctBorder : t.wrongBorder;
        const statusLabel = isSkipped ? "— Skipped" : isRight ? "✓ Correct" : "✗ Wrong";
        return (
          <div key={`q-breakdown-${i}`} style={{ background: t.bgCard, border: `1px solid ${borderColor}`, borderRadius: 14, padding: "14px", marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: t.textMuted }}>Q{i + 1} · JUPEB {q.year}</span>
              <span style={{ fontSize: 12, fontWeight: "bold", color: statusColor }}>{statusLabel}</span>
            </div>
            <div style={{ fontSize: 13, color: t.text, lineHeight: 1.5, marginBottom: 8 }}>{q.q}</div>
            {!isSkipped && !isRight && (
              <div style={{ fontSize: 12, background: t.wrongBg, borderRadius: 8, padding: "6px 12px", color: t.wrongText, marginBottom: 8 }}>
                Your answer: {userAns} · Correct: {q.answer}
              </div>
            )}
            {!isRight && (
              <div style={{ fontSize: 12, color: t.expText, background: t.expBg, borderRadius: 8, padding: "10px 12px", lineHeight: 1.7 }}>
                💡 {q.exp}
              </div>
            )}
          </div>
        );
      })}
      <button onClick={onRetry} style={goldBtnStyle}>Try Again</button>
      <button onClick={onHome} style={{ width: "100%", background: "transparent", border: `1px solid ${t.border}`, borderRadius: 12, color: t.textSub, fontSize: 13, padding: 12, cursor: "pointer" }}>Back to Home</button>
    </div>
  );
}

// ---------------------------------------------------------------------
// SUBJECT SELECT (extracted)
// ---------------------------------------------------------------------
function SubjectSelect({ t, onToggleTheme, onBack, onSelect, mode }) {
  const label = MODE_LABELS[mode] || { title: "Select", sub: "" };
  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text }}>
      <Header onBack={onBack} title={label.title} sub={label.sub} t={t} onToggleTheme={onToggleTheme} />
      <div style={{ padding: "20px 16px" }}>
        <div style={{ fontSize: 11, color: t.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Available Subjects</div>
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => { if (subject.available) onSelect(subject); }}
            onMouseEnter={(e) => { if (subject.available) e.currentTarget.style.border = `1px solid ${t.borderHover}`; }}
            onMouseLeave={(e) => { e.currentTarget.style.border = `1px solid ${t.border}`; }}
            style={{
              background: subject.available ? t.bgCard : t.bgInner, border: `1px solid ${t.border}`, borderRadius: 16,
              padding: "20px 16px", display: "flex", alignItems: "center", gap: 16,
              cursor: subject.available ? "pointer" : "default", width: "100%", textAlign: "left", marginBottom: 14,
              opacity: subject.available ? 1 : 0.7,
            }}
          >
            <div style={{ width: 52, height: 52, borderRadius: 14, background: subject.available ? subject.color : "#444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
              {subject.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, color: t.gold, fontWeight: "bold" }}>{subject.name}</div>
              {subject.available ? (
                <div style={{ fontSize: 12, color: t.gold, marginTop: 4 }}>Tap to continue</div>
              ) : (
                <div style={{ fontSize: 12, marginTop: 4 }}>
                  <span style={{ background: "#f59e0b", color: "#000", fontSize: 10, fontWeight: "bold", padding: "2px 8px", borderRadius: 20 }}>COMING SOON</span>
                </div>
              )}
            </div>
            <div style={{ color: t.gold, fontSize: 20 }}>{subject.available ? "›" : "🔒"}</div>
          </button>
        ))}
        <div style={{ background: t.keyBg, border: `1px solid ${t.keyBorder}`, borderRadius: 12, padding: "14px 16px", marginTop: 8 }}>
          <div style={{ fontSize: 13, color: t.keyText, lineHeight: 1.8 }}>
            🔑 More subjects coming soon based on user feedback. Currently available: <strong>Economics, Government, Business Studies</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// MAIN APP
// ---------------------------------------------------------------------
export default function App() {
  // --- Splash ---
  const [showSplash, setShowSplash] = useState(true);
  const [progress, setProgress] = useState(0);
  // --- Theme ---
  const { t, themeKey, setThemeKey, toggleTheme, card, goldBtn, actualTheme } = useApp();
  // --- Routing ---
  const [screen, setScreen] = useState("home");
  const [historyStack, setHistoryStack] = useState(["home"]);
  const [quitModal, setQuitModal] = useState({ open: false, onConfirm: null });
  // --- Subject / mode ---
  const [activeSubject, setActiveSubject] = useState(null);
  const [pendingMode, setPendingMode] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  // --- Notes ---
  const [noteCourse, setNoteCourse] = useState(null);
  const [noteTopic, setNoteTopic] = useState(null);
  // --- Past Q ---
  const [pqCourse, setPqCourse] = useState(null);
  const [pqTopic, setPqTopic] = useState(null);
    // --- Feedback ---
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSending, setFeedbackSending] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");
  // --- Toast ---
  const { toast, showToast, hideToast } = useToast();
  // --- Hooks ---
  const { isOnline, wasOffline } = useOnlineStatus();
  const { user, userScores, saveScore, authLoading, handleGoogleLogin, handleLogout, loadMoreScores, hasMoreScores, loadingMore } = useAuth();
  const { streak, updateStreak } = useStreak(user);
  const { firebaseQuestions, loadingFirebase, fetchError, refetch } = useFirebase();
  const {
    cbtQs, cbtIdx, setCbtIdx, cbtAnswers, setCbtAnswers, cbtDone, setCbtDone,
    cbtTime, cbtRunning, setCbtRunning, startCbt,
    examCount, setExamCount, examMinutes, setExamMinutes,
    examQs, examIdx, setExamIdx, examAnswers, setExamAnswers,
    examDone, setExamDone, examTime, examRunning, setExamRunning, startExam,
    showCalc, setShowCalc, minimized, setMinimized,
  } = useQuiz(firebaseQuestions);
  const { permission, settings: notifSettings, loading: notifLoading, error: notifError,
    requestPermission, swReady, markFcmEnabled, disableNotifications, updateSettings: updateNotifSettings } = useNotifications();
  const { fcmToken, fcmReady } = useFCM(user);
  const cbtWarnedRef = useRef(false);
  const examWarnedRef = useRef(false);
  const cbtScoreSavedRef = useRef(false);
  const examScoreSavedRef = useRef(false);

  // --- Navigation (wrapped in useCallback) ---
  const goTo = useCallback((newScreen) => {
    window.history.pushState({ screen: newScreen }, "");
    setHistoryStack(prev => [...prev, newScreen]);
    setScreen(newScreen);
  }, []);

  const goReplace = useCallback((newScreen) => {
    window.history.replaceState({ screen: newScreen }, "");
    setHistoryStack(prev => [...prev.slice(0, -1), newScreen]);
    setScreen(newScreen);
  }, []);

  const goBack = useCallback(() => {
    if (historyStack.length <= 1) return;
    const quizInProgress = (screen === "cbt_quiz" && !cbtDone && Object.keys(cbtAnswers).length > 0) ||
                           (screen === "exam_quiz" && !examDone && Object.keys(examAnswers).length > 0);
    if (quizInProgress) {
      setQuitModal({
        open: true,
        onConfirm: () => {
          setCbtRunning(false);
          setExamRunning(false);
          const destination = screen === "exam_quiz" ? "exam_setup" : "home";
          window.history.back();
          setHistoryStack(prev => [...prev.slice(0, -1), destination]);
          setScreen(destination);
          setQuitModal({ open: false, onConfirm: null });
        },
      });
      return;
    }
    const newStack = historyStack.slice(0, -1);
    setHistoryStack(newStack);
    setScreen(newStack[newStack.length - 1]);
  }, [historyStack, screen, cbtDone, cbtAnswers, examDone, examAnswers, setCbtRunning, setExamRunning]);

  // --- Popstate handler ---
  const goBackRef = useRef(goBack);
  useEffect(() => { goBackRef.current = goBack; }, [goBack]);
  useEffect(() => {
    const handler = () => goBackRef.current();
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  // --- Splash cleanup ---
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowSplash(false), 300);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // --- Toast warning for low time (only once per quiz) ---
  useEffect(() => {
    if (cbtRunning) cbtWarnedRef.current = false;
  }, [cbtRunning]);
  useEffect(() => {
    if (cbtRunning && cbtTime === 180 && !cbtWarnedRef.current) {
      cbtWarnedRef.current = true;
      showToast("⏰ 3 minutes remaining!", "warning", 6000);
    }
  }, [cbtTime, showToast, cbtRunning]);
  useEffect(() => {
    if (examRunning) examWarnedRef.current = false;
  }, [examRunning]);
  useEffect(() => {
    if (examRunning && examTime === 180 && !examWarnedRef.current) {
      examWarnedRef.current = true;
      showToast("⏰ 3 minutes remaining!", "warning", 6000);
    }
  }, [examTime, showToast, examRunning]);

  // --- FCM & streak safety ---
  useEffect(() => { if (fcmReady) markFcmEnabled(); }, [fcmReady, markFcmEnabled]);

  // --- Feedback submission ---
  const sendFeedback = useCallback(async () => {
    if (!feedbackMessage.trim()) { setFeedbackError("Please write a message first."); return; }
    setFeedbackSending(true);
    setFeedbackError("");
    try {
      await addDoc(collection(db, "feedback"), {
        name: feedbackName.trim() || "Anonymous", message: feedbackMessage.trim(),
        timestamp: serverTimestamp(), subject: activeSubject?.name || "General",
      });
      setFeedbackSent(true);
      setFeedbackName("");
      setFeedbackMessage("");
    } catch {
      setFeedbackError("Failed to send. Check your connection and try again.");
    }
    setFeedbackSending(false);
  }, [feedbackMessage, feedbackName, activeSubject]);

  // --- Score saving wrappers (reset refs when starting) ---
  const handleStartCbt = useCallback((subject, uid) => {
    cbtScoreSavedRef.current = false;
    startCbt(subject, goTo, uid);
  }, [startCbt, goTo]);
  const handleStartExam = useCallback((subject, year, uid) => {
    examScoreSavedRef.current = false;
    startExam(subject, goTo, year, uid);
  }, [startExam, goTo]);

  // --- Splash / offline fallback ---
  if (!isOnline && fetchError && firebaseQuestions.length === 0) {
    return <OfflineFallback onRetry={refetch} />;
  }
  if (showSplash || authLoading) {
    const isDark = actualTheme === "dark";
    const barBg = isDark ? "linear-gradient(90deg,#c8a84b,#f0d080)" : "linear-gradient(90deg,#1a3a5c,#2563eb)";
    const SPLASH_MESSAGES = [
      { max: 40, msg: "Loading questions..." },
      { max: 70, msg: "Preparing study materials..." },
      { max: 90, msg: "Almost ready..." },
      { max: 101, msg: "Welcome! 🥳" },
    ];
    const splashMsg = authLoading ? "Restoring your account... 👤" : SPLASH_MESSAGES.find(m => progress < m.max)?.msg;
    return (
      <div style={{
        minHeight: "100vh",
        background: isDark ? "linear-gradient(135deg,#0a1a0a 0%,#1a3a1a 50%,#0d2b0d 100%)" : "linear-gradient(135deg,#f0f4f8 0%,#e8f0e8 50%,#f5f0e8 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        fontFamily: "Georgia, serif", padding: "40px 20px",
      }}>
        <div style={{ width: 110, height: 110, borderRadius: "50%", background: isDark ? "linear-gradient(135deg,#1e4d1e,#2d6a2d)" : "linear-gradient(135deg,#1a3a5c,#0d2b4a)", border: `3px solid ${isDark ? "#c8a84b" : "#1a3a5c"}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: isDark ? "0 0 30px #c8a84b44" : "0 0 30px #1a3a5c44" }}>
          <span style={{ fontSize: 52 }}>🎓</span>
        </div>
        <div style={{ fontSize: 32, fontWeight: "bold", color: isDark ? "#f0ece0" : "#1a1a1a", marginBottom: 6, letterSpacing: 1 }}>StudyNaija</div>
        <div style={{ fontSize: 14, color: isDark ? "#c8a84b" : "#1a3a5c", marginBottom: 6, letterSpacing: 2, textTransform: "uppercase" }}>JUPEB Exam Prep</div>
        <div style={{ fontSize: 12, color: isDark ? "#8a9a8a" : "#666", marginBottom: 48 }}>Free · No Subscription</div>
        <div style={{ width: "60%", maxWidth: 200, height: 4, background: isDark ? "#1e2e1e" : "#ddd8cc", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ height: "100%", width: authLoading ? "70%" : `${progress}%`, background: barBg, borderRadius: 10, transition: "width 0.05s linear" }} />
        </div>
        <div style={{ fontSize: 11, color: isDark ? "#666" : "#888", letterSpacing: 1 }}>{splashMsg}</div>
        <div style={{ position: "absolute", bottom: 30, fontSize: 10, color: isDark ? "#444" : "#999", textAlign: "center", lineHeight: 1.8 }}>
          studynaija.vercel.app<br />© 2026 StudyNaija
        </div>
      </div>
    );
  }

  const data = activeSubject?.data || null;
  const wrapStyle = { minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text };

  // -------------------------------------------------------------------------
  // SCREEN RENDERING (simplified with switch)
  // -------------------------------------------------------------------------
  const renderScreen = () => {
    switch (screen) {
      case "home":
        const totalQ = subjects.reduce((a, s) => a + Object.values(s.data.questions).reduce((b, arr) => b + arr.length, 0), 0) + firebaseQuestions.length;
        return (
          <div style={wrapStyle}>
            <OfflineIndicator isOnline={isOnline} wasOffline={wasOffline} />
            <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "18px 16px", display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
                <div style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>JUPEB Exam Prep</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Free · No subscription</div>
              </div>
              <button onClick={() => goTo("profile")} style={{ background: "none", border: `1px solid ${t.gold}44`, borderRadius: 8, color: t.gold, fontSize: 13, cursor: "pointer", padding: "6px 10px", marginRight: 8 }}>
                {user ? <img src={user.photoURL} alt="profile" style={{ width: 24, height: 24, borderRadius: "50%" }} /> : "👤"}
              </button>
              <button onClick={toggleTheme} style={{ background: "none", border: `1px solid ${t.gold}44`, borderRadius: 8, color: t.gold, fontSize: 18, cursor: "pointer", padding: "6px 10px" }}>
                {t.toggleIcon}
              </button>
            </div>
            <div style={{ padding: "16px" }}>
              <StreakBanner streak={streak} t={t} />
              <div style={{ background: t.heroBg, borderRadius: 16, padding: "18px 16px", marginBottom: 20, border: `1px solid ${t.heroBorder}` }}>
                <div style={{ fontSize: 11, color: t.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Economics · Government · More coming</div>
                <div style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 6 }}>JUPEB Exam Prep 📚📝</div>
                <div style={{ fontSize: 13, color: t.heroText, lineHeight: 1.6 }}>CBT, Exam, Notes & Past Questions. 100% free.</div>
                <div style={{ fontSize: 12, color: t.gold, marginTop: 6, fontWeight: "bold" }}>📚 999+ questions available</div>
                <div style={{ fontSize: 11, color: t.gold, marginTop: 6 }}>💡 Tap ⋮ → "Add to Home Screen" to install as an app</div>
              </div>
              {loadingFirebase ? <HomeCardSkeleton /> : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {HOME_CARDS.map(c => (
                    <button key={c.id} onClick={() => { if (c.id === "grading" || c.id === "settings") goTo(c.id); else { setPendingMode(c.id); goTo("subject_select"); } }} style={{ background: c.color, border: "none", borderRadius: 16, padding: "20px 14px", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 6, minHeight: 120 }}>
                      <div style={{ fontSize: 28 }}>{c.icon}</div>
                      <div style={{ fontSize: 14, fontWeight: "bold", color: "#fff" }}>{c.title}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>{c.desc}</div>
                    </button>
                  ))}
                </div>
              )}
              <div style={{ textAlign: "center", color: t.textMuted, fontSize: 11, marginTop: 20, lineHeight: 2 }}>
                Based on JUPEB syllabus topics ✔<br />
                <a href="https://studynaija.vercel.app/" style={{ color: t.gold, textDecoration: "none" }}>studynaija.vercel.app</a><br />
                © 2026 StudyNaija. All rights reserved.
              </div>
            </div>
          </div>
        );
      case "subject_select":
        return <SubjectSelect t={t} onToggleTheme={toggleTheme} onBack={goBack} mode={pendingMode} onSelect={(subject) => {
          setActiveSubject(subject);
          if (pendingMode === "cbt") handleStartCbt(subject, user?.uid);
          else if (pendingMode === "exam") goTo("year_select");
          else if (pendingMode === "notes") goTo("notes");
          else if (pendingMode === "pastq") goTo("pastq_courses");
        }} />;
      case "year_select":
        if (!activeSubject) return null;
        return <YearSelect t={t} data={activeSubject.data} firebaseQuestions={firebaseQuestions} subjectId={activeSubject.id} onBack={goBack} onSelectYear={(year) => { setSelectedYear(year); goTo("exam_setup"); }} />;
      case "profile":
        return <Profile t={t} user={user} userScores={userScores} onLogin={handleGoogleLogin} onLogout={handleLogout} onBack={goBack} goldBtn={goldBtn} card={card} loadMoreScores={loadMoreScores} hasMoreScores={hasMoreScores} loadingMore={loadingMore} />;
      case "feedback":
        return <Feedback t={t} feedbackName={feedbackName} setFeedbackName={setFeedbackName} feedbackMessage={feedbackMessage} setFeedbackMessage={setFeedbackMessage} feedbackSending={feedbackSending} feedbackSent={feedbackSent} setFeedbackSent={setFeedbackSent} feedbackError={feedbackError} onSend={sendFeedback} onBack={goBack} goldBtn={goldBtn} card={card} />;
case "about":
        return (
          <div style={wrapStyle}>
            <Header onBack={goBack} title="About StudyNaija" t={t} onToggleTheme={toggleTheme} />
            <div style={{ padding: "16px" }}>
              <div style={{ margin: 30, padding: "0 10px" }}>
                <p style={{ fontSize: 16, color: t.textSub, textAlign: "center", lineHeight: "1.8" }}>© 2026 StudyNaija. All rights reserved.</p>
                <p style={{ fontSize: 15, color: t.textSub, textAlign: "center", marginTop: 12, lineHeight: "1.8" }}>StudyNaija is an independent educational platform and is not affiliated with, endorsed by, or associated with <strong>JUPEB</strong> or any official examination body.</p>
                <p style={{ fontSize: 15, color: t.textSub, textAlign: "center", marginTop: 12, lineHeight: "1.8" }}>All trademarks and names belong to their respective owners.</p>
              </div>
            </div>
          </div>
        );
      case "notifications":
        return <NotificationSettings onBack={goBack} permission={permission} settings={notifSettings} loading={notifLoading} error={notifError} onRequestPermission={requestPermission} onDisable={disableNotifications} onUpdateSettings={updateNotifSettings} />;
      case "settings":
        return <Settings t={t} goBack={goBack} goTo={goTo} user={user} themeKey={themeKey} setThemeKey={setThemeKey} goldBtn={goldBtn} toggleTheme={toggleTheme} onFeedback={() => goTo("feedback")} />;
      case "grading":
        return (
          <div style={wrapStyle}>
            <Header onBack={goBack} title="JUPEB Grading System" t={t} onToggleTheme={toggleTheme} />
            <div style={{ padding: "16px" }}>
              <div style={card}>
                <div style={{ fontSize: 13, color: t.noteText, lineHeight: 1.8, marginBottom: 16 }}>Maximum points = AAA + 1 bonus = <strong style={{ color: t.heading }}>16 points.</strong></div>
                {grading.map(g => (
                  <div key={g.grade} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${t.border}` }}>
                    <div style={{ fontSize: 22, fontWeight: "bold", color: t.gold, width: 32 }}>{g.grade}</div>
                    <div style={{ fontSize: 13, color: t.text }}>{g.marks}%</div>
                    <div style={{ fontSize: 13, color: t.textSub }}>{g.points} pts</div>
                    <div style={{ fontSize: 13, fontWeight: "bold", color: g.remark === "Fail" ? "#dc3545" : g.remark === "Excellent" ? "#5cb85c" : t.gold }}>{g.remark}</div>
                  </div>
                ))}
                <div style={{ marginTop: 16, background: t.keyBg, border: `1px solid ${t.keyBorder}`, borderRadius: 10, padding: "14px", fontSize: 13, color: t.keyText, lineHeight: 2 }}>🏆 CCC = 3+3+3+1 = <strong>10 pts</strong> · AAA = 5+5+5+1 = <strong>16 pts</strong></div>
              </div>
            </div>
          </div>
        );
      case "notes":
        if (!data) return null;
        return <NotesCourses t={t} data={data} activeSubject={activeSubject} onBack={goBack} onSelectCourse={(c) => { setNoteCourse(c); goTo("notes_topics"); }} />;
      case "notes_topics":
        if (!noteCourse || !data) return null;
        return <NotesTopics t={t} data={data} noteCourse={noteCourse} onBack={goBack} onSelectTopic={(tp) => { setNoteTopic(tp); goTo("notes_view"); }} />;
      case "notes_view":
        if (!noteTopic || !data) return null;
        return <NotesView t={t} data={data} noteTopic={noteTopic} onBack={goBack} card={card} />;
      case "pastq_courses":
        if (!data) return null;
        return <PastQCourses t={t} data={data} activeSubject={activeSubject} firebaseQuestions={firebaseQuestions} onBack={goBack} onSelectCourse={(c) => { setPqCourse(c); goTo("pastq_topics"); }} />;
      case "pastq_topics":
        if (!pqCourse || !data) return null;
        return <PastQTopics t={t} data={data} pqCourse={pqCourse} firebaseQuestions={firebaseQuestions} subjectId={activeSubject?.id} onBack={goBack} onSelectTopic={(tp) => { setPqTopic(tp); goTo("pastq_view"); }} />;
      case "pastq_view":
        if (!pqTopic || !data) return null;
        return <PastQView t={t} data={data} pqTopic={pqTopic} firebaseQuestions={firebaseQuestions} subjectId={activeSubject?.id} onBack={goBack} card={card} />;
      case "cbt_quiz":
        if (cbtDone) {
          const correct = cbtQs.filter((q, i) => cbtAnswers[i] === q.answer).length;
          const pct = cbtQs.length > 0 ? Math.round((correct / cbtQs.length) * 100) : 0;
          if (user && !cbtScoreSavedRef.current) {
            cbtScoreSavedRef.current = true;
            (async () => {
              try {
                await saveScore("CBT", activeSubject?.name, correct, cbtQs.length, pct, cbtQs, cbtAnswers);
                if (user?.uid) await updateStreak(user.uid);
              } catch {
                cbtScoreSavedRef.current = false;
                showToast("Failed to save score. Retrying... If it persists, go to Settings → Feedback.", "error");
              }
            })();
          }
          return (
            <div style={wrapStyle}>
              <Header onBack={() => goTo("home")} title="CBT Results" sub={activeSubject?.name} t={t} onToggleTheme={toggleTheme} />
              <ResultScreen qs={cbtQs} answers={cbtAnswers} t={t} mode="CBT" onRetry={() => handleStartCbt(activeSubject, user?.uid)} onHome={() => goTo("home")} activeSubject={activeSubject} />
            </div>
          );
        }
        return (
          <>
            <CbtQuiz t={t} cbtQs={cbtQs} cbtIdx={cbtIdx} setCbtIdx={setCbtIdx} cbtAnswers={cbtAnswers} setCbtAnswers={setCbtAnswers}
              cbtTime={cbtTime} cbtDone={cbtDone} setCbtDone={setCbtDone} setCbtRunning={setCbtRunning}
              activeSubject={activeSubject} onBack={() => {
                if (Object.keys(cbtAnswers).length > 0) setQuitModal({ open: true, onConfirm: () => { setCbtRunning(false); setQuitModal({ open: false, onConfirm: null }); goReplace("home"); } });
                else goReplace("home");
              }} card={card} goldBtn={goldBtn} />
            <QuitModal open={quitModal.open} onConfirm={quitModal.onConfirm} onCancel={() => setQuitModal({ open: false, onConfirm: null })} t={t} />
          </>
        );
      case "exam_setup":
        if (!data) return null;
        return <ExamSetup t={t} data={data} activeSubject={activeSubject} firebaseQuestions={firebaseQuestions} selectedYear={selectedYear}
          examCount={examCount} setExamCount={setExamCount} examMinutes={examMinutes} setExamMinutes={setExamMinutes}
          onStart={() => handleStartExam(activeSubject, selectedYear, user?.uid)} onBack={goBack} goldBtn={goldBtn} card={card} />;
      case "exam_quiz":
        if (examDone) {
          const correct = examQs.filter((q, i) => examAnswers[i] === q.answer).length;
          const pct = examQs.length > 0 ? Math.round((correct / examQs.length) * 100) : 0;
          if (user && !examScoreSavedRef.current) {
            examScoreSavedRef.current = true;
            (async () => {
              try {
                await saveScore("Exam", activeSubject?.name, correct, examQs.length, pct, examQs, examAnswers);
                if (user?.uid) await updateStreak(user.uid);
              } catch {
                examScoreSavedRef.current = false;
                showToast("Failed to save score. Retrying... If it persists, go to Settings → Feedback.", "error");
              }
            })();
          }
          return (
            <div style={wrapStyle}>
              <Header onBack={() => goTo("home")} title="Exam Results" sub={activeSubject?.name} t={t} onToggleTheme={toggleTheme} />
              <ResultScreen qs={examQs} answers={examAnswers} t={t} mode="Exam" onRetry={() => handleStartExam(activeSubject, selectedYear, user?.uid)} onHome={() => goTo("home")} activeSubject={activeSubject} />
            </div>
          );
        }
        return (
          <>
            <ExamQuiz t={t} examQs={examQs} examIdx={examIdx} setExamIdx={setExamIdx} examAnswers={examAnswers} setExamAnswers={setExamAnswers}
              examTime={examTime} examDone={examDone} setExamDone={setExamDone} setExamRunning={setExamRunning}
              activeSubject={activeSubject} showCalc={showCalc} setShowCalc={setShowCalc} minimized={minimized} setMinimized={setMinimized}
              onBack={() => {
                if (Object.keys(examAnswers).length > 0) setQuitModal({ open: true, onConfirm: () => { setExamRunning(false); setQuitModal({ open: false, onConfirm: null }); window.history.back(); setHistoryStack(prev => [...prev.slice(0, -1), "exam_setup"]); setScreen("exam_setup"); } });
                else goReplace("exam_setup");
              }} card={card} goldBtn={goldBtn} />
            <QuitModal open={quitModal.open} onConfirm={quitModal.onConfirm} onCancel={() => setQuitModal({ open: false, onConfirm: null })} t={t} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Toast toast={toast} onHide={hideToast} />
      {renderScreen()}
    </>
  );
}
