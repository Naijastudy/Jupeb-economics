import { useState, useEffect } from "react";
import themes from "./themes";
import { subjects } from "./data/index";
import { grading } from "./data/economics";

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

function getAllQuestions(data) {
  let all = [];
  Object.entries(data.questions).forEach(([topicId, qs]) => {
    qs.forEach(q => all.push(shuffleOptions({ ...q, topicId })));
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

// ── SUBJECT SELECTION SCREEN ─────────────────────────────────────────────────
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
            style={{ background: subject.available ? t.bgCard : t.bgInner, border: `1px solid ${subject.available ? t.border : t.border}`, borderRadius: 16, padding: "20px 16px", display: "flex", alignItems: "center", gap: 16, cursor: subject.available ? "pointer" : "default", width: "100%", textAlign: "left", marginBottom: 14, opacity: subject.available ? 1 : 0.7 }}
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
                <div style={{ fontSize: 12, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
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
            🔑 More subjects coming soon based on user feedback. Currently available: <strong>Economics</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [themeKey, setThemeKey] = useState("dark");
  const t = themes[themeKey];
  const toggleTheme = () => setThemeKey(k => k === "dark" ? "light" : "dark");
  const [screen, setScreen] = useState("home");
  const [history, setHistory] = useState(["home"]);
  const [activeSubject, setActiveSubject] = useState(null);
  const [pendingMode, setPendingMode] = useState(null);

  // Notes
  const [noteCourse, setNoteCourse] = useState(null);
  const [noteTopic, setNoteTopic] = useState(null);

  // Past Questions
  const [pqCourse, setPqCourse] = useState(null);
  const [pqTopic, setPqTopic] = useState(null);
  const [pqRevealed, setPqRevealed] = useState({});
  const [pqSelected, setPqSelected] = useState({});

  // CBT
  const [cbtQs, setCbtQs] = useState([]);
  const [cbtIdx, setCbtIdx] = useState(0);
  const [cbtAnswers, setCbtAnswers] = useState({});
  const [cbtDone, setCbtDone] = useState(false);
  const [cbtTime, setCbtTime] = useState(3 * 60 * 60);
  const [cbtRunning, setCbtRunning] = useState(false);

  // Exam
  const [examCount, setExamCount] = useState(50);
  const [examMinutes, setExamMinutes] = useState(60);
  const [examQs, setExamQs] = useState([]);
  const [examIdx, setExamIdx] = useState(0);
  const [examAnswers, setExamAnswers] = useState({});
  const [examDone, setExamDone] = useState(false);
  const [examTime, setExamTime] = useState(3600);
  const [examRunning, setExamRunning] = useState(false);

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
    const handleBack = () => { goBack(); };
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [history]);

  useEffect(() => {
    if (!cbtRunning || cbtDone) return;
    const timer = setInterval(() => setCbtTime(prev => {
      if (prev === 300) alert("⚠️ 5 minutes remaining! Finish up and submit.");
      if (prev <= 1) { setCbtRunning(false); setCbtDone(true); return 0; }
      return prev - 1;
    }), 1000);
    return () => clearInterval(timer);
  }, [cbtRunning, cbtDone]);

  useEffect(() => {
    if (!examRunning || examDone) return;
    const timer = setInterval(() => setExamTime(prev => {
      if (prev === 300) alert("⚠️ 5 minutes remaining! Finish up and submit.");
      if (prev <= 1) { setExamRunning(false); setExamDone(true); return 0; }
      return prev - 1;
    }), 1000);
    return () => clearInterval(timer);
  }, [examRunning, examDone]);

  const data = activeSubject ? activeSubject.data : null;
  const wrap = { minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text };
  const card = { background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "18px 16px", marginBottom: 14 };
  const goldBtn = { width: "100%", background: t.goldBtn, border: "none", borderRadius: 12, color: t.goldBtnText, fontSize: 14, fontWeight: "bold", padding: 14, cursor: "pointer", display: "block", marginBottom: 10 };

  const startCbt = (subject) => {
    const qs = getAllQuestions(subject.data);
    setCbtQs(qs); setCbtIdx(0); setCbtAnswers({}); setCbtDone(false);
    setCbtTime(3 * 60 * 60); setCbtRunning(true);
    goTo("cbt_quiz");
  };

  const startExam = (subject) => {
    let qs = getAllQuestions(subject.data);
    if (qs.length > examCount) qs = qs.slice(0, examCount);
    setExamQs(qs); setExamIdx(0); setExamAnswers({}); setExamDone(false);
    setExamTime(examMinutes * 60); setExamRunning(true);
    goTo("exam_quiz");
  };

  // ── SUBJECT SELECT ────────────────────────────────────────────────────────
  if (screen === "subject_select") {
    return (
      <SubjectSelect t={t} onToggleTheme={toggleTheme} onBack={goBack}
        mode={pendingMode}
        onSelect={(subject) => {
          setActiveSubject(subject);
          if (pendingMode === "cbt") { startCbt(subject); }
          else if (pendingMode === "exam") { goTo("exam_setup"); }
          else if (pendingMode === "notes") { goTo("notes"); }
          else if (pendingMode === "pastq") { goTo("pastq_courses"); }
        }}
      />
    );
  }

  // ── HOME ──────────────────────────────────────────────────────────────────
  if (screen === "home") {
    const totalQ = subjects.reduce((a, s) => a + Object.values(s.data.questions).reduce((b, arr) => b + arr.length, 0), 0);
    const homeCards = [
      { id: "cbt", icon: "⏱️", title: "CBT Practice", desc: "3 hours · All questions shuffled", color: "#0d9488" },
      { id: "exam", icon: "📝", title: "Exam Mode", desc: "Custom time & question count", color: "#2563eb" },
      { id: "notes", icon: "📖", title: "Study Notes", desc: "Key points & full explanations", color: "#16a34a" },
      { id: "pastq", icon: "🗂️", title: "Past Questions", desc: "Study by topic with solutions", color: "#ea580c" },
      { id: "grading", icon: "🏆", title: "Grading System", desc: "JUPEB grade scale & points", color: "#7c3aed" },
      { id: "settings", icon: "⚙️", title: "Settings", desc: "Day / Night display mode", color: "#374151" },
    ];
    return (
      <div style={wrap}>
        <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "18px 16px", display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
            <div style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>JUPEB Exam Prep</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Free · No subscription</div>
          </div>
          <button onClick={toggleTheme} style={{ background: "none", border: `1px solid ${t.gold}44`, borderRadius: 8, color: t.gold, fontSize: 18, cursor: "pointer", padding: "6px 10px" }}>{t.toggleIcon}</button>
        </div>
        <div style={{ padding: "16px" }}>
          <div style={{ background: t.heroBg, borderRadius: 16, padding: "18px 16px", marginBottom: 20, border: `1px solid ${t.heroBorder}` }}>
            <div style={{ fontSize: 11, color: t.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Economics · Government · More coming</div>
            <div style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 6 }}>JUPEB Exam Prep 📊</div>
            <div style={{ fontSize: 13, color: t.heroText, lineHeight: 1.6 }}>{totalQ} questions — CBT, Exam, Notes & Past Questions. 100% free.</div>
            <div style={{ fontSize: 11, color: t.gold, marginTop: 8 }}>💡 Tap ⋮ → "Add to Home Screen" to install as an app</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {homeCards.map(c => (
              <button key={c.id} onClick={() => {
                if (c.id === "grading") { goTo("grading"); }
                else if (c.id === "settings") { goTo("settings"); }
                else { setPendingMode(c.id); goTo("subject_select"); }
              }} style={{ background: c.color, border: "none", borderRadius: 16, padding: "20px 14px", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 6, minHeight: 120 }}>
                <div style={{ fontSize: 28 }}>{c.icon}</div>
                <div style={{ fontSize: 14, fontWeight: "bold", color: "#fff" }}>{c.title}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>{c.desc}</div>
              </button>
            ))}
          </div>
          <div style={{ textAlign: "center", color: t.textMuted, fontSize: 11, marginTop: 20, lineHeight: 2 }}>
  Built from official JUPEB syllabus<br />
  <a href="https://studynaija.vercel.app/" style={{ color: t.gold, textDecoration: "none" }}>studynaija.vercel.app</a><br />
  © 2026 StudyNaija. All rights reserved.
</div>
        </div>
      </div>
    );
  }

  // ── SETTINGS ─────────────────────────────────────────────────────────────
  if (screen === "settings") {
    return (
      <div style={wrap}>
        <Header onBack={goBack} title="Settings" t={t} onToggleTheme={toggleTheme} />
        <div style={{ padding: "16px" }}>
          <div style={card}>
            <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading, marginBottom: 16 }}>Display Mode</div>
            <div style={{ display: "flex", gap: 12 }}>
              {["dark", "light"].map(mode => (
                <button key={mode} onClick={() => setThemeKey(mode)} style={{ flex: 1, padding: "20px 10px", borderRadius: 14, cursor: "pointer", textAlign: "center", background: themeKey === mode ? (mode === "dark" ? "#1a2a1a" : "#e8f0f8") : t.bgInner, border: themeKey === mode ? `2px solid ${t.gold}` : `1px solid ${t.border}`, color: t.text }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{mode === "dark" ? "🌙" : "☀️"}</div>
                  <div style={{ fontSize: 13, fontWeight: "bold" }}>{mode === "dark" ? "Night Mode" : "Day Mode"}</div>
                  {themeKey === mode && <div style={{ fontSize: 10, color: t.gold, marginTop: 6 }}>✓ Active</div>}
                </button>
              ))}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading, marginBottom: 12 }}>Theme Preview</div>
            <div style={{ background: t.keyBg, border: `1px solid ${t.keyBorder}`, borderRadius: 8, padding: "10px 12px", marginBottom: 10, fontSize: 13, color: t.keyText }}>🔑 Key Point — Yellow highlight</div>
            <div style={{ background: t.exBg, border: `1px solid ${t.exBorder}`, borderRadius: 8, padding: "10px 12px", fontSize: 13, color: t.exText }}>📝 Explanation — Green highlight</div>
          </div>
        </div>
      </div>
    );
  }

  // ── GRADING ───────────────────────────────────────────────────────────────
  if (screen === "grading") {
    return (
      <div style={wrap}>
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
            <div style={{ marginTop: 16, background: t.keyBg, border: `1px solid ${t.keyBorder}`, borderRadius: 10, padding: "14px", fontSize: 13, color: t.keyText, lineHeight: 2 }}>
              🔑 CCC = 3+3+3+1 = <strong>10 pts</strong> · AAA = 5+5+5+1 = <strong>16 pts</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── NOTES ─────────────────────────────────────────────────────────────────
  if (screen === "notes" && data) {
    const noteColors = ["#0d9488", "#2563eb", "#ea580c", "#7c3aed"];
    return (
      <div style={wrap}>
        <Header onBack={goBack} title="Study Notes" sub={activeSubject?.name} t={t} onToggleTheme={toggleTheme} />
        <div style={{ padding: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {data.courses.map((c, ci) => (
              <button key={c.id} onClick={() => { setNoteCourse(c); goTo("notes_topics"); }} style={{ background: noteColors[ci % noteColors.length], border: "none", borderRadius: 16, padding: "20px 14px", cursor: "pointer", textAlign: "left" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{c.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: "bold", color: "#fff" }}>{c.code}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 4, lineHeight: 1.4 }}>{c.title}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>{c.topics.length} topics</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (screen === "notes_topics" && noteCourse && data) {
    return (
      <div style={wrap}>
        <Header onBack={goBack} title={noteCourse.title} sub={noteCourse.code} t={t} onToggleTheme={toggleTheme} />
        <div style={{ padding: "16px" }}>
          {noteCourse.topics.map((tp, i) => {
            const count = (data.notes[tp.id] || []).length;
            return (
              <button key={tp.id} onClick={() => { if (count > 0) { setNoteTopic(tp); goTo("notes_view"); } }} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, cursor: count > 0 ? "pointer" : "default", width: "100%", textAlign: "left", marginBottom: 10, opacity: count > 0 ? 1 : 0.5 }}
                onMouseEnter={e => { if (count > 0) e.currentTarget.style.border = `1px solid ${t.borderHover}`; }}
                onMouseLeave={e => e.currentTarget.style.border = `1px solid ${t.border}`}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: `${t.gold}22`, border: `1px solid ${t.gold}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: t.gold, fontWeight: "bold" }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading }}>{tp.label}</div>
                  <div style={{ fontSize: 11, color: t.textMuted, marginTop: 3 }}>{count > 0 ? `${count} notes` : "Coming soon"}</div>
                </div>
                <div style={{ color: t.gold, fontSize: 18 }}>›</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (screen === "notes_view" && noteTopic && data) {
    const topicNotes = data.notes[noteTopic.id] || [];
    return (
      <div style={wrap}>
        <Header onBack={goBack} title={noteTopic.label} t={t} onToggleTheme={toggleTheme} />
        <div style={{ padding: "16px" }}>
          {topicNotes.map((n, i) => (
            <div key={i} style={card}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: `${t.gold}22`, border: `1px solid ${t.gold}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: t.gold, fontWeight: "bold" }}>{i + 1}</div>
                <div style={{ fontSize: 15, fontWeight: "bold", color: t.heading }}>{n.title}</div>
              </div>
              <div style={{ background: t.keyBg, border: `1px solid ${t.keyBorder}`, borderRadius: 12, padding: "14px 16px", marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: t.keyText, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>🔑 Key Point</div>
                <div style={{ fontSize: 13, color: t.keyText, lineHeight: 1.8 }}>{n.key}</div>
              </div>
              <div style={{ background: t.exBg, border: `1px solid ${t.exBorder}`, borderRadius: 12, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, color: t.exText, fontWeight: "bold", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>📝 Full Explanation</div>
                <div style={{ fontSize: 13, color: t.exText, lineHeight: 1.9 }}>{n.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── PAST QUESTIONS ────────────────────────────────────────────────────────
  if (screen === "pastq_courses" && data) {
    const noteColors = ["#0d9488", "#2563eb", "#ea580c", "#7c3aed"];
    return (
      <div style={wrap}>
        <Header onBack={goBack} title="Past Questions" sub={activeSubject?.name} t={t} onToggleTheme={toggleTheme} />
        <div style={{ padding: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {data.courses.map((c, ci) => {
              const qCount = c.topics.reduce((a, tp) => a + (data.questions[tp.id] || []).length, 0);
              return (
                <button key={c.id} onClick={() => { setPqCourse(c); goTo("pastq_topics"); }} style={{ background: noteColors[ci % noteColors.length], border: "none", borderRadius: 16, padding: "20px 14px", cursor: "pointer", textAlign: "left" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{c.emoji}</div>
                  <div style={{ fontSize: 14, fontWeight: "bold", color: "#fff" }}>{c.code}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 4, lineHeight: 1.4 }}>{c.title}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>{qCount} questions</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (screen === "pastq_topics" && pqCourse && data) {
    return (
      <div style={wrap}>
        <Header onBack={goBack} title={pqCourse.title} sub={pqCourse.code} t={t} onToggleTheme={toggleTheme} />
        <div style={{ padding: "16px" }}>
          {pqCourse.topics.map((tp, i) => {
            const qCount = (data.questions[tp.id] || []).length;
            return (
              <button key={tp.id} onClick={() => { if (qCount > 0) { setPqTopic(tp); setPqRevealed({}); setPqSelected({}); goTo("pastq_view"); } }} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, cursor: qCount > 0 ? "pointer" : "default", width: "100%", textAlign: "left", marginBottom: 10, opacity: qCount > 0 ? 1 : 0.5 }}
                onMouseEnter={e => { if (qCount > 0) e.currentTarget.style.border = `1px solid ${t.borderHover}`; }}
                onMouseLeave={e => e.currentTarget.style.border = `1px solid ${t.border}`}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: `${t.gold}22`, border: `1px solid ${t.gold}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: t.gold, fontWeight: "bold" }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading }}>{tp.label}</div>
                  <div style={{ fontSize: 11, color: t.textMuted, marginTop: 3 }}>{qCount > 0 ? `${qCount} questions` : "Coming soon"}</div>
                </div>
                <div style={{ color: t.gold, fontSize: 18 }}>›</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (screen === "pastq_view" && pqTopic && data) {
    const pqs = data.questions[pqTopic.id] || [];
    return (
      <div style={wrap}>
        <Header onBack={goBack} title={pqTopic.label} sub={`${pqs.length} past questions`} t={t} onToggleTheme={toggleTheme} />
        <div style={{ padding: "16px" }}>
          {pqs.map((q, qi) => (
            <div key={qi}>
              <QuestionCard q={q} idx={qi} answers={pqSelected} setAnswers={setPqSelected} revealed={pqRevealed[qi]} t={t} showResult={pqRevealed[qi]} />
              {!pqRevealed[qi] && (
                <button onClick={() => setPqRevealed(r => ({ ...r, [qi]: true }))} style={{ marginTop: -6, marginBottom: 14, background: "transparent", border: `1px solid ${t.gold}`, borderRadius: 10, color: t.gold, fontSize: 13, padding: "10px 18px", cursor: "pointer", width: "100%", fontWeight: "bold" }}>
                  Show Answer & Explanation
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── CBT QUIZ ──────────────────────────────────────────────────────────────
  if (screen === "cbt_quiz") {
    if (cbtDone) {
      return (
        <div style={wrap}>
          <Header onBack={() => goTo("home")} title="CBT Results" sub={activeSubject?.name} t={t} onToggleTheme={toggleTheme} />
          <ResultScreen qs={cbtQs} answers={cbtAnswers} t={t}
            onRetry={() => { startCbt(activeSubject); }}
            onHome={() => goTo("home")} />
        </div>
      );
    }
    const q = cbtQs[cbtIdx];
    if (!q) return null;
    const answered = Object.keys(cbtAnswers).length;
    return (
      <div style={wrap}>
        <Header onBack={() => { setCbtRunning(false); goTo("home"); }} title="CBT Practice" sub={`${activeSubject?.name} · ${answered}/${cbtQs.length} answered`} t={t} onToggleTheme={toggleTheme}
          right={<div style={{ background: cbtTime < 300 ? "#dc3545" : "#16a34a", borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: "bold", color: "#fff", marginRight: 8 }}>{formatTime(cbtTime)}</div>}
        />
        <div style={{ padding: "16px" }}>
          <div style={{ background: t.progressBg, borderRadius: 6, height: 5, marginBottom: 14 }}>
            <div style={{ background: t.progressFill, height: 5, borderRadius: 6, width: `${(answered / cbtQs.length) * 100}%`, transition: "width 0.3s" }} />
          </div>
          <QuizPills total={cbtQs.length} current={cbtIdx} answers={cbtAnswers} onSelect={setCbtIdx} t={t} />
          <QuestionCard q={q} idx={cbtIdx} answers={cbtAnswers} setAnswers={setCbtAnswers} revealed={false} t={t} showResult={false} />
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setCbtIdx(i => Math.max(0, i - 1))} disabled={cbtIdx === 0} style={{ flex: 1, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, color: t.textSub, fontSize: 13, padding: 12, cursor: cbtIdx === 0 ? "default" : "pointer", opacity: cbtIdx === 0 ? 0.4 : 1 }}>← Prev</button>
            {cbtIdx < cbtQs.length - 1
              ? <button onClick={() => setCbtIdx(i => i + 1)} style={{ flex: 1, background: t.goldBtn, border: "none", borderRadius: 10, color: t.goldBtnText, fontSize: 13, fontWeight: "bold", padding: 12, cursor: "pointer" }}>Next →</button>
              : <button onClick={() => { setCbtRunning(false); setCbtDone(true); }} style={{ flex: 1, background: "#16a34a", border: "none", borderRadius: 10, color: "#fff", fontSize: 13, fontWeight: "bold", padding: 12, cursor: "pointer" }}>Submit ✓</button>
            }
          </div>
        </div>
      </div>
    );
  }

  // ── EXAM SETUP ────────────────────────────────────────────────────────────
  if (screen === "exam_setup" && data) {
    const totalQCount = Object.values(data.questions).reduce((a, arr) => a + arr.length, 0);
    return (
      <div style={wrap}>
        <Header onBack={goBack} title="Exam Mode" sub={activeSubject?.name} t={t} onToggleTheme={toggleTheme} />
        <div style={{ padding: "16px" }}>
          <div style={{ background: t.exBg, border: `1px solid ${t.exBorder}`, borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: t.exText, lineHeight: 1.8 }}>
              📝 Questions are randomly shuffled. Answer all questions first — results shown only after you submit.
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading, marginBottom: 14 }}>Number of Questions</div>
            <div style={{ display: "flex", gap: 10 }}>
              {[15, 30, 40, 50].map(n => (
                <button key={n} onClick={() => setExamCount(n)} style={{ flex: 1, padding: "14px 6px", borderRadius: 10, border: `2px solid ${examCount === n ? t.gold : t.border}`, background: examCount === n ? `${t.gold}22` : t.bgInner, color: examCount === n ? t.gold : t.textSub, fontSize: 16, fontWeight: "bold", cursor: "pointer" }}>{n}</button>
              ))}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading, marginBottom: 14 }}>Time Limit</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[5, 15, 30, 60].map(m => (
                <button key={m} onClick={() => setExamMinutes(m)} style={{ padding: "12px 16px", borderRadius: 10, border: `2px solid ${examMinutes === m ? t.gold : t.border}`, background: examMinutes === m ? `${t.gold}22` : t.bgInner, color: examMinutes === m ? t.gold : t.textSub, fontSize: 14, fontWeight: "bold", cursor: "pointer" }}>
                  {m >= 60 ? `${m / 60}hr` : `${m}min`}
                </button>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 12, color: t.textSub, textAlign: "center", marginBottom: 16 }}>
            {Math.min(examCount, totalQCount)} questions from {totalQCount} available
          </div>
          <button onClick={() => startExam(activeSubject)} style={goldBtn}>
            ▶ Start Exam — {Math.min(examCount, totalQCount)} questions · {examMinutes >= 60 ? `${examMinutes / 60}hr` : `${examMinutes}min`}
          </button>
        </div>
      </div>
    );
  }

  // ── EXAM QUIZ ─────────────────────────────────────────────────────────────
  if (screen === "exam_quiz") {
    if (examDone) {
      return (
        <div style={wrap}>
          <Header onBack={() => goTo("home")} title="Exam Results" sub={activeSubject?.name} t={t} onToggleTheme={toggleTheme} />
          <ResultScreen qs={examQs} answers={examAnswers} t={t}
            onRetry={() => startExam(activeSubject)}
            onHome={() => goTo("home")} />
        </div>
      );
    }
    const q = examQs[examIdx];
    if (!q) return null;
    const answered = Object.keys(examAnswers).length;
    return (
      <div style={wrap}>
        <Header onBack={() => { setExamRunning(false); goTo("exam_setup"); }} title="Exam Mode" sub={`${activeSubject?.name} · ${answered}/${examQs.length} answered`} t={t} onToggleTheme={toggleTheme}
          right={<div style={{ background: examTime < 300 ? "#dc3545" : t.goldBtn, borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: "bold", color: examTime < 300 ? "#fff" : t.goldBtnText, marginRight: 8 }}>{formatTime(examTime)}</div>}
        />
        <div style={{ padding: "16px" }}>
          <div style={{ background: t.progressBg, borderRadius: 6, height: 5, marginBottom: 14 }}>
            <div style={{ background: t.progressFill, height: 5, borderRadius: 6, width: `${(answered / examQs.length) * 100}%`, transition: "width 0.3s" }} />
          </div>
          <QuizPills total={examQs.length} current={examIdx} answers={examAnswers} onSelect={setExamIdx} t={t} />
          <QuestionCard q={q} idx={examIdx} answers={examAnswers} setAnswers={setExamAnswers} revealed={false} t={t} showResult={false} />
          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <button onClick={() => setExamIdx(i => Math.max(0, i - 1))} disabled={examIdx === 0} style={{ flex: 1, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, color: t.textSub, fontSize: 13, padding: 12, cursor: examIdx === 0 ? "default" : "pointer", opacity: examIdx === 0 ? 0.4 : 1 }}>← Prev</button>
            <button onClick={() => setExamIdx(i => Math.min(examQs.length - 1, i + 1))} disabled={examIdx === examQs.length - 1} style={{ flex: 1, background: t.goldBtn, border: "none", borderRadius: 10, color: t.goldBtnText, fontSize: 13, fontWeight: "bold", padding: 12, cursor: examIdx === examQs.length - 1 ? "default" : "pointer", opacity: examIdx === examQs.length - 1 ? 0.4 : 1 }}>Next →</button>
          </div>
          <button onClick={() => { setExamRunning(false); setExamDone(true); }} style={{ width: "100%", background: answered === examQs.length ? "#16a34a" : "#6b7280", border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: "bold", padding: 14, cursor: "pointer" }}>
            {answered === examQs.length ? "Submit Exam ✓" : `Submit (${examQs.length - answered} unanswered)`}
          </button>
        </div>
      </div>
    );
  }

  return null;
}