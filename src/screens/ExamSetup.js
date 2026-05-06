import React from "react";

export default function ExamSetup({
  t, data, activeSubject, firebaseQuestions,
  examCount, setExamCount, examMinutes, setExamMinutes,
  onStart, onBack, goldBtn, card,
}) {
  const totalQCount = Object.values(data.questions).reduce((a, arr) => a + arr.length, 0) +
    firebaseQuestions.filter(q => q.subject === activeSubject?.id).length;

  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text }}>
      <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>Exam Mode</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{activeSubject?.name}</div>
        </div>
      </div>

      <div style={{ padding: "16px" }}>
        <div style={{ background: t.exBg, border: `1px solid ${t.exBorder}`, borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: t.exText, lineHeight: 1.8 }}>
            📝 Questions are randomly shuffled. Answer all questions first — results shown only after you submit.
          </div>
        </div>

        {/* Question Count */}
        <div style={{ ...card }}>
          <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading, marginBottom: 14 }}>Number of Questions</div>
          <div style={{ display: "flex", gap: 10 }}>
            {[15, 30, 40, 50].map(n => (
              <button key={n} onClick={() => setExamCount(n)} style={{
                flex: 1, padding: "14px 6px", borderRadius: 10,
                border: `2px solid ${examCount === n ? t.gold : t.border}`,
                background: examCount === n ? `${t.gold}22` : t.bgInner,
                color: examCount === n ? t.gold : t.textSub,
                fontSize: 16, fontWeight: "bold", cursor: "pointer"
              }}>{n}</button>
            ))}
          </div>
        </div>

        {/* Time Limit */}
        <div style={{ ...card }}>
          <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading, marginBottom: 14 }}>Time Limit</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[5, 15, 25, 60].map(m => (
              <button key={m} onClick={() => setExamMinutes(m)} style={{
                padding: "12px 16px", borderRadius: 10,
                border: `2px solid ${examMinutes === m ? t.gold : t.border}`,
                background: examMinutes === m ? `${t.gold}22` : t.bgInner,
                color: examMinutes === m ? t.gold : t.textSub,
                fontSize: 14, fontWeight: "bold", cursor: "pointer"
              }}>
                {m >= 60 ? `${m / 60}hr` : `${m}min`}
              </button>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 12, color: t.textSub, textAlign: "center", marginBottom: 16 }}>
          {Math.min(examCount, totalQCount)} questions from {totalQCount} available
        </div>

        <button onClick={onStart} style={goldBtn}>
          ▶ Start Exam — {Math.min(examCount, totalQCount)} questions · {examMinutes >= 60 ? `${examMinutes / 60}hr` : `${examMinutes}min`}
        </button>
      </div>
    </div>
  );
              }
