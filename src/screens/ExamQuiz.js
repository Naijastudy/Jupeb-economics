import React, { useState } from "react";
import Calculator from "../Calculator";


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
          <button key={i} onClick={() => onSelect(i)} style={{
            width: 34, height: 34, borderRadius: 8,
            border: `2px solid ${isCur ? t.gold : isAns ? t.correctBorder : t.border}`,
            background: isCur ? t.gold : isAns ? t.correctBg : t.bgCard,
            color: isCur ? t.goldBtnText : isAns ? t.correctText : t.textMuted,
            fontSize: 12, fontWeight: "bold", cursor: "pointer"
          }}>
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function ExamQuiz({
  t, examQs, examIdx, setExamIdx,
  examAnswers, setExamAnswers, examTime,
  examDone, setExamDone, setExamRunning,
  activeSubject, showCalc, setShowCalc,
  minimized, setMinimized, onBack, card, goldBtn,
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  
  const q = examQs[examIdx];
  if (!q) return null;
  const answered = Object.keys(examAnswers).length;

  const handleSubmitClick = () => {
    if (answered > 0) {
      setShowConfirm(true);
    } else {
      // If nothing answered, maybe just exit or show a different warning
      setExamRunning(false);
      setExamDone(true);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text }}>
      {/* Header */}
      <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>Exam Mode</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{activeSubject?.name} · {answered}/{examQs.length} answered</div>
        </div>
        <div style={{ background: examTime < 300 ? "#dc3545" : t.goldBtn, borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: "bold", color: examTime < 300 ? "#fff" : t.goldBtnText }}>
          {formatTime(examTime)}
        </div>
      </div>
 {/* 🧮 CALCULATOR BUTTON */}
<button
  onClick={() => setShowCalc(!showCalc)}
  style={{
    position: "fixed",
    top: 70,
    right: 20,
    zIndex: 1000,
    background: t.goldBtn,
    border: "none",
    borderRadius: 10,
    padding: "8px 12px",
    color: t.goldBtnText,
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
  {showCalc ? "🧮" : "📟"}
</button>

{/* 🧮 CALCULATOR PANEL */}
{showCalc && (
  <div style={{
    position: "fixed",
    top: 70,
    right: 20,
    zIndex: 1000,
    width: minimized ? 120 : 280,
    background: t.bgCard,
    padding: 10,
    borderRadius: 16,
    boxShadow: "0 8px 30px rgba(0,0,0,0.3)"
  }}>
    
    {/* HEADER */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 6
    }}>
      <span style={{ color: t.heading, fontWeight: "bold" }}>📟</span>

      <div>
        <button onClick={() => setMinimized(!minimized)}>
          {minimized ? "⬆" : "⬇"}
        </button>

        <button onClick={() => setShowCalc(false)}>
          ✕
        </button>
      </div>
    </div>

    {/* BODY */}
    {!minimized && <Calculator t={t} />}
  </div>
)}

      <div style={{ padding: "16px" }}>
               
        {/* Progress bar */}
        <div style={{ background: t.progressBg, borderRadius: 6, height: 5, marginBottom: 14 }}>
          <div style={{ background: t.progressFill, height: 5, borderRadius: 6, width: `${(answered / examQs.length) * 100}%`, transition: "width 0.3s" }} />
        </div>

        {/* Question pills */}
        <QuizPills total={examQs.length} current={examIdx} answers={examAnswers} onSelect={setExamIdx} t={t} />

        {/* Question Card */}
        <div style={{ ...card, marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: t.tagColor, letterSpacing: 2, marginBottom: 10 }}>Question {examIdx + 1} · JUPEB {q.year}</div>
          <div style={{ fontSize: 14, lineHeight: 1.7, color: t.text, marginBottom: 16 }}>{q.q}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.options.map(opt => {
              const l = opt[0];
              const isSel = examAnswers[examIdx] === l;
              return (
                <button key={opt} onClick={() => setExamAnswers(a => ({ ...a, [examIdx]: l }))} style={{
                  background: isSel ? t.selectedBg : t.optionBg,
                  border: `2px solid ${isSel ? t.selectedBorder : t.border}`,
                  borderRadius: 10, padding: "12px 14px", textAlign: "left",
                  color: isSel ? t.selectedText : t.optionText,
                  fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 12
                }}>
                  <RadioDot selected={isSel} color={t.selectedBorder} />
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <button onClick={() => setExamIdx(i => Math.max(0, i - 1))} disabled={examIdx === 0}
            style={{ flex: 1, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, color: t.textSub, fontSize: 13, padding: 12, cursor: examIdx === 0 ? "default" : "pointer", opacity: examIdx === 0 ? 0.4 : 1 }}>← Prev</button>
          <button onClick={() => setExamIdx(i => Math.min(examQs.length - 1, i + 1))} disabled={examIdx === examQs.length - 1}
            style={{ flex: 1, background: t.goldBtn, border: "none", borderRadius: 10, color: t.goldBtnText, fontSize: 13, fontWeight: "bold", padding: 12, cursor: examIdx === examQs.length - 1 ? "default" : "pointer", opacity: examIdx === examQs.length - 1 ? 0.4 : 1 }}>Next →</button>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmitClick}
          style={{
            width: "100%",
            background: answered === examQs.length ? "#16a34a" : "#6b7280",
            border: "none",
            borderRadius: 12,
            color: "#fff",
            fontSize: 14,
            fontWeight: "bold",
            padding: 14,
            cursor: "pointer"
          }}
        >
          {answered === examQs.length
            ? "Submit Exam ✓"
            : `Submit (${examQs.length - answered} unanswered)`}
        </button>
      </div>


      {/* Confirmation Modal */}
      {showConfirm && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 2000
        }}>
          <div style={{
            background: t.bgCard, padding: 20, borderRadius: 12,
            width: 280, textAlign: "center", border: `1px solid ${t.border}`,
            boxShadow: "0 8px 30px rgba(0,0,0,0.3)"
          }}>
            <p style={{ fontWeight: "bold", color: t.heading, marginBottom: 20 }}>
              Are you sure you want to submit your exam?
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => {
                  setExamRunning(false);
                  setExamDone(true);
                  setShowConfirm(false);
                }}
                style={{ flex: 1, padding: 10, borderRadius: 8, border: "none", background: "#16a34a", color: "#fff", fontWeight: "bold", cursor: "pointer" }}
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                style={{ flex: 1, padding: 10, borderRadius: 8, background: t.bg, color: t.textSub, fontWeight: "bold", border: `1px solid ${t.border}`, cursor: "pointer" }}
              >
                No
              </button>
            </div>
          </div>
  
        </div>
      )}
    </div>
  );
}
  
