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
