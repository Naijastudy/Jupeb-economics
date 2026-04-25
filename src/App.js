import { useState, useEffect } from "react";
import themes from "./themes";
import { courses, notes, questions, grading } from "./data";

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

function getAllQuestions() {
  let all = [];
  Object.entries(questions).forEach(([topicId, qs]) => {
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
        <div style={{ fontSize: 9, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija · JUPEB Economics</div>
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

function ResultScreen({ qs, answers, t, onRetry, onHome, title }) {
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

export default function App() {
  const [themeKey, setThemeKey] = useState("dark");
  const t = themes[themeKey];
  const toggleTheme = () => setThemeKey(k => k === "dark" ? "light" : "dark");
  const [screen, setScreen] = useState("home");

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

  useEffect(() => {
    if (!cbtRunning || cbtDone) return;
    const timer = setInterval(() => setCbtTime(prev => {
      if (prev <= 1) { setCbtRunning(false); setCbtDone(true); return 0; }
if (prev === 300) { alert("⚠️ 5 minutes remaining! Finish up and submit."); }
      return prev - 1;
    }), 1000);
    return () => clearInterval(timer);
  }, [cbtRunning, cbtDone]);

  useEffect(() => {
    if (!examRunning || examDone) return;
    const timer = setInterval(() => setExamTime(prev => {
      if (prev <= 1) { setExamRunning(false); setExamDone(true); return 0; }
if (prev === 300) { alert("⚠️ 5 minutes remaining! Finish up and submit."); }
      return prev - 1;
    }), 1000);
    return () => clearInterval(timer);
  }, [examRunning, examDone]);

  const wrap = { minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text };
  const card = { background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "18px 16px", marginBottom: 14 };
  const goldBtn = { width: "100%", background: t.goldBtn, border: "none", borderRadius: 12, color: t.goldBtnText, fontSize: 14, fontWeight: "bold", padding: 14, cursor: "pointer", display: "block", marginBottom: 10 };

  const totalQCount = Object.values(questions).reduce((a, arr) => a + arr.length, 0);

  // ── HOME ──────────────────────────────────────────────────────────────────
  if (screen === "home") {
    const homeCards = [
      { id: "cbt_start", icon: "⏱️", title: "CBT Practice", desc: `3 hours · All ${totalQCount} questions shuffled`, color: "#0d9488" },
      { id: "exam_setup", icon: "📝", title: "Exam Mode", desc: "Custom time & question count", color: "#2563eb" },
      { id: "notes", icon: "📖", title: "Study Notes", desc: "Key points & full explanations", color: "#16a34a" },
      { id: "pastq_courses", icon: "🗂️", title: "Past Questions", desc: "Study by topic with solutions", color: "#ea580c" },
      { id: "grading", icon: "🏆", title: "Grading System", desc: "JUPEB grade scale & points", color: "#7c3aed" },
      { id: "settings", icon: "⚙️", title: "Settings", desc: "Day / Night display mode", color: "#374151" },
    ];
    return (
      <div style={wrap}>
        <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "18px 16px", display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
            <div style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>JUPEB Economics</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Free · No subscription</div>
          </div>
          <button onClick={toggleTheme} style={{ background: "none", border: `1px solid ${t.gold}44`, borderRadius: 8, color: t.gold, fontSize: 18, cursor: "pointer", padding: "6px 10px" }}>{t.toggleIcon}</button>
        </div>
        <div style={{ padding: "16px" }}>
          <div style={{ background: t.heroBg, borderRadius: 16, padding: "18px 16px", marginBottom: 20, border: `1px solid ${t.heroBorder}` }}>
            <div style={{ fontSize: 11, color: t.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>ECN001 · ECN002 · ECN003 · ECN004</div>
            <div style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 6 }}>Full JUPEB Syllabus 📊</div>
            <div style={{ fontSize: 13, color: t.heroText, lineHeight: 1.6 }}>{totalQCount} questions across 23 topics — CBT, Exam, Notes & Past Questions. 100% free.</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {homeCards.map(c => (
              <button key={c.id} onClick={() => {
                if (c.id === "cbt_start") {
                  const qs = getAllQuestions();
                  setCbtQs(qs); setCbtIdx(0); setCbtAnswers({}); setCbtDone(false);
                  setCbtTime(3 * 60 * 60); setCbtRunning(true); setScreen("cbt_quiz");
                } else {
                  setScreen(c.id);
                }
              }} style={{ background: c.color, border: "none", borderRadius: 16, padding: "20px 14px", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 6, minHeight: 120 }}>
                <div style={{ fontSize: 28 }}>{c.icon}</div>
                <div style={{ fontSize: 14, fontWeight: "bold", color: "#fff" }}>{c.title}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>{c.desc}</div>
              </button>
            ))}
          </div>
          <div style={{ textAlign: "center", color: t.textMuted, fontSize: 11, marginTop: 20, lineHeight: 1.8 }}>
            Built from official JUPEB syllabus<br />jupeb-economics-jade.vercel.app
          </div>
        </div>
      </div>
    );
  }

  // ── SETTINGS ─────────────────────────────────────────────────────────────
  if (screen === "settings") {
    return (
      <div style={wrap}>
        <Header onBack={() => setScreen("home")} title="Settings" t={t} onToggleTheme={toggleTheme} />
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
        <Header onBack={() => setScreen("home")} title="JUPEB Grading System" t={t} onToggleTheme={toggleTheme} />
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
  if (screen === "notes") {
    const noteColors = ["#0d9488", "#2563eb", "#ea580c", "#7c3aed"];
    return (
      <div style={wrap}>
        <Header onBack={() => setScreen("home")} title="Study Notes" t={t} onToggleTheme={toggleTheme} />
        <div style={{ padding: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {courses.map((c, ci) => (
              <button key={c.id} onClick={() => { setNoteCourse(c); setScreen("notes_topics"); }} style={{ background: noteColors[ci % noteColors.length], border: "none", borderRadius: 16, padding: "20px 14px", cursor: "pointer", textAlign: "left" }}>
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

  if (screen === "notes_topics" && noteCourse) {
    return (
      <div style={wrap}>
        <Header onBack={() => setScreen("notes")} title={noteCourse.title} sub={noteCourse.code} t={t} onToggleTheme={toggleTheme} />
        <div style={{ padding: "16px" }}>
          {noteCourse.topics.map((tp, i) => {
            const count = (notes[tp.id] || []).length;
            return (
              <button key={tp.id} onClick={() => { if (count > 0) { setNoteTopic(tp); setScreen("notes_view"); } }} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, cursor: count > 0 ? "pointer" : "default", width: "100%", textAlign: "left", marginBottom: 10, opacity: count > 0 ? 1 : 0.5 }}
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

  if (screen === "notes_view" && noteTopic) {
    const topicNotes = notes[noteTopic.id] || [];
    return (
      <div style={wrap}>
        <Header onBack={() => setScreen("notes_topics")} title={noteTopic.label} t={t} onToggleTheme={toggleTheme} />
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
  if (screen === "pastq_courses") {
    const noteColors = ["#0d9488", "#2563eb", "#ea580c", "#7c3aed"];
    return (
      <div style={wrap}>
        <Header onBack={() => setScreen("home")} title="Past Questions" sub="Study by topic with solutions" t={t} onToggleTheme={toggleTheme} />
        <div style={{ padding: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {courses.map((c, ci) => {
              const qCount = c.topics.reduce((a, tp) => a + (questions[tp.id] || []).length, 0);
              return (
                <button key={c.id} onClick={() => { setPqCourse(c); setScreen("pastq_topics"); }} style={{ background: noteColors[ci % noteColors.length], border: "none", borderRadius: 16, padding: "20px 14px", cursor: "pointer", textAlign: "left" }}>
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

  if (screen === "pastq_topics" && pqCourse) {
    return (
      <div style={wrap}>
        <Header onBack={() => setScreen("pastq_courses")} title={pqCourse.title} sub={pqCourse.code} t={t} onToggleTheme={toggleTheme} />
        <div style={{ padding: "16px" }}>
          {pqCourse.topics.map((tp, i) => {
            const qCount = (questions[tp.id] || []).length;
            return (
              <button key={tp.id} onClick={() => { if (qCount > 0) { setPqTopic(tp); setPqRevealed({}); setPqSelected({}); setScreen("pastq_view"); } }} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, cursor: qCount > 0 ? "pointer" : "default", width: "100%", textAlign: "left", marginBottom: 10, opacity: qCount > 0 ? 1 : 0.5 }}
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

  if (screen === "pastq_view" && pqTopic) {
    const pqs = questions[pqTopic.id] || [];
    return (
      <div style={wrap}>
        <Header onBack={() => setScreen("pastq_topics")} title={pqTopic.label} sub={`${pqs.length} past questions`} t={t} onToggleTheme={toggleTheme} />
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
          <Header onBack={() => setScreen("home")} title="CBT Results" t={t} onToggleTheme={toggleTheme} />
          <ResultScreen qs={cbtQs} answers={cbtAnswers} t={t}
            onRetry={() => { const qs = getAllQuestions(); setCbtQs(qs); setCbtIdx(0); setCbtAnswers({}); setCbtDone(false); setCbtTime(3 * 60 * 60); setCbtRunning(true); setScreen("cbt_quiz"); }}
            onHome={() => setScreen("home")} />
        </div>
      );
    }

    const q = cbtQs[cbtIdx];
    if (!q) return null;
    const answered = Object.keys(cbtAnswers).length;

    return (
      <div style={wrap}>
        <Header onBack={() => { setCbtRunning(false); setScreen("home"); }} title="CBT Practice" sub={`${answered}/${cbtQs.length} answered`} t={t} onToggleTheme={toggleTheme}
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
  if (screen === "exam_setup") {
    return (
      <div style={wrap}>
        <Header onBack={() => setScreen("home")} title="Exam Mode" sub="Set your preferences" t={t} onToggleTheme={toggleTheme} />
        <div style={{ padding: "16px" }}>
          <div style={{ background: t.exBg, border: `1px solid ${t.exBorder}`, borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: t.exText, lineHeight: 1.8 }}>
              📝 Questions are randomly shuffled from ALL topics. Answer all questions first — results shown only after you submit.
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
              {[30, 45, 60, 90, 120].map(m => (
                <button key={m} onClick={() => setExamMinutes(m)} style={{ padding: "12px 16px", borderRadius: 10, border: `2px solid ${examMinutes === m ? t.gold : t.border}`, background: examMinutes === m ? `${t.gold}22` : t.bgInner, color: examMinutes === m ? t.gold : t.textSub, fontSize: 14, fontWeight: "bold", cursor: "pointer" }}>
                  {m >= 60 ? `${m / 60}hr` : `${m}min`}
                </button>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 12, color: t.textSub, textAlign: "center", marginBottom: 16 }}>
            {Math.min(examCount, totalQCount)} questions will be picked randomly from {totalQCount} available
          </div>

          <button onClick={() => {
            let qs = getAllQuestions();
            if (qs.length > examCount) qs = qs.slice(0, examCount);
            setExamQs(qs); setExamIdx(0); setExamAnswers({}); setExamDone(false);
            setExamTime(examMinutes * 60); setExamRunning(true); setScreen("exam_quiz");
          }} style={goldBtn}>
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
          <Header onBack={() => setScreen("home")} title="Exam Results" t={t} onToggleTheme={toggleTheme} />
          <ResultScreen qs={examQs} answers={examAnswers} t={t}
            onRetry={() => { let qs = getAllQuestions(); if (qs.length > examCount) qs = qs.slice(0, examCount); setExamQs(qs); setExamIdx(0); setExamAnswers({}); setExamDone(false); setExamTime(examMinutes * 60); setExamRunning(true); setScreen("exam_quiz"); }}
            onHome={() => setScreen("home")} />
        </div>
      );
    }

    const q = examQs[examIdx];
    if (!q) return null;
    const answered = Object.keys(examAnswers).length;

    return (
      <div style={wrap}>
        <Header onBack={() => { setExamRunning(false); setScreen("exam_setup"); }} title="Exam Mode" sub={`${answered}/${examQs.length} answered`} t={t} onToggleTheme={toggleTheme}
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