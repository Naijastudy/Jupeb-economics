import React from "react";
import QuestionCard from "./QuestionCard";
import PropTypes from "prop-types";
import { makeStyles } from "../styles/common";


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
  const s = makeStyles(t);
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

        {/* Progress bar */}
       <div style={s.progressBar}>
  <div style={s.progressFill(
    (answered / cbtQs.length) * 100
  )} /> </div>

        {/* Question pills */}
        <QuizPills total={cbtQs.length} current={cbtIdx} answers={cbtAnswers} onSelect={setCbtIdx} t={t} />

        {/* Question */}
      {/* Question */}
        <QuestionCard
          q={q} idx={cbtIdx}
          answers={cbtAnswers} setAnswers={setCbtAnswers}
          revealed={false} t={t} showResult={false}
        />

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
CbtQuiz.propTypes = {
  t: PropTypes.object.isRequired,
  cbtQs: PropTypes.array.isRequired,
  cbtIdx: PropTypes.number.isRequired,
  setCbtIdx: PropTypes.func.isRequired,
  cbtAnswers: PropTypes.object.isRequired,
  setCbtAnswers: PropTypes.func.isRequired,
  cbtTime: PropTypes.number.isRequired,
  cbtDone: PropTypes.bool.isRequired,
  setCbtDone: PropTypes.func.isRequired,
  setCbtRunning: PropTypes.func.isRequired,
  activeSubject: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  onBack: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  goldBtn: PropTypes.object.isRequired,
};
