import React, { useState } from "react";

const noteColors = ["#0d9488", "#2563eb", "#ea580c", "#7c3aed"];

function RadioDot({ selected, color }) {
  return (
    <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${selected ? color : "#888"}`, background: selected ? color : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
    </div>
  );
}

export function PastQCourses({ t, data, activeSubject, onSelectCourse, onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text }}>
      <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>Past Questions</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{activeSubject?.name}</div>
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {data.courses.map((c, ci) => {
            const qCount = c.topics.reduce((a, tp) => a + (data.questions[tp.id] || []).length, 0);
            return (
              <button key={c.id} onClick={() => onSelectCourse(c)}
                style={{ background: noteColors[ci % noteColors.length], border: "none", borderRadius: 16, padding: "20px 14px", cursor: "pointer", textAlign: "left" }}>
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

export function PastQTopics({ t, data, pqCourse, onSelectTopic, onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text }}>
      <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>{pqCourse.title}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{pqCourse.code}</div>
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        {pqCourse.topics.map((tp, i) => {
          const qCount = (data.questions[tp.id] || []).length;
          return (
            <button key={tp.id} onClick={() => { if (qCount > 0) onSelectTopic(tp); }}
              style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, cursor: qCount > 0 ? "pointer" : "default", width: "100%", textAlign: "left", marginBottom: 10, opacity: qCount > 0 ? 1 : 0.5 }}
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

export function PastQView({ t, data, pqTopic, onBack, card }) {
  const [revealed, setRevealed] = useState({});
  const [selected, setSelected] = useState({});
  const pqs = data.questions[pqTopic.id] || [];

  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text }}>
      <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>{pqTopic.label}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{pqs.length} past questions</div>
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        {pqs.map((q, qi) => {
          const userAns = selected[qi];
          const isRev = revealed[qi];
          return (
            <div key={qi}>
              <div style={{ background: t.bgCard, border: `1px solid ${isRev ? t.correctBorder : t.border}`, borderRadius: 16, padding: "18px 16px", marginBottom: 14 }}>
                <div style={{ fontSize: 10, color: t.tagColor, letterSpacing: 2, marginBottom: 10 }}>JUPEB {q.year}</div>
                <div style={{ fontSize: 14, lineHeight: 1.7, color: t.text, marginBottom: 16 }}>{q.q}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {q.options.map(opt => {
                    const l = opt[0], isSel = userAns === l, isRight = l === q.answer;
                    let bg = t.optionBg, border = t.border, col = t.optionText, dotColor = "#888";
                    if (isRev && isRight) { bg = t.correctBg; border = t.correctBorder; col = t.correctText; dotColor = t.correctBorder; }
                    else if (isRev && isSel && !isRight) { bg = t.wrongBg; border = t.wrongBorder; col = t.wrongText; dotColor = t.wrongBorder; }
                    else if (!isRev && isSel) { bg = t.selectedBg; border = t.selectedBorder; col = t.selectedText; dotColor = t.selectedBorder; }
                    return (
                      <button key={opt} onClick={() => { if (!isRev) setSelected(s => ({ ...s, [qi]: l })); }}
                        style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: "12px 14px", textAlign: "left", color: col, fontSize: 13, cursor: isRev ? "default" : "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                        <RadioDot selected={isSel || (isRev && isRight)} color={dotColor} />
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {isRev && (
                  <div style={{ marginTop: 14, background: t.expBg, borderRadius: 10, padding: "14px", fontSize: 13, color: t.expText, lineHeight: 1.7, borderLeft: `3px solid ${t.correctBorder}` }}>
                    💡 <strong>Explanation:</strong> {q.exp}
                  </div>
                )}
              </div>
              {!isRev && (
                <button onClick={() => setRevealed(r => ({ ...r, [qi]: true }))}
                  style={{ marginTop: -6, marginBottom: 14, background: "transparent", border: `1px solid ${t.gold}`, borderRadius: 10, color: t.gold, fontSize: 13, padding: "10px 18px", cursor: "pointer", width: "100%", fontWeight: "bold" }}>
                  Show Answer & Explanation
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
        }
