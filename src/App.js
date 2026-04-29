import { useState, useEffect } from "react";
import themes from "./themes";
import { subjects } from "./data/index";
import { grading } from "./data/economics";
import { db, auth, googleProvider } from "./firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy } from "firebase/firestore";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleOptions(q) {
  const shuffled = shuffle([...q.options]);
  const relabeled = shuffled.map((opt, i) => String.fromCharCode(65 + i) + opt.slice(1));
  const newAnswer = String.fromCharCode(65 + shuffled.findIndex(opt => opt[0] === q.answer));
  return { ...q, options: relabeled, answer: newAnswer };
}

function getAllQuestions(data, fbQuestions = [], subjectId = "economics") {
  let all = [];
  Object.entries(data.questions).forEach(([topicId, qs]) => {
    qs.forEach(q => all.push(shuffleOptions({ ...q, topicId })));
  });
  const fbFiltered = fbQuestions.filter(q => q.subject === subjectId);
  fbFiltered.forEach(q => {
    all.push(shuffleOptions({
      year: q.year || "2024",
      q: q.q,
      options: q.options,
      answer: q.answer,
      exp: q.exp,
      topicId: q.topic || "intro",
      fromFirebase: true,
    }));
  });
  return shuffle(all);
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function Header({ onBack, title, sub, t, onToggleTheme, right }) {
  return (
    <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 }}>
      {onBack && <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 0 }}>←</button>}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 9, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
        <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{sub}</div>}
      </div>
      {right}
      <button onClick={onToggleTheme} style={{ background: "none", border: `1px solid ${t.gold}44`, borderRadius: 8, color: t.gold, fontSize: 16, cursor: "pointer", padding: "6px 10px" }}>{t.toggleIcon}</button>
    </div>
  );
}

function RadioDot({ selected, color }) {
  return (
    <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${selected ? color : "#888"}`, background: selected ? color : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
    </div>
  );
}

function QuizPills({ total, current, answers, onSelect, t }) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
      {Array.from({ length: total }).map((_, i) => {
        const isAns = answers[i] !== undefined;
        const isCur = i === current;
        return (
          <button key={i} onClick={() => onSelect(i)} style={{ width: 34, height: 34, borderRadius: 8, border: `2px solid ${isCur ? t.gold : isAns ? t.correctBorder : t.border}`, background: isCur ? t.gold : isAns ? t.correctBg : t.bgCard, color: isCur ? t.goldBtnText : isAns ? t.correctText : t.textMuted, fontSize: 12, fontWeight: "bold", cursor: "pointer" }}>
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}

function QuestionCard({ q, idx, answers, setAnswers, revealed, t, showResult }) {
  const userAns = answers[idx];
  return (
    <div style={{ background: t.bgCard, border: `1px solid ${revealed ? t.correctBorder : t.border}`, borderRadius: 16, padding: "18px 16px", marginBottom: 14 }}>
      <div style={{ fontSize: 10, color: t.tagColor, letterSpacing: 2, marginBottom: 10 }}>JUPEB {q.year}</div>
      <div style={{ fontSize: 14, lineHeight: 1.7, color: t.text, marginBottom: 16 }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map(opt => {
          const l = opt[0], isSel = userAns === l, isRight = l === q.answer;
          let bg = t.optionBg, border = t.border, col = t.optionText, dotColor = "#888";
          if (showResult && isRight) { bg = t.correctBg; border = t.correctBorder; col = t.correctText; dotColor = t.correctBorder; }
          else if (showResult && isSel && !isRight) { bg = t.wrongBg; border = t.wrongBorder; col = t.wrongText; dotColor = t.wrongBorder; }
          else if (!showResult && isSel) { bg = t.selectedBg; border = t.selectedBorder; col = t.selectedText; dotColor = t.selectedBorder; }
          return (
            <button key={opt} onClick={() => { if (!showResult) setAnswers(a => ({ ...a, [idx]: l })); }} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: "12px 14px", textAlign: "left", color: col, fontSize: 13, cursor: showResult ? "default" : "pointer", display: "flex", alignItems: "center", gap: 12 }}>
              <RadioDot selected={isSel || (showResult && isRight)} color={dotColor} />
              {opt}
            </button>
          );
        })}
      </div>
      {revealed && (
        <div style={{ marginTop: 14, background: t.expBg, borderRadius: 10, padding: "14px", fontSize: 13, color: t.expText, lineHeight: 1.7, borderLeft: `3px solid ${t.correctBorder}` }}>
          💡 <strong>Explanation:</strong> {q.exp}
        </div>
      )}
    </div>
  );
}

function ResultScreen({ qs, answers, t, onRetry, onHome }) {
  const correct = qs.filter((q, i) => answers[i] === q.answer).length;
  const skipped = qs.filter((_, i) => !answers[i]).length;
  const wrong = qs.length - correct - skipped;
  const pct = qs.length > 0 ? Math.round((correct / qs.length) * 100) : 0;
  const gradeLabel = pct >= 70 ? "Excellent! Grade A 🎉" : pct >= 60 ? "Very Good! Grade B 💪" : pct >= 50 ? "Good! Grade C 📚" : pct >= 45 ? "Merit — Grade D" : pct >= 40 ? "Pass — Grade E" : "Fail — Keep Studying! 🔁";
  const goldBtn = { width: "100%", background: t.goldBtn, border: "none", borderRadius: 12, color: t.goldBtnText, fontSize: 14, fontWeight: "bold", padding: 14, cursor: "pointer", display: "block", marginBottom: 10 };
  return (
    <div style={{ padding: "16px" }}>
      <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "28px 16px", marginBottom: 20, textAlign: "center" }}>
        <div style={{ fontSize: 52 }}>📊</div>
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
            {!isRight && <div style={{ fontSize: 12, color: t.expText, background: t.expBg, borderRadius: 8, padding: "10px 12px", lineHeight: 1.7 }}>💡 {q.exp}</div>}
          </div>
        );
      })}
      <button onClick={onRetry} style={goldBtn}>Try Again</button>
      <button onClick={onHome} style={{ width: "100%", background: "transparent", border: `1px solid ${t.border}`, borderRadius: 12, color: t.textSub, fontSize: 13, padding: 12, cursor: "pointer" }}>Back to Home</button>
    </div>
  );
}

function SubjectSelect({ t, onToggleTheme, onBack, onSelect, mode }) {
  const modeLabels = {
    cbt: { title: "CBT Practice", sub: "Select a subject to start" },
    exam: { title: "Exam Mode", sub: "Select a subject" },
    notes: { title: "Study Notes", sub: "Select a subject" },
    pastq: { title: "Past Questions", sub: "Select a subject" },
  };
  const label = modeLabels[mode];
  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text }}>
      <Header onBack={onBack} title={label.title} sub={label.sub} t={t} onToggleTheme={onToggleTheme} />
      <div style={{ padding: "20px 16px" }}>
        <div style={{ fontSize: 11, color: t.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Available Subjects</div>
        {subjects.map(subject => (
          <button key={subject.id} onClick={() => { if (subject.available) onSelect(subject); }}
            style={{ background: subject.available ? t.bgCard : t.bgInner, border: `1px solid ${t.border}`, borderRadius: 16, padding: "20px 16px", display: "flex", alignItems: "center", gap: 16, cursor: subject.available ? "pointer" : "default", width: "100%", textAlign: "left", marginBottom: 14, opacity: subject.available ? 1 : 0.7 }}
            onMouseEnter={e => { if (subject.available) e.currentTarget.style.border = `1px solid ${t.borderHover}`; }}
            onMouseLeave={e => e.currentTarget.style.border = `1px solid ${t.border}`}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: subject.available ? subject.color : "#444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
              {subject.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: "bold", color: subject.available ? t.heading : t.textMuted }}>{subject.name}</div>
              {subject.available ? (
                <div style={{ fontSize: 12, color: t.gold, marginTop: 4 }}>
                  {Object.values(subject.data.questions).reduce((a, arr) => a + arr.length, 0)} questions · {Object.values(subject.data.notes).reduce((a, arr) => a + arr.length, 0)} notes
                </div>
              ) : (
                <div style={{ fontSize: 12, marginTop: 4 }}>
                  <span style={{ background: "#f59e0b", color: "#000", fontSize: 10, fontWeight: "bold", padding: "2px 8px", borderRadius: 20 }}>COMING SOON</span>
                </div>
              )}
            </div>
            {subject.available && <div style={{ color: t.gold, fontSize: 20 }}>›</div>}
            {!subject.available && <div style={{ fontSize: 18 }}>🔒</div>}
          </button>
        ))}
        <div style={{ background: t.keyBg, border: `1px solid ${t.keyBorder}`, borderRadius: 12, padding: "14px 16px", marginTop: 8 }}>
          <div style={{ fontSize: 13, color: t.keyText, lineHeight: 1.8 }}>
            🔑 More subjects coming soon based on user feedback.
          </div>
        </div>
      </div>
    </div>
  );
                }
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [progress, setProgress] = useState(0);
  const [themeKey, setThemeKey] = useState("dark");
  const [screen, setScreen] = useState("home");
  const [history, setHistory] = useState(["home"]);
  const [user, setUser] = useState(null);
  const [userScores, setUserScores] = useState([]);
  const [firebaseQuestions, setFirebaseQuestions] = useState([]);
  const [activeSubject, setActiveSubject] = useState(null);
  const [pendingMode, setPendingMode] = useState(null);
  const [noteCourse, setNoteCourse] = useState(null);
  const [noteTopic, setNoteTopic] = useState(null);
  const [pqCourse, setPqCourse] = useState(null);
  const [pqTopic, setPqTopic] = useState(null);
  const [pqRevealed, setPqRevealed] = useState({});
  const [pqSelected, setPqSelected] = useState({});
  const [cbtQs, setCbtQs] = useState([]);
  const [cbtIdx, setCbtIdx] = useState(0);
  const [cbtAnswers, setCbtAnswers] = useState({});
  const [cbtDone, setCbtDone] = useState(false);
  const [cbtTime, setCbtTime] = useState(3 * 60 * 60);
  const [cbtRunning, setCbtRunning] = useState(false);
  const [examCount, setExamCount] = useState(50);
  const [examMinutes, setExamMinutes] = useState(60);
  const [examQs, setExamQs] = useState([]);
  const [examIdx, setExamIdx] = useState(0);
  const [examAnswers, setExamAnswers] = useState({});
  const [examDone, setExamDone] = useState(false);
  const [examTime, setExamTime] = useState(3600);
  const [examRunning, setExamRunning] = useState(false);
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSending, setFeedbackSending] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");

  const t = themes[themeKey];
  const toggleTheme = () => setThemeKey(k => k === "dark" ? "light" : "dark");

  const goTo = (newScreen) => {
    window.history.pushState({}, "");
    setHistory(h => [...h, newScreen]);
    setScreen(newScreen);
  };

  const goBack = () => {
    if (history.length <= 1) return;
    const newHistory = history.slice(0, -1);
    const prevScreen = newHistory[newHistory.length - 1];
    setHistory(newHistory);
    setScreen(prevScreen);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(() => setShowSplash(false), 300); return 100; }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleBack = () => { goBack(); };
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [history]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchUserScores(currentUser.uid);
    });
    fetchFirebaseQuestions();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!cbtRunning || cbtDone) return;
    const timer = setInterval(() => setCbtTime(prev => {
      if (prev === 300) alert("⚠️ 5 minutes remaining!");
      if (prev <= 1) { setCbtRunning(false); setCbtDone(true); return 0; }
      return prev - 1;
    }), 1000);
    return () => clearInterval(timer);
  }, [cbtRunning, cbtDone]);

  useEffect(() => {
    if (!examRunning || examDone) return;
    const timer = setInterval(() => setExamTime(prev => {
      if (prev === 300) alert("⚠️ 5 minutes remaining!");
      if (prev <= 1) { setExamRunning(false); setExamDone(true); return 0; }
      return prev - 1;
    }), 1000);
    return () => clearInterval(timer);
  }, [examRunning, examDone]);

  const fetchUserScores = async (uid) => {
    try {
      const q = query(collection(db, "scores"), where("uid", "==", uid), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      setUserScores(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) { console.log("Error fetching scores:", e); }
  };

  const fetchFirebaseQuestions = async () => {
    try {
      const snapshot = await getDocs(collection(db, "questions"));
      setFirebaseQuestions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) { console.log("Error fetching Firebase questions:", e); }
  };

  const handleGoogleLogin = async () => {
    try { await signInWithPopup(auth, googleProvider); }
    catch (e) { console.log("Login error:", e); }
  };

  const handleLogout = async () => {
    try { await signOut(auth); setUserScores([]); }
    catch (e) { console.log("Logout error:", e); }
  };

  const saveScore = async (mode, subject, score, total, pct) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "scores"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        mode, subject, score, total, pct,
        timestamp: serverTimestamp(),
      });
      fetchUserScores(user.uid);
    } catch (e) { console.log("Error saving score:", e); }
  };

  const startCbt = (subject) => {
    const qs = getAllQuestions(subject.data, firebaseQuestions, subject.id);
    setCbtQs(qs); setCbtIdx(0); setCbtAnswers({}); setCbtDone(false);
    setCbtTime(3 * 60 * 60); setCbtRunning(true);
    goTo("cbt_quiz");
  };

  const startExam = (subject) => {
    let qs = getAllQuestions(subject.data, firebaseQuestions, subject.id);
    if (qs.length > examCount) qs = qs.slice(0, examCount);
    setExamQs(qs); setExamIdx(0); setExamAnswers({}); setExamDone(false);
    setExamTime(examMinutes * 60); setExamRunning(true);
    goTo("exam_quiz");
  };

  const data = activeSubject ? activeSubject.data : null;
  const wrap = { minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text };
  const card = { background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "18px 16px", marginBottom: 14 };
  const goldBtn = { width: "100%", background: t.goldBtn, border: "none", borderRadius: 12, color: t.goldBtnText, fontSize: 14, fontWeight: "bold", padding: 14, cursor: "pointer", display: "block", marginBottom: 10 };

  // ── SPLASH ────────────────────────────────────────────────────────────────
  if (showSplash) {
    return (
      <div style={{ minHeight: "100vh", background: themeKey === "dark" ? "linear-gradient(135deg, #0a1a0a 0%, #1a3a1a 50%, #0d2b0d 100%)" : "linear-gradient(135deg, #f0f4f8 0%, #e8f0e8 50%, #f5f0e8 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", padding: "40px 20px" }}>
        <div style={{ width: 110, height: 110, borderRadius: "50%", background: themeKey === "dark" ? "linear-gradient(135deg, #1e4d1e, #2d6a2d)" : "linear-gradient(135deg, #1a3a5c, #0d2b4a)", border: `3px solid ${themeKey === "dark" ? "#c8a84b" : "#1a3a5c"}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: themeKey === "dark" ? "0 0 30px #c8a84b44" : "0 0 30px #1a3a5c44" }}>
          <span style={{ fontSize: 52 }}>📊</span>
        </div>
        <div style={{ fontSize: 32, fontWeight: "bold", color: themeKey === "dark" ? "#f0ece0" : "#1a1a1a", marginBottom: 6, letterSpacing: 1 }}>StudyNaija</div>
        <div style={{ fontSize: 14, color: themeKey === "dark" ? "#c8a84b" : "#1a3a5c", marginBottom: 6, letterSpacing: 2, textTransform: "uppercase" }}>JUPEB Exam Prep</div>
        <div style={{ fontSize: 12, color: themeKey === "dark" ? "#8a9a8a" : "#666", marginBottom: 48 }}>Free · No Subscription</div>
        <div style={{ width: "60%", maxWidth: 200, height: 4, background: themeKey === "dark" ? "#1e2e1e" : "#ddd8cc", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ height: "100%", width: `${progress}%`, background: themeKey === "dark" ? "linear-gradient(90deg, #c8a84b, #f0d080)" : "linear-gradient(90deg, #1a3a5c, #2563eb)", borderRadius: 10, transition: "width 0.05s linear" }} />
        </div>
        <div style={{ fontSize: 11, color: themeKey === "dark" ? "#666" : "#888", letterSpacing: 1 }}>
          {progress < 40 ? "Loading questions..." : progress < 70 ? "Preparing study materials..." : progress < 90 ? "Almost ready..." : "Welcome! 🎉"}
        </div>
        <div style={{ position: "absolute", bottom: 30, fontSize: 10, color: themeKey === "dark" ? "#444" : "#999", textAlign: "center", lineHeight: 1.8 }}>
          studynaija.vercel.app<br />© 2026 StudyNaija
        </div>
      </div>
    );
  }

  // ── SUBJECT SELECT ────────────────────────────────────────────────────────
  if (screen === "subject_select") {
    return (
      <SubjectSelect t={t} onToggleTheme={toggleTheme} onBack={goBack} mode={pendingMode}
        onSelect={(subject) => {
          setActiveSubject(subject);
          if (pendingMode === "cbt") startCbt(subject);
          else if (pendingMode === "exam") goTo("exam_setup");
          else if (pendingMode === "notes") goTo("notes");
          else if (pendingMode === "pastq") goTo("pastq_courses");
        }}
      />
    );
    }
