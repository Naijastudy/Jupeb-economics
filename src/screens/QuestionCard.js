import React from "react";

function RadioDot({ selected, color }) {
  return (
    <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${selected ? color : "#888"}`, background: selected ? color : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
    </div>
  );
}

function QuestionTable({ table, t }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: 16 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr>
            {table.headers.map((h, i) => (
              <th key={i} style={{ background: t.bgHeader, color: t.gold, padding: "8px 10px", border: `1px solid ${t.border}`, textAlign: "center", fontSize: 11, fontWeight: "bold" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? t.bgCard : t.bgInner }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: "8px 10px", border: `1px solid ${t.border}`, textAlign: "center", color: cell === "X" || cell === "Y" ? t.gold : t.text, fontWeight: cell === "X" || cell === "Y" ? "bold" : "normal", fontSize: 12 }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function QuestionMiniDiagram({ type, t }) {
  if (type === "ppc") {
    return (
      <div style={{ background: t.bgInner, border: `1px solid ${t.border}`, borderRadius: 12, padding: 10, marginBottom: 16 }}>
        <svg viewBox="0 0 340 200" style={{ width: "100%" }}>
          <line x1="40" y1="10" x2="40" y2="180" stroke={t.text} strokeWidth="2" />
          <line x1="40" y1="180" x2="310" y2="180" stroke={t.text} strokeWidth="2" />
          <polygon points="40,4 36,14 44,14" fill={t.text} />
          <polygon points="316,180 306,176 306,184" fill={t.text} />
          <text x="12" y="100" fill={t.textSub} fontSize="9" textAnchor="middle" transform="rotate(-90,12,100)">Capital goods</text>
          <text x="175" y="196" fill={t.textSub} fontSize="9" textAnchor="middle">Consumer goods</text>
          <text x="44" y="16" fill={t.textSub} fontSize="9">Y</text>
          <text x="312" y="184" fill={t.textSub} fontSize="9">X</text>
          <path d="M 40 20 Q 180 80 300 170" fill="none" stroke="#16a34a" strokeWidth="2.5" />
          <path d="M 40 20 Q 180 80 300 170 L 300 180 L 40 180 Z" fill="#16a34a" fillOpacity="0.08" />
          <text x="44" y="22" fill={t.text} fontSize="10" fontWeight="bold">B</text>
          <circle cx="160" cy="76" r="5" fill="#16a34a" />
          <text x="166" y="72" fill={t.text} fontSize="10" fontWeight="bold">C</text>
          <circle cx="160" cy="120" r="5" fill="#f59e0b" />
          <text x="166" y="116" fill="#f59e0b" fontSize="10" fontWeight="bold">E</text>
          <circle cx="240" cy="45" r="5" fill="#dc3545" />
          <text x="246" y="41" fill="#dc3545" fontSize="9" fontWeight="bold">Unattainable</text>
          <text x="295" y="174" fill={t.text} fontSize="10" fontWeight="bold">D</text>
          <line x1="40" y1="76" x2="160" y2="76" stroke={t.border} strokeWidth="1" strokeDasharray="3,3" />
          <line x1="160" y1="76" x2="160" y2="180" stroke={t.border} strokeWidth="1" strokeDasharray="3,3" />
          <text x="44" y="80" fill={t.text} fontSize="9">A</text>
          <text x="153" y="192" fill={t.text} fontSize="9">F</text>
        </svg>
        <div style={{ fontSize: 10, color: t.textMuted, textAlign: "center", marginTop: 4 }}>
          🟢 On curve = Efficient · 🟡 Inside (E) = Inefficient · 🔴 Outside = Unattainable
        </div>
      </div>
    );
  }
  if (type === "demand") {
    return (
      <div style={{ background: t.bgInner, border: `1px solid ${t.border}`, borderRadius: 12, padding: 10, marginBottom: 16 }}>
        <svg viewBox="0 0 340 200" style={{ width: "100%" }}>
          <line x1="40" y1="10" x2="40" y2="180" stroke={t.text} strokeWidth="2" />
          <line x1="40" y1="180" x2="310" y2="180" stroke={t.text} strokeWidth="2" />
          <polygon points="40,4 36,14 44,14" fill={t.text} />
          <polygon points="316,180 306,176 306,184" fill={t.text} />
          <text x="12" y="100" fill={t.textSub} fontSize="9" textAnchor="middle" transform="rotate(-90,12,100)">Price (P)</text>
          <text x="175" y="196" fill={t.textSub} fontSize="9" textAnchor="middle">Quantity (Q)</text>
          <path d="M 60 20 L 290 170" fill="none" stroke="#2563eb" strokeWidth="2.5" />
          <text x="294" y="168" fill="#2563eb" fontSize="12" fontWeight="bold">D</text>
        </svg>
        <div style={{ fontSize: 10, color: t.textMuted, textAlign: "center", marginTop: 4 }}>
          Demand Curve — slopes downward from left to right
        </div>
      </div>
    );
  }
  if (type === "supply") {
    return (
      <div style={{ background: t.bgInner, border: `1px solid ${t.border}`, borderRadius: 12, padding: 10, marginBottom: 16 }}>
        <svg viewBox="0 0 340 200" style={{ width: "100%" }}>
          <line x1="40" y1="10" x2="40" y2="180" stroke={t.text} strokeWidth="2" />
          <line x1="40" y1="180" x2="310" y2="180" stroke={t.text} strokeWidth="2" />
          <polygon points="40,4 36,14 44,14" fill={t.text} />
          <polygon points="316,180 306,176 306,184" fill={t.text} />
          <text x="12" y="100" fill={t.textSub} fontSize="9" textAnchor="middle" transform="rotate(-90,12,100)">Price (P)</text>
          <text x="175" y="196" fill={t.textSub} fontSize="9" textAnchor="middle">Quantity (Q)</text>
          <path d="M 60 170 L 290 20" fill="none" stroke="#16a34a" strokeWidth="2.5" />
          <text x="294" y="18" fill="#16a34a" fontSize="12" fontWeight="bold">S</text>
        </svg>
        <div style={{ fontSize: 10, color: t.textMuted, textAlign: "center", marginTop: 4 }}>
          Supply Curve — slopes upward from left to right
        </div>
      </div>
    );
  }
  return null;
}

export default function QuestionCard({ q, idx, answers, setAnswers, revealed, t, showResult }) {
  const userAns = answers[idx];
  return (
    <div style={{ background: t.bgCard, border: `1px solid ${revealed ? t.correctBorder : t.border}`, borderRadius: 16, padding: "18px 16px", marginBottom: 14 }}>
      <div style={{ fontSize: 10, color: t.tagColor, letterSpacing: 2, marginBottom: 10 }}>JUPEB {q.year}</div>
      <div style={{ fontSize: 14, lineHeight: 1.7, color: t.text, marginBottom: q.table || q.questionDiagram ? 10 : 16 }}>{q.q}</div>
      {q.table && <QuestionTable table={q.table} t={t} />}
      {q.questionDiagram && <QuestionMiniDiagram type={q.questionDiagram} t={t} />}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map(opt => {
          const l = opt[0], isSel = userAns === l, isRight = l === q.answer;
          let bg = t.optionBg, border = t.border, col = t.optionText, dotColor = "#888";
          if (showResult && isRight) { bg = t.correctBg; border = t.correctBorder; col = t.correctText; dotColor = t.correctBorder; }
          else if (showResult && isSel && !isRight) { bg = t.wrongBg; border = t.wrongBorder; col = t.wrongText; dotColor = t.wrongBorder; }
          else if (!showResult && isSel) { bg = t.selectedBg; border = t.selectedBorder; col = t.selectedText; dotColor = t.selectedBorder; }
          return (
            <button key={opt} onClick={() => { if (!showResult) setAnswers(a => ({ ...a, [idx]: l })); }}
              style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: "12px 14px", textAlign: "left", color: col, fontSize: 13, cursor: showResult ? "default" : "pointer", display: "flex", alignItems: "center", gap: 12 }}>
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
