import { useState } from "react";
import themes from "./themes";
import { courses, notes, questions, grading } from "./data";

function Header({ onBack, title, sub, t, onToggleTheme, onSettings }) {
  return (
    <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 }}>
      {onBack && <button onClick={onBack} style={{ background: "none", border: "none", color: t.gold, fontSize: 22, cursor: "pointer", padding: 0 }}>←</button>}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 9, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija · JUPEB Economics</div>
        <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{sub}</div>}
      </div>
      {onSettings && (
        <button onClick={onSettings} style={{ background: "none", border: `1px solid ${t.gold}44`, borderRadius: 8, color: t.gold, fontSize: 13, cursor: "pointer", padding: "6px 10px", marginRight: 6 }}>⚙️</button>
      )}
      <button onClick={onToggleTheme} style={{ background: "none", border: `1px solid ${t.gold}44`, borderRadius: 8, color: t.gold, fontSize: 16, cursor: "pointer", padding: "6px 10px" }}>
        {t.toggleIcon}
      </button>
    </div>
  );
}

export default function App() {
  const [themeKey, setThemeKey] = useState("dark");
  const t = themes[themeKey];
  const toggleTheme = () => setThemeKey(k => k === "dark" ? "light" : "dark");

  const [screen, setScreen] = useState("home");
  const [activeCourse, setActiveCourse] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [tab, setTab] = useState("questions");
  const [revealed, setRevealed] = useState({});
  const [selected, setSelected] = useState({});

  const [quizActive, setQuizActive] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [qSel, setQSel] = useState(null);
  const [qRev, setQRev] = useState(false);
  const [qScore, setQScore] = useState(0);
  const [qDone, setQDone] = useState(false);

  const openCourse = (c) => { setActiveCourse(c); setScreen("course"); };
  const openTopic = (tp) => { setActiveTopic(tp); setScreen("topic"); setTab("questions"); setRevealed({}); setSelected({}); };
  const startQuiz = () => { setQuizActive(true); setQIdx(0); setQSel(null); setQRev(false); setQScore(0); setQDone(false); setScreen("quiz"); };

  const topicNotes = activeTopic ? (notes[activeTopic.id] || []) : [];
  const topicQs = activeTopic ? (questions[activeTopic.id] || []) : [];

  const wrap = { minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text };
  const card = { background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "18px 16px", marginBottom: 14 };
  const goldBtn = { width: "100%", background: t.goldBtn, border: "none", borderRadius: 10, color: t.goldBtnText, fontSize: 14, fontWeight: "bold", padding: 14, cursor: "pointer", display: "block", marginBottom: 10 };
  const ghostBtn = { width: "100%", background: "transparent", border: `1px solid ${t.border}`, borderRadius: 10, color: t.textSub, fontSize: 13, padding: 12, cursor: "pointer", display: "block" };

  // ── SETTINGS ─────────────────────────────────────────────────────────────
  if (screen === "settings") {
    return (
      <div style={wrap}>
        <Header onBack={() => setScreen("home")} title="Settings" t={t} onToggleTheme={toggleTheme} />
        <div style={{ padding: "20px 16px" }}>
          <div style={card}>
            <div style={{ fontSize: 13, color: t.textSub, marginBottom: 16 }}>Display Mode</div>
            <div style={{ display: "flex", gap: 12 }}>
              {["dark", "light"].map((mode) => (
                <button key={mode} onClick={() => setThemeKey(mode)} style={{
                  flex: 1, padding: "20px 10px", borderRadius: 14, cursor: "pointer", textAlign: "center",
                  background: themeKey === mode ? (mode === "dark" ? "#1a2a1a" : "#e8f0f8") : t.bgInner,
                  border: themeKey === mode ? `2px solid ${t.gold}` : `1px solid ${t.border}`,
                  color: t.text,
                }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{mode === "dark" ? "🌙" : "☀️"}</div>
                  <div style={{ fontSize: 13, fontWeight: "bold" }}>{mode === "dark" ? "Night Mode" : "Day Mode"}</div>
                  <div style={{ fontSize: 11, color: t.textSub, marginTop: 4 }}>{mode === "dark" ? "Dark background" : "Light background"}</div>
                  {themeKey === mode && <div style={{ fontSize: 10, color: t.gold, marginTop: 6 }}>✓ Active</div>}
                </button>
              ))}
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: 13, color: t.textSub, marginBottom: 14 }}>Theme Preview</div>
            <div style={{ fontSize: 15, fontWeight: "bold", color: t.heading, marginBottom: 10 }}>Heading Color</div>
            <div style={{ background: t.keyBg, border: `1px solid ${t.keyBorder}`, borderRadius: 8, padding: "10px 12px", marginBottom: 10, fontSize: 13, color: t.keyText }}>
              🔑 Key Point / Definition — Yellow highlight
            </div>
            <div style={{ background: t.exBg, border: `1px solid ${t.exBorder}`, borderRadius: 8, padding: "10px 12px", fontSize: 13, color: t.exText }}>
              📝 Example / Extra Note — Green highlight
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ ─────────────────────────────────────────────────────────────────
  if (screen === "quiz" && quizActive) {
    const qs = topicQs;
    const q = qs[qIdx];

    if (qDone) {
      const pct = Math.round((qScore / qs.length) * 100);
      const g = pct >= 70 ? "Excellent! 🎉" : pct >= 60 ? "Very Good! 💪" : pct >= 50 ? "Good! 📚" : "Keep Studying! 🔁";
      const gradeLabel = pct >= 70 ? "Grade A" : pct >= 60 ? "Grade B" : pct >= 50 ? "Grade C" : pct >= 45 ? "Grade D" : pct >= 40 ? "Grade E" : "Grade F";
      return (
        <div style={wrap}>
          <Header onBack={() => { setQuizActive(false); setScreen("topic"); }} title="Quiz Result" t={t} onToggleTheme={toggleTheme} />
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>📊</div>
            <div style={{ fontSize: 20, fontWeight: "bold", color: t.heading, marginBottom: 6 }}>{g}</div>
            <div style={{ fontSize: 44, fontWeight: "bold", color: t.gold, marginBottom: 4 }}>{pct}%</div>
            <div style={{ color: t.textSub, marginBottom: 8 }}>{qScore} / {qs.length} correct</div>
            <div style={{ fontSize: 13, color: t.gold, marginBottom: 28 }}>{gradeLabel}</div>
            <button onClick={startQuiz} style={goldBtn}>Retry Quiz</button>
            <button onClick={() => { setQuizActive(false); setScreen("topic"); }} style={ghostBtn}>Back to Topic</button>
          </div>
        </div>
      );
    }

    return (
      <div style={wrap}>
        <Header onBack={() => { setQuizActive(false); setScreen("topic"); }} title={activeTopic?.label} sub={`Question ${qIdx + 1} of ${qs.length}`} t={t} onToggleTheme={toggleTheme} />
        <div style={{ padding: "16px" }}>
          <div style={{ background: t.progressBg, borderRadius: 6, height: 5, marginBottom: 16 }}>
            <div style={{ background: t.progressFill, height: 5, borderRadius: 6, width: `${(qIdx / qs.length) * 100}%`, transition: "width 0.3s" }} />
          </div>
          <div style={{ ...card, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 10, color: t.tagColor, letterSpacing: 2 }}>JUPEB {q.year}</span>
              <span style={{ fontSize: 12, color: t.gold }}>Score: {qScore}</span>
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: t.text, marginBottom: 16 }}>{q.q}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {q.options.map((opt) => {
                const l = opt[0], isSel = qSel === l, isRight = l === q.answer;
                let bg = t.optionBg, border = t.border, col = t.optionText;
                if (qRev && isRight) { bg = t.correctBg; border = t.correctBorder; col = t.correctText; }
                else if (qRev && isSel && !isRight) { bg = t.wrongBg; border = t.wrongBorder; col = t.wrongText; }
                else if (!qRev && isSel) { bg = t.selectedBg; border = t.selectedBorder; col = t.selectedText; }
                return <button key={opt} onClick={() => { if (!qRev) setQSel(l); }} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: "11px 14px", textAlign: "left", color: col, fontSize: 13, cursor: qRev ? "default" : "pointer" }}>{opt}</button>;
              })}
            </div>
          </div>
          {qRev && <div style={{ background: t.expBg, border: `1px solid ${t.expBorder}`, borderRadius: 10, padding: "12px 14px", fontSize: 13, color: t.expText, lineHeight: 1.6, marginBottom: 12 }}>💡 {q.exp}</div>}
          {!qRev && qSel && <button onClick={() => { setQRev(true); if (qSel === q.answer) setQScore(s => s + 1); }} style={{ ...goldBtn, marginTop: 4 }}>Check Answer</button>}
          {qRev && <button onClick={() => { if (qIdx + 1 >= qs.length) setQDone(true); else { setQIdx(i => i + 1); setQSel(null); setQRev(false); } }} style={{ ...goldBtn, marginTop: 4 }}>{qIdx + 1 >= qs.length ? "See Results" : "Next →"}</button>}
        </div>
      </div>
    );
  }

  // ── TOPIC ─────────────────────────────────────────────────────────────────
  if (screen === "topic" && activeTopic) {
    return (
      <div style={wrap}>
        <Header onBack={() => setScreen("course")} title={activeTopic.label} sub={activeCourse?.code} t={t} onToggleTheme={toggleTheme} />
        <div style={{ display: "flex", borderBottom: `1px solid ${t.border}`, background: t.bgInner }}>
          {["questions", "notes"].map(tb => (
            <button key={tb} onClick={() => setTab(tb)} style={{ flex: 1, padding: "13px 0", background: "none", border: "none", borderBottom: tab === tb ? `3px solid ${t.gold}` : "3px solid transparent", color: tab === tb ? t.gold : t.textMuted, fontSize: 13, fontWeight: "bold", cursor: "pointer" }}>
              {tb === "questions" ? "📝 Past Questions" : "📖 Notes"}
            </button>
          ))}
        </div>
        <div style={{ padding: "16px" }}>
          {tab === "questions" && (
            <>
              {topicQs.length > 0 && <button onClick={startQuiz} style={goldBtn}>🎯 Start Quiz Mode ({topicQs.length} questions)</button>}
              {topicQs.length === 0 && <div style={{ ...card, textAlign: "center", color: t.textMuted }}>Questions being added soon 🔄</div>}
              {topicQs.map((q, qi) => {
                const isRev = revealed[qi], userAns = selected[qi];
                return (
                  <div key={qi} style={{ ...card, border: `1px solid ${isRev ? t.correctBorder : t.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: 10, color: t.tagColor, letterSpacing: 2 }}>JUPEB {q.year}</span>
                      {isRev && <span style={{ fontSize: 11, color: t.correctBorder }}>✓ Ans: {q.answer}</span>}
                    </div>
                    <div style={{ fontSize: 14, lineHeight: 1.7, color: t.text, marginBottom: 14 }}>{q.q}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {q.options.map((opt) => {
                        const l = opt[0], isSel = userAns === l, isRight = l === q.answer;
                        let bg = t.optionBg, border = t.border, col = t.optionText;
                        if (isRev && isRight) { bg = t.correctBg; border = t.correctBorder; col = t.correctText; }
                        else if (isRev && isSel && !isRight) { bg = t.wrongBg; border = t.wrongBorder; col = t.wrongText; }
                        else if (!isRev && isSel) { bg = t.selectedBg; border = t.selectedBorder; col = t.selectedText; }
                        return <button key={opt} onClick={() => { if (!isRev) setSelected(s => ({ ...s, [qi]: l })); }} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: "10px 14px", textAlign: "left", color: col, fontSize: 13, cursor: isRev ? "default" : "pointer" }}>{opt}</button>;
                      })}
                    </div>
                    {!isRev && <button onClick={() => setRevealed(r => ({ ...r, [qi]: true }))} style={{ marginTop: 12, background: "transparent", border: `1px solid ${t.gold}`, borderRadius: 8, color: t.gold, fontSize: 12, padding: "8px 18px", cursor: "pointer", width: "100%" }}>Show Answer & Explanation</button>}
                    {isRev && <div style={{ marginTop: 12, background: t.expBg, borderRadius: 10, padding: "12px 14px", fontSize: 13, color: t.expText, lineHeight: 1.6, borderLeft: `3px solid ${t.correctBorder}` }}>💡 {q.exp}</div>}
                  </div>
                );
              })}
            </>
          )}
          {tab === "notes" && (
            <>
              {topicNotes.length === 0 && <div style={{ ...card, textAlign: "center", color: t.textMuted }}>Notes being added soon 🔄</div>}
              {topicNotes.map((n, i) => (
                <div key={i} style={card}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: `${t.gold}22`, border: `1px solid ${t.gold}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: t.gold, fontWeight: "bold" }}>{i + 1}</div>
                    <div style={{ fontSize: 15, fontWeight: "bold", color: t.heading }}>{n.title}</div>
                  </div>
                  <div style={{ background: t.keyBg, border: `1px solid ${t.keyBorder}`, borderRadius: 8, padding: "10px 12px", marginBottom: 12, fontSize: 13, color: t.keyText, lineHeight: 1.6 }}>
                    🔑 <strong>Key Point:</strong> {n.key}
                  </div>
                  <div style={{ background: t.exBg, border: `1px solid ${t.exBorder}`, borderRadius: 8, padding: "10px 12px", fontSize: 13, color: t.exText, lineHeight: 1.8 }}>
                    📝 {n.body}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  }

  // ── COURSE ────────────────────────────────────────────────────────────────
  if (screen === "course" && activeCourse) {
    return (
      <div style={wrap}>
        <Header onBack={() => setScreen("home")} title={activeCourse.title} sub={`${activeCourse.code} · ${activeCourse.semester}`} t={t} onToggleTheme={toggleTheme} />
        <div style={{ padding: "16px" }}>
          <div style={{ fontSize: 11, color: t.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Topics</div>
          {activeCourse.topics.map((tp) => (
            <button key={tp.id} onClick={() => openTopic(tp)} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", width: "100%", textAlign: "left", marginBottom: 12 }}
              onMouseEnter={e => e.currentTarget.style.border = `1px solid ${t.borderHover}`}
              onMouseLeave={e => e.currentTarget.style.border = `1px solid ${t.border}`}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading }}>{tp.label}</div>
                <div style={{ fontSize: 11, color: t.gold, marginTop: 4 }}>
                  {(questions[tp.id] || []).length} questions · {(notes[tp.id] || []).length} notes
                </div>
              </div>
              <div style={{ color: t.gold, fontSize: 18 }}>›</div>
            </button>
          ))}
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
            <div style={{ fontSize: 13, color: t.noteText, lineHeight: 1.8, marginBottom: 16 }}>
              Maximum points = AAA = 15 + 1 bonus = <strong style={{ color: t.heading }}>16 points.</strong>
            </div>
            {grading.map((g) => (
              <div key={g.grade} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${t.border}` }}>
                <div style={{ fontSize: 22, fontWeight: "bold", color: t.gold, width: 32 }}>{g.grade}</div>
                <div style={{ fontSize: 13, color: t.text }}>{g.marks}</div>
                <div style={{ fontSize: 13, color: t.textSub }}>{g.points} pts</div>
                <div style={{ fontSize: 13, color: g.remark === "Fail" ? t.wrongBorder : g.remark === "Excellent" ? t.correctBorder : t.gold }}>{g.remark}</div>
              </div>
            ))}
            <div style={{ marginTop: 16, background: t.keyBg, border: `1px solid ${t.keyBorder}`, borderRadius: 8, padding: "12px", fontSize: 12, color: t.keyText, lineHeight: 2 }}>
              🔑 CCC = 3+3+3+1 = <strong>10 pts</strong> · AAA = 5+5+5+1 = <strong>16 pts</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── HOME ──────────────────────────────────────────────────────────────────
  const totalQ = Object.values(questions).reduce((a, arr) => a + arr.length, 0);
  const totalN = Object.values(notes).reduce((a, arr) => a + arr.length, 0);

  return (
    <div style={wrap}>
      <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "18px 20px", display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
          <div style={{ fontSize: 22, fontWeight: "bold", color: "#fff", marginTop: 2 }}>JUPEB Economics</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>Free • No subscription</div>
        </div>
        <button onClick={() => setScreen("settings")} style={{ background: "none", border: `1px solid ${t.gold}44`, borderRadius: 8, color: t.gold, fontSize: 13, cursor: "pointer", padding: "8px 12px", marginRight: 8 }}>⚙️</button>
        <button onClick={toggleTheme} style={{ background: "none", border: `1px solid ${t.gold}44`, borderRadius: 8, color: t.gold, fontSize: 18, cursor: "pointer", padding: "6px 10px" }}>{t.toggleIcon}</button>
      </div>
      <div style={{ padding: "20px 16px" }}>
        <div style={{ background: t.heroBg, borderRadius: 18, padding: "22px 20px", marginBottom: 22, border: `1px solid ${t.heroBorder}` }}>
          <div style={{ fontSize: 11, color: t.gold, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>ECN001 · ECN002 · ECN003 · ECN004</div>
          <div style={{ fontSize: 24, fontWeight: "bold", lineHeight: 1.3, color: "#fff", marginBottom: 10 }}>Full Syllabus<br />Coverage 📊</div>
          <div style={{ fontSize: 13, color: t.heroText, lineHeight: 1.6 }}>All 23 official JUPEB Economics topics — notes, past questions, quiz mode. 100% free.</div>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
          {[{ n: 23, l: "Topics" }, { n: totalQ, l: "Questions" }, { n: totalN, l: "Notes" }].map(({ n, l }) => (
            <div key={l} style={{ flex: 1, background: t.statBg, border: `1px solid ${t.statBorder}`, borderRadius: 12, padding: "14px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: "bold", color: t.gold }}>{n}</div>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: t.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Courses</div>
        {courses.map((c) => (
          <button key={c.id} onClick={() => openCourse(c)} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", width: "100%", textAlign: "left", marginBottom: 12 }}
            onMouseEnter={e => e.currentTarget.style.border = `1px solid ${t.borderHover}`}
            onMouseLeave={e => e.currentTarget.style.border = `1px solid ${t.border}`}>
            <div style={{ fontSize: 28 }}>{c.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: t.gold, marginBottom: 2 }}>{c.code} · {c.semester}</div>
              <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading }}>{c.title}</div>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: 3 }}>{c.topics.length} topics</div>
            </div>
            <div style={{ color: t.gold, fontSize: 18 }}>›</div>
          </button>
        ))}
        <button onClick={() => setScreen("grading")} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: "16px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", width: "100%", textAlign: "left", marginBottom: 12 }}
          onMouseEnter={e => e.currentTarget.style.border = `1px solid ${t.borderHover}`}
          onMouseLeave={e => e.currentTarget.style.border = `1px solid ${t.border}`}>
          <div style={{ fontSize: 28 }}>🏆</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading }}>JUPEB Grading System</div>
            <div style={{ fontSize: 11, color: t.textMuted, marginTop: 3 }}>A=5pts · B=4pts · C=3pts · Max 16pts</div>
          </div>
          <div style={{ color: t.gold, fontSize: 18 }}>›</div>
        </button>
        <div style={{ textAlign: "center", color: t.textMuted, fontSize: 11, marginTop: 20, lineHeight: 1.8 }}>
          Built from official JUPEB syllabus<br />More subjects coming based on your feedback
        </div>
      </div>
    </div>
  );
}