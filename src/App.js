import { useState, useEffect } from "react";
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
import QuestionCard from "./screens/QuestionCard";
import useOnlineStatus from "./hooks/useOnlineStatus";
import OfflineIndicator from "./components/OfflineIndicator";
import OfflineFallback from "./components/OfflineFallback";
import useStreak from "./hooks/useStreak";
import useFirebase from "./hooks/useFirebase";
import useQuiz from "./hooks/useQuiz";
import { useApp } from "./context/AppContext";
import useNotifications from "./hooks/useNotifications";
import NotificationSettings
  from "./screens/NotificationSettings";


function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ── RESULT SCREEN ─────────────────────────────────────────────────────────────
// Replace your existing ResultScreen function in App (3).js with this one.

function ResultScreen({ qs, answers, t, onRetry, onHome, activeSubject, mode }) {
  const correct = qs.filter((q, i) => answers[i] === q.answer).length;
  const skipped = qs.filter((_, i) => !answers[i]).length;
  const wrong = qs.length - correct - skipped;
  const pct = qs.length > 0 ? Math.round((correct / qs.length) * 100) : 0;
  const gradeLabel =
    pct >= 70 ? "Excellent! Grade A 🥳" :
    pct >= 60 ? "Very Good! Grade B 💪" :
    pct >= 50 ? "Good! Grade C 📚" :
    pct >= 45 ? "Merit — Grade D" :
    pct >= 40 ? "Pass — Grade E" : "Fail — Keep Studying! 🔁";

  const goldBtn = {
    width: "100%", background: t.goldBtn, border: "none", borderRadius: 12,
    color: t.goldBtnText, fontSize: 14, fontWeight: "bold", padding: 14,
    cursor: "pointer", display: "block", marginBottom: 10,
  };

  // ── SHARE ──────────────────────────────────────────────────────────────────
  const emoji =
    pct >= 70 ? "🏆" :
    pct >= 50 ? "📚" : "💪";

  const gradeShort =
    pct >= 70 ? "Grade A" :
    pct >= 60 ? "Grade B" :
    pct >= 50 ? "Grade C" :
    pct >= 45 ? "Grade D" :
    pct >= 40 ? "Grade E" : "Keep pushing";

  const subjectName = activeSubject?.name || "JUPEB";
  const modeLabel   = mode === "CBT" ? "CBT Practice" : "Exam Mode";

  const shareText =
    `${emoji} I just scored ${pct}% (${correct}/${qs.length}) on ` +
    `${subjectName} ${modeLabel} — ${gradeShort}!\n\n` +
    `🎓 Practice free JUPEB past questions on StudyNaija:\n` +
    `👉 https://studynaija.vercel.app\n\n` +
    `#JUPEB #StudyNaija #ExamPrep`;

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      alert("✅ Copied! Paste anywhere to share.");
    } catch {
      alert("Copy failed — try long-pressing the text.");
    }
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "StudyNaija — JUPEB Exam Prep",
        text: shareText,
        url: "https://studynaija.vercel.app",
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <div style={{ padding: "16px" }}>

      {/* Score card */}
      <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "28px 16px", marginBottom: 16, textAlign: "center" }}>
        <div style={{ fontSize: 52 }}>📝</div>
        <div style={{ fontSize: 38, fontWeight: "bold", color: t.gold, margin: "8px 0" }}>{pct}%</div>
        <div style={{ fontSize: 16, color: t.heading, fontWeight: "bold" }}>{correct} / {qs.length} correct</div>
        <div style={{ fontSize: 13, color: t.textSub, marginTop: 8 }}>{gradeLabel}</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 18 }}>
          <div style={{ background: t.correctBg, border: `1px solid ${t.correctBorder}`, borderRadius: 12, padding: "10px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: "bold", color: t.correctBorder }}>{correct}</div>
            <div style={{ fontSize: 11, color: t.correctText }}>Correct ✓</div>
          </div>
          <div style={{ background: t.wrongBg, border: `1px solid ${t.wrongBorder}`, borderRadius: 12, padding: "10px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: "bold", color: t.wrongBorder }}>{wrong}</div>
            <div style={{ fontSize: 11, color: t.wrongText }}>Wrong ✗</div>
          </div>
          <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 12, padding: "10px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: "bold", color: t.textSub }}>{skipped}</div>
            <div style={{ fontSize: 11, color: t.textMuted }}>Skipped</div>
          </div>
        </div>
      </div>

      {/* ── SHARE CARD ── */}
      <div style={{
        background: "#075e54",          // WhatsApp dark green
        border: "1px solid #128c7e",
        borderRadius: 16,
        padding: "18px 16px",
        marginBottom: 16,
        textAlign: "center",
      }}>
        <div style={{ fontSize: 13, color: "#dcf8c6", marginBottom: 14, lineHeight: 1.7 }}>
          📢 <strong>Share your score!</strong><br />
          Help a friend discover free JUPEB prep 👇
        </div>

        {/* WhatsApp button — main CTA */}
        <button
          onClick={handleWhatsApp}
          style={{
            width: "100%",
            background: "#25d366",
            border: "none",
            borderRadius: 12,
            color: "#fff",
            fontSize: 15,
            fontWeight: "bold",
            padding: "14px 0",
            cursor: "pointer",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 20 }}>💬</span> Share on WhatsApp
        </button>

        {/* Secondary: native share or copy */}
        <button
          onClick={handleNativeShare}
          style={{
            width: "100%",
            background: "transparent",
            border: "1px solid #128c7e",
            borderRadius: 12,
            color: "#dcf8c6",
            fontSize: 13,
            fontWeight: "bold",
            padding: "11px 0",
            cursor: "pointer",
          }}
        >
          📋 Copy / Share via other apps
        </button>

        {/* Preview of what will be shared */}
        <div style={{
          marginTop: 14,
          background: "rgba(0,0,0,0.25)",
          borderRadius: 10,
          padding: "10px 12px",
          fontSize: 11,
          color: "#dcf8c6",
          textAlign: "left",
          lineHeight: 1.8,
          whiteSpace: "pre-line",
          opacity: 0.85,
        }}>
          {shareText}
        </div>
      </div>
      {/* ── END SHARE CARD ── */}

      {/* Action buttons */}
      <button onClick={onRetry} style={goldBtn}>Try Again</button>
      <button onClick={onHome} style={{ width: "100%", background: "transparent", border: `1px solid ${t.border}`, borderRadius: 12, color: t.textSub, fontSize: 13, padding: 12, cursor: "pointer", marginBottom: 20 }}>
        Back to Home
      </button>

      {/* Question breakdown */}
      <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading, marginBottom: 12 }}>Question Breakdown</div>
      {qs.map((q, i) => {
        const userAns = answers[i];
        const isRight = userAns === q.answer;
        const isSkipped = !userAns;
        return (
          <div key={i} style={{ background: t.bgCard, border: `1px solid ${isSkipped ? t.border : isRight ? t.correctBorder : t.wrongBorder}`, borderRadius: 14, padding: "14px", marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: t.textMuted }}>Q{i + 1} · JUPEB {q.year}</span>
              <span style={{ fontSize: 12, fontWeight: "bold", color: isSkipped ? t.textMuted : isRight ? t.correctBorder : t.wrongBorder }}>
                {isSkipped ? "— Skipped" : isRight ? "✓ Correct" : "✗ Wrong"}
              </span>
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
      <button onClick={onRetry} style={goldBtn}>Try Again</button>
      <button onClick={onHome} style={{ width: "100%", background: "transparent", border: `1px solid ${t.border}`, borderRadius: 12, color: t.textSub, fontSize: 13, padding: 12, cursor: "pointer" }}>
        Back to Home
      </button>
    </div>
  );
}

// ── SUBJECT SELECT ────────────────────────────────────────────────────────────
function SubjectSelect({ t, onToggleTheme, onBack, onSelect, mode }) {
  const modeLabels = {
    cbt:   { title: "CBT Practice",    sub: "Select a subject to start" },
    exam:  { title: "Exam Mode",        sub: "Select a subject" },
    notes: { title: "Study Notes",      sub: "Select a subject" },
    pastq: { title: "Past Questions",   sub: "Select a subject" },
  };
  const label = modeLabels[mode];

  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text }}>
      <Header onBack={onBack} title={label.title} sub={label.sub} t={t} onToggleTheme={onToggleTheme} />
      <div style={{ padding: "20px 16px" }}>
        <div style={{ fontSize: 11, color: t.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
          Available Subjects
        </div>
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => { if (subject.available) onSelect(subject); }}
            style={{
              background: subject.available ? t.bgCard : t.bgInner,
              border: `1px solid ${t.border}`, borderRadius: 16,
              padding: "20px 16px", display: "flex", alignItems: "center",
              gap: 16, cursor: subject.available ? "pointer" : "default",
              width: "100%", textAlign: "left", marginBottom: 14,
              opacity: subject.available ? 1 : 0.7,
            }}
            onMouseEnter={(e) => { if (subject.available) e.currentTarget.style.border = `1px solid ${t.borderHover}`; }}
            onMouseLeave={(e) => (e.currentTarget.style.border = `1px solid ${t.border}`)}
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
                  <span style={{ background: "#f59e0b", color: "#000", fontSize: 10, fontWeight: "bold", padding: "2px 8px", borderRadius: 20 }}>
                    COMING SOON
                  </span>
                </div>
              )}
            </div>
            {subject.available ? (
              <div style={{ color: t.gold, fontSize: 20 }}>›</div>
            ) : (
              <div style={{ fontSize: 18 }}>🔒</div>
            )}
          </button>
        ))}
        <div style={{ background: t.keyBg, border: `1px solid ${t.keyBorder}`, borderRadius: 12, padding: "14px 16px", marginTop: 8 }}>
          <div style={{ fontSize: 13, color: t.keyText, lineHeight: 1.8 }}>
            🔑 More subjects coming soon based on user feedback. Currently available: <strong>Economics, Government</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── STREAK BANNER (shown on home) ─────────────────────────────────────────────
function getStreakTier(count) {
  if (count >= 100) return { icon: "👑",  label: "Legend",      color: "#9333ea", msg: "100+ days — you're unstoppable!"         };
  if (count >= 60)  return { icon: "🏆",  label: "Champion",    color: "#dc2626", msg: "2 months straight — incredible!"         };
  if (count >= 30)  return { icon: "💎",  label: "Diamond",     color: "#0ea5e9", msg: "30-day streak — elite student energy!"   };
  if (count >= 21)  return { icon: "🔥🔥🔥", label: "On Fire",  color: "#ea580c", msg: "3 weeks strong — keep the momentum!"    };
  if (count >= 14)  return { icon: "🔥🔥", label: "Dedicated",  color: "#f59e0b", msg: "2 weeks in — serious commitment!"       };
  if (count >= 7)   return { icon: "🔥",  label: "Week Streak", color: "#c8a84b", msg: "Full week! You're building a habit!"    };
  if (count >= 3)   return { icon: "⚡",  label: "Building",    color: "#16a34a", msg: "3+ days — keep the streak alive!"       };
  return             { icon: "🌟",  label: "Starting",           color: "#6b7280", msg: "Come back tomorrow to grow your streak!" };
}

function StreakBanner({ streak, t }) {                
  if (!streak || streak.count < 1) return null;
  const tier = getStreakTier(streak.count);

  return (
    <div style={{
      background: t.keyBg,
      border: `1px solid ${tier.color}66`,
      borderRadius: 12, padding: "12px 16px", marginBottom: 14,
      display: "flex", alignItems: "center", gap: 12,
    }}>
      {/* Icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: `${tier.color}22`,
        border: `1px solid ${tier.color}55`,
        display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 20, flexShrink: 0,
      }}>
        {tier.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 15, fontWeight: "bold", color: tier.color }}>
            {streak.count}-day streak
          </span>
          <span style={{
            fontSize: 9, fontWeight: "bold", letterSpacing: 1,
            color: tier.color, background: `${tier.color}22`,
            border: `1px solid ${tier.color}44`,
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

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [progress, setProgress] = useState(0);

  // ── THEME ──
 const { t, themeKey, setThemeKey,
        toggleTheme, card, goldBtn, actualTheme } = useApp();


const wrap = {
  minHeight: "100vh",
  background: t.bg,
  fontFamily: "Georgia, serif",
  color: t.text
};
  const { isOnline, wasOffline } = useOnlineStatus();
  // ── NAVIGATION ──
  const [screen, setScreen] = useState("home");
  const [history, setHistory] = useState(["home"]);
  
  // ── STREAK (ADD HERE) ──
  const { streak, updateStreak } = useStreak();

  // ── AUTH ──
  const { user, userScores, saveScore,
        handleGoogleLogin, handleLogout } = useAuth();
  
  // ── QUESTIONS ──
const { firebaseQuestions,
        loadingFirebase,
        fetchError,
        refetch } = useFirebase();
  
  const {
  permission,
  fcmToken,
  settings: notifSettings,
  loading: notifLoading,
  error: notifError,
  requestPermission,
  disableNotifications,
  updateSettings: updateNotifSettings,
} = useNotifications(user);
  
  // ── SUBJECT / MODE ──
  const [activeSubject, setActiveSubject] = useState(null);
  const [pendingMode, setPendingMode] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  // ── FEEDBACK ──
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSending, setFeedbackSending] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");

  // ── NOTES ──
  const [noteCourse, setNoteCourse] = useState(null);
  const [noteTopic, setNoteTopic] = useState(null);

  // ── PAST QUESTIONS ──
  const [pqCourse, setPqCourse] = useState(null);
  const [pqTopic, setPqTopic] = useState(null);

  const {
  // CBT
  cbtQs, cbtIdx, setCbtIdx,
  cbtAnswers, setCbtAnswers,
  cbtDone, setCbtDone,
  cbtTime, cbtRunning, setCbtRunning,
  cbtScoreSaved, setCbtScoreSaved,
  startCbt,

  // EXAM
  examCount, setExamCount,
  examMinutes, setExamMinutes,
  examQs, examIdx, setExamIdx,
  examAnswers, setExamAnswers,
  examDone, setExamDone,
  examTime, examRunning, setExamRunning,
  examScoreSaved, setExamScoreSaved,
  startExam,

  // CALCULATOR
  showCalc, setShowCalc,
  minimized, setMinimized,
} = useQuiz(firebaseQuestions, updateStreak);

  
 
  // ── NAVIGATION HELPERS ──
  const goTo = (newScreen) => {
    window.history.pushState({}, "");
    setHistory((h) => [...h, newScreen]);
    setScreen(newScreen);
  };

  const goBack = () => {
    if (history.length <= 1) return;
    if (
      (screen === "cbt_quiz" && !cbtDone && Object.keys(cbtAnswers).length > 0) ||
      (screen === "exam_quiz" && !examDone && Object.keys(examAnswers).length > 0)
    ) {
      const ok = window.confirm("⚠️ Are you sure you want to quit?\n\nYour progress will be lost!");
      if (!ok) return;
      setCbtRunning(false);
      setExamRunning(false);
    }
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
    setScreen(newHistory[newHistory.length - 1]);
  };

  // ── EFFECTS ──

  // Splash progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
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

  // Hardware back button
  useEffect(() => {
    const handleBack = () => goBack();
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [history]);

  
  const sendFeedback = async () => {
    if (!feedbackMessage.trim()) { setFeedbackError("Please write a message first."); return; }
    setFeedbackSending(true);
    setFeedbackError("");
    try {
      await addDoc(collection(db, "feedback"), {
        name: feedbackName.trim() || "Anonymous",
        message: feedbackMessage.trim(),
        timestamp: serverTimestamp(),
        subject: activeSubject?.name || "General",
      });
      setFeedbackSent(true);
      setFeedbackName("");
      setFeedbackMessage("");
    } catch (e) {
      setFeedbackError("Failed to send. Check your connection and try again.");
    }
    setFeedbackSending(false);
  };


  const data = activeSubject ? activeSubject.data : null;

  // ═══════════════════════════════════════════════════════════════════════════
  // ── SCREENS ────────────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════

  // ── SPLASH ──
  if (!isOnline && fetchError &&
    firebaseQuestions.length === 0) {
  return (
    <OfflineFallback onRetry={refetch} />
  );
  }
  if (showSplash) {
    const isDark = actualTheme === "dark";
    return (
      <div style={{
        minHeight: "100vh",
        background: isDark
          ? "linear-gradient(135deg,#0a1a0a 0%,#1a3a1a 50%,#0d2b0d 100%)"
          : "linear-gradient(135deg,#f0f4f8 0%,#e8f0e8 50%,#f5f0e8 100%)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "Georgia, serif", padding: "40px 20px",
      }}>
        <div style={{
          width: 110, height: 110, borderRadius: "50%",
          background: isDark
            ? "linear-gradient(135deg,#1e4d1e,#2d6a2d)"
            : "linear-gradient(135deg,#1a3a5c,#0d2b4a)",
          border: `3px solid ${isDark ? "#c8a84b" : "#1a3a5c"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 24,
          boxShadow: isDark ? "0 0 30px #c8a84b44" : "0 0 30px #1a3a5c44",
        }}>
          <span style={{ fontSize: 52 }}>🎓</span>
        </div>
        <div style={{ fontSize: 32, fontWeight: "bold", color: isDark ? "#f0ece0" : "#1a1a1a", marginBottom: 6, letterSpacing: 1 }}>
          StudyNaija
        </div>
        <div style={{ fontSize: 14, color: isDark ? "#c8a84b" : "#1a3a5c", marginBottom: 6, letterSpacing: 2, textTransform: "uppercase" }}>
          JUPEB Exam Prep
        </div>
        <div style={{ fontSize: 12, color: isDark ? "#8a9a8a" : "#666", marginBottom: 48 }}>
          Free · No Subscription
        </div>
        <div style={{ width: "60%", maxWidth: 200, height: 4, background: isDark ? "#1e2e1e" : "#ddd8cc", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: isDark
              ? "linear-gradient(90deg,#c8a84b,#f0d080)"
              : "linear-gradient(90deg,#1a3a5c,#2563eb)",
            borderRadius: 10, transition: "width 0.05s linear",
          }} />
        </div>
        <div style={{ fontSize: 11, color: isDark ? "#666" : "#888", letterSpacing: 1 }}>
          {progress < 40 ? "Loading questions..." :
           progress < 70 ? "Preparing study materials..." :
           progress < 90 ? "Almost ready..." : "Welcome! 🥳"}
        </div>
        <div style={{ position: "absolute", bottom: 30, fontSize: 10, color: isDark ? "#444" : "#999", textAlign: "center", lineHeight: 1.8 }}>
          studynaija.vercel.app<br />© 2026 StudyNaija
        </div>
      </div>
    );
  }

  // ── HOME ──
  if (screen === "home") {
    const totalQ =
      subjects.reduce((a, s) => a + Object.values(s.data.questions).reduce((b, arr) => b + arr.length, 0), 0) +
      firebaseQuestions.length;

    const homeCards = [
      { id: "cbt",      icon: "⏱️", title: "CBT Practice",    desc: "1 hour · 50 random questions",       color: "#0d9488" },
      { id: "exam",     icon: "📝", title: "Exam Mode",        desc: "Custom time & question count",       color: "#2563eb" },
      { id: "notes",    icon: "📖", title: "Study Notes",      desc: "Key points & full explanations",     color: "#16a34a" },
      { id: "pastq",    icon: "🗂️", title: "Past Questions",   desc: "Study by topic with solutions",      color: "#ea580c" },
      { id: "grading",  icon: "🏆", title: "Grading System",   desc: "JUPEB grade scale & points",         color: "#7c3aed" },
      { id: "settings", icon: "⚙️", title: "Settings",         desc: "Day / Night display mode",           color: "#374151" },
    ];

    return (
     <div style={wrap}>
  <OfflineIndicator
    isOnline={isOnline}
    wasOffline={wasOffline}
  />
    {/* Header */}
        <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "18px 16px", display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
            <div style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>JUPEB Exam Prep</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Free · No subscription</div>
          </div>
          <button onClick={() => goTo("profile")} style={{ background: "none", border: `1px solid ${t.gold}44`, borderRadius: 8, color: t.gold, fontSize: 13, cursor: "pointer", padding: "6px 10px", marginRight: 8 }}>
            {user
              ? <img src={user.photoURL} alt="profile" style={{ width: 24, height: 24, borderRadius: "50%" }} />
              : "👤"}
          </button>
          <button onClick={toggleTheme} style={{ background: "none", border: `1px solid ${t.gold}44`, borderRadius: 8, color: t.gold, fontSize: 18, cursor: "pointer", padding: "6px 10px" }}>
            {t.toggleIcon}
          </button>
        </div>

        <div style={{ padding: "16px" }}>
          {/* Streak banner */}
          <StreakBanner streak={streak} t={t} />

          {/* Hero */}
          <div style={{ background: t.heroBg, borderRadius: 16, padding: "18px 16px", marginBottom: 20, border: `1px solid ${t.heroBorder}` }}>
            <div style={{ fontSize: 11, color: t.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
              Economics · Government · More coming
            </div>
            <div style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 6 }}>JUPEB Exam Prep 📚📝</div>
            <div style={{ fontSize: 13, color: t.heroText, lineHeight: 1.6 }}>
               · CBT, Exam, Notes & Past Questions. 100% free.
            </div>
            <div style={{ fontSize: 11, color: t.gold, marginTop: 8 }}>
              💡 Tap ⋮ → "Add to Home Screen" to install as an app
            </div>
          </div>

          {/* Cards */}
        {loadingFirebase ? (
  <HomeCardSkeleton />
) : (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
    {homeCards.map((c) => (      <button
                key={c.id}
                onClick={() => {
                  if (c.id === "grading") goTo("grading");
                  else if (c.id === "settings") goTo("settings");
                  else { setPendingMode(c.id); goTo("subject_select"); }
                }}
                style={{ background: c.color, border: "none", borderRadius: 16, padding: "20px 14px", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 6, minHeight: 120 }}
              >
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
    }


  // ── SUBJECT SELECT ──
  if (screen === "subject_select") {
    return (
      <SubjectSelect t={t} onToggleTheme={toggleTheme} onBack={goBack} mode={pendingMode}
        onSelect={(subject) => {
          setActiveSubject(subject);
          if (pendingMode === "cbt") startCbt(subject, goTo);
          else if (pendingMode === "exam") goTo("year_select");
          else if (pendingMode === "notes") goTo("notes");
          else if (pendingMode === "pastq") goTo("pastq_courses");
        }}
      />
    );
  }

  // ── YEAR SELECT ──
  if (screen === "year_select" && activeSubject) {
    return (
      <YearSelect
        t={t} data={activeSubject.data}
        firebaseQuestions={firebaseQuestions}
        subjectId={activeSubject.id}
        onBack={goBack}
        onSelectYear={(year) => { setSelectedYear(year); goTo("exam_setup"); }}
      />
    );
  }

  // ── PROFILE ──
  if (screen === "profile") {
    return (
      <Profile t={t} user={user} userScores={userScores}
        onLogin={handleGoogleLogin} onLogout={handleLogout}
        onBack={goBack} goldBtn={goldBtn} card={card}
      />
    );
  }

  // ── FEEDBACK ──
  if (screen === "feedback") {
    return (
      <Feedback
        t={t}
        feedbackName={feedbackName} setFeedbackName={setFeedbackName}
        feedbackMessage={feedbackMessage} setFeedbackMessage={setFeedbackMessage}
        feedbackSending={feedbackSending} feedbackSent={feedbackSent}
        setFeedbackSent={setFeedbackSent} feedbackError={feedbackError}
        onSend={sendFeedback} onBack={goBack} goldBtn={goldBtn} card={card}
      />
    );
  }

  // ── ABOUT ──
  if (screen === "about") {
    return (
      <div style={wrap}>
        <Header onBack={goBack} title="About StudyNaija" t={t} onToggleTheme={toggleTheme} />
        <div style={{ padding: "16px" }}>
          <div style={{ margin: 30, padding: "0 10px" }}>
            <p style={{ fontSize: 16, color: t.textSub, textAlign: "center", lineHeight: "18px" }}>
              © 2026 StudyNaija. All rights reserved.
            </p>
            <p style={{ fontSize: 15, color: t.textSub, textAlign: "center", marginTop: 6 }}>
              StudyNaija is an independent educational platform and is not affiliated with,
              endorsed by, or associated with <strong>JUPEB</strong> or any official examination body.
            </p>
            <p style={{ fontSize: 15, color: t.textSub, textAlign: "center", marginTop: 6 }}>
              All trademarks and names belong to their respective owners.
            </p>
          </div>
        </div>
      </div>
    );
  }
// ── NOTIFICATIONS ──
if (screen === "notifications") {
  return (
    <NotificationSettings
      onBack={goBack}
      permission={permission}
      settings={notifSettings}
      loading={notifLoading}
      error={notifError}
      onRequestPermission={requestPermission}
      onDisable={disableNotifications}
      onUpdateSettings={updateNotifSettings}
    />
  );
}

  // ── SETTINGS ──
  if (screen === "settings") {
    return (
      <Settings
        t={t} goBack={goBack} goTo={goTo} user={user}
        themeKey={themeKey} setThemeKey={setThemeKey}
        goldBtn={goldBtn} toggleTheme={toggleTheme}
        onFeedback={() => goTo("feedback")}
      />
    );
  }

  // ── GRADING ──
  if (screen === "grading") {
    return (
      <div style={wrap}>
        <Header onBack={goBack} title="JUPEB Grading System" t={t} onToggleTheme={toggleTheme} />
        <div style={{ padding: "16px" }}>
          <div style={card}>
            <div style={{ fontSize: 13, color: t.noteText, lineHeight: 1.8, marginBottom: 16 }}>
              Maximum points = AAA + 1 bonus = <strong style={{ color: t.heading }}>16 points.</strong>
            </div>
            {grading.map((g) => (
              <div key={g.grade} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${t.border}` }}>
                <div style={{ fontSize: 22, fontWeight: "bold", color: t.gold, width: 32 }}>{g.grade}</div>
                <div style={{ fontSize: 13, color: t.text }}>{g.marks}%</div>
                <div style={{ fontSize: 13, color: t.textSub }}>{g.points} pts</div>
                <div style={{ fontSize: 13, fontWeight: "bold", color: g.remark === "Fail" ? "#dc3545" : g.remark === "Excellent" ? "#5cb85c" : t.gold }}>
                  {g.remark}
                </div>
              </div>
            ))}
            <div style={{ marginTop: 16, background: t.keyBg, border: `1px solid ${t.keyBorder}`, borderRadius: 10, padding: "14px", fontSize: 13, color: t.keyText, lineHeight: 2 }}>
              🏆 CCC = 3+3+3+1 = <strong>10 pts</strong> · AAA = 5+5+5+1 = <strong>16 pts</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── NOTES ──
  if (screen === "notes" && data) {
    return <NotesCourses t={t} data={data} activeSubject={activeSubject} onBack={goBack}
      onSelectCourse={(c) => { setNoteCourse(c); goTo("notes_topics"); }} />;
  }
  if (screen === "notes_topics" && noteCourse && data) {
    return <NotesTopics t={t} data={data} noteCourse={noteCourse} onBack={goBack}
      onSelectTopic={(tp) => { setNoteTopic(tp); goTo("notes_view"); }} />;
  }
  if (screen === "notes_view" && noteTopic && data) {
    return <NotesView t={t} data={data} noteTopic={noteTopic} onBack={goBack} card={card} />;
  }

  // ── PAST QUESTIONS ──
  if (screen === "pastq_courses" && data) {
    return <PastQCourses t={t} data={data} activeSubject={activeSubject} onBack={goBack}
      onSelectCourse={(c) => { setPqCourse(c); goTo("pastq_topics"); }} />;
  }
  if (screen === "pastq_topics" && pqCourse && data) {
    return <PastQTopics t={t} data={data} pqCourse={pqCourse} onBack={goBack}
      onSelectTopic={(tp) => { setPqTopic(tp); goTo("pastq_view"); }} />;
  }
  if (screen === "pastq_view" && pqTopic && data) {
    return <PastQView t={t} data={data} pqTopic={pqTopic} onBack={goBack} card={card} />;
  }

  // ── CBT QUIZ ──
  if (screen === "cbt_quiz") {
    if (cbtDone) {
      const correct = cbtQs.filter((q, i) => cbtAnswers[i] === q.answer).length;
      const pct = cbtQs.length > 0 ? Math.round((correct / cbtQs.length) * 100) : 0;
      if (user && !cbtScoreSaved) {
        saveScore("CBT", activeSubject?.name, correct, cbtQs.length, pct, cbtQs, cbtAnswers);
        setCbtScoreSaved(true);
      }
      return (
        <div style={wrap}>
          <Header onBack={() => goTo("home")} title="CBT Results" sub={activeSubject?.name} t={t} onToggleTheme={toggleTheme} />
          <ResultScreen qs={cbtQs} answers={cbtAnswers} t={t}
            onRetry={() => startCbt(activeSubject)}
            onHome={() => goTo("home")} />
        </div>
      );
    }
    return (
      <CbtQuiz
        t={t} cbtQs={cbtQs} cbtIdx={cbtIdx} setCbtIdx={setCbtIdx}
        cbtAnswers={cbtAnswers} setCbtAnswers={setCbtAnswers}
        cbtTime={cbtTime} cbtDone={cbtDone}
        setCbtDone={setCbtDone} setCbtRunning={setCbtRunning}
        activeSubject={activeSubject}
        onBack={() => {
          if (Object.keys(cbtAnswers).length > 0) {
            const ok = window.confirm("⚠️ Are you sure you want to quit?\n\nYour progress will be lost!");
            if (!ok) return;
            setCbtRunning(false);
          }
          goTo("home");
        }}
        card={card} goldBtn={goldBtn}
      />
    );
  }

  // ── EXAM SETUP ──
  if (screen === "exam_setup" && data) {
    return (
      <ExamSetup
        t={t} data={data} activeSubject={activeSubject}
        firebaseQuestions={firebaseQuestions}
        selectedYear={selectedYear}
        examCount={examCount} setExamCount={setExamCount}
        examMinutes={examMinutes} setExamMinutes={setExamMinutes}
        onStart={() => startExam(activeSubject, goTo, selectedYear)}
        onBack={goBack} goldBtn={goldBtn} card={card}
      />
    );
  }

  // ── EXAM QUIZ ──
  if (screen === "exam_quiz") {
    if (examDone) {
      const correct = examQs.filter((q, i) => examAnswers[i] === q.answer).length;
      const pct = examQs.length > 0 ? Math.round((correct / examQs.length) * 100) : 0;
      if (user && !examScoreSaved) {
        saveScore("Exam", activeSubject?.name, correct, examQs.length, pct, examQs, examAnswers);
        setExamScoreSaved(true);
      }
      return (
        <div style={wrap}>
          <Header onBack={() => goTo("home")} title="Exam Results" sub={activeSubject?.name} t={t} onToggleTheme={toggleTheme} />
          <ResultScreen qs={examQs} answers={examAnswers} t={t}
            onRetry={() => startExam(activeSubject)}
            onHome={() => goTo("home")} />
        </div>
      );
    }
    return (
      <ExamQuiz
        t={t} examQs={examQs} examIdx={examIdx} setExamIdx={setExamIdx}
        examAnswers={examAnswers} setExamAnswers={setExamAnswers}
        examTime={examTime} examDone={examDone}
        setExamDone={setExamDone} setExamRunning={setExamRunning}
        activeSubject={activeSubject}
        showCalc={showCalc} setShowCalc={setShowCalc}
        minimized={minimized} setMinimized={setMinimized}
        onBack={() => {
          if (Object.keys(examAnswers).length > 0) {
            const ok = window.confirm("⚠️ Are you sure you want to quit?\n\nYour progress will be lost!");
            if (!ok) return;
            setExamRunning(false);
          }
          goTo("exam_setup");
        }}
        card={card} goldBtn={goldBtn}
      />
    );
  }

  return null;
                            }
