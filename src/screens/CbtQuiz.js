import React from "react";

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

export default function CbtQuiz({
  t, cbtQs, cbtIdx, setCbtIdx,
  cbtAnswers, setCbtAnswers, cbtTime,
  cbtDone, setCbtDone, setCbtRunning,
  activeSubject, onBack, card, goldBtn,
}) {
  const q = cbtQs[cbtIdx];
  if (!q) return null;
  const answered = Object.keys(cbtAnswers).length;

  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text }}>
      {/* Header */}
      <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>CBT Practice</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{activeSubject?.name} · {answered}/{cbtQs.length} answered</div>
        </div>
        <div style={{ background: cbtTime < 300 ? "#dc3545" : "#16a34a", borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: "bold", color: "#fff" }}>
          {formatTime(cbtTime)}
        </div>
      </div>

      <div style={{ padding: "16px" }}>
<button onClick={() => setShowCalc(!showCalc)}
    style={{
      marginBottom: 10,
      background: t.goldBtn,
      border: "none",
      borderRadius: 10,
      padding: "8px 12px",
      color: t.goldBtnText,
      fontWeight: "bold",
      cursor: "pointer"
    }}
  >
    {showCalc ? "Close Calculator" : "Open Calculator"}
  </button>

  {/* 🧮 CALCULATOR */}
{showCalc && (
  <div style={{
    position: "fixed",
    bottom: 20,
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
      
      <span style={{ color: t.heading, fontWeight: "bold" }}>
        🧮
      </span>

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

        {/* Progress bar */}
        <div style={{ background: t.progressBg, borderRadius: 6, height: 5, marginBottom: 14 }}>
          <div style={{ background: t.progressFill, height: 5, borderRadius: 6, width: `${(answered / cbtQs.length) * 100}%`, transition: "width 0.3s" }} />
        </div>

        {/* Question pills */}
        <QuizPills total={cbtQs.length} current={cbtIdx} answers={cbtAnswers} onSelect={setCbtIdx} t={t} />

        {/* Question */}
        <div style={{ ...card }}>
          <div style={{ fontSize: 10, color: t.tagColor, letterSpacing: 2, marginBottom: 10 }}>JUPEB {q.year}</div>
          <div style={{ fontSize: 14, lineHeight: 1.7, color: t.text, marginBottom: 16 }}>{q.q}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.options.map(opt => {
              const l = opt[0], isSel = cbtAnswers[cbtIdx] === l;
              return (
                <button key={opt} onClick={() => setCbtAnswers(a => ({ ...a, [cbtIdx]: l }))} style={{
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

        {/* Navigation */}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setCbtIdx(i => Math.max(0, i - 1))} disabled={cbtIdx === 0}
            style={{ flex: 1, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, color: t.textSub, fontSize: 13, padding: 12, cursor: cbtIdx === 0 ? "default" : "pointer", opacity: cbtIdx === 0 ? 0.4 : 1 }}>← Prev</button>
          {cbtIdx < cbtQs.length - 1
            ? <button onClick={() => setCbtIdx(i => i + 1)} style={{ flex: 1, background: t.goldBtn, border: "none", borderRadius: 10, color: t.goldBtnText, fontSize: 13, fontWeight: "bold", padding: 12, cursor: "pointer" }}>Next →</button>
            : <button onClick={() => { setCbtRunning(false); setCbtDone(true); }} style={{ flex: 1, background: "#16a34a", border: "none", borderRadius: 10, color: "#fff", fontSize: 13, fontWeight: "bold", padding: 12, cursor: "pointer" }}>Submit ✓</button>
          }
        </div>
      </div>
    </div>
  );
        }
