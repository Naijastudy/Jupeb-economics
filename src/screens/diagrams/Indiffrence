import React, { useState } from "react";

export default function IndifferenceCurveDiagram({ t }) {
  const [step, setStep] = useState(1);

  const steps = [
    {
      id: 1,
      label: "Step 1 — Indifference Curves",
      color: "#2563eb",
      desc: "Indifference curves show combinations of two goods that give the consumer the SAME level of satisfaction (utility). Higher curves = higher satisfaction.",
    },
    {
      id: 2,
      label: "Step 2 — Budget Line",
      color: "#f59e0b",
      desc: "The budget line shows all combinations of two goods that a consumer can afford based on income and prices.",
    },
    {
      id: 3,
      label: "Step 3 — Equilibrium",
      color: "#16a34a",
      desc: "Consumer equilibrium occurs at the POINT OF TANGENCY between the highest possible indifference curve and the budget line.",
    },
    {
      id: 4,
      label: "Full Diagram",
      color: "#dc3545",
      desc: "At equilibrium, the slope of the indifference curve equals the slope of the budget line (MRS = Px/Py). This is the utility-maximizing point.",
    },
  ];

  const active = steps.find(s => s.id === step);

  return (
    <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: 16, marginTop: 16 }}>
      
      <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading }}>
        Indifference Curve Analysis
      </div>

      <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 12 }}>
        Understand consumer preference and equilibrium step by step
      </div>

      {/* SVG DIAGRAM */}
      <svg viewBox="0 0 340 280" style={{ width: "100%", background: t.bgInner, borderRadius: 12, border: `1px solid ${t.border}` }}>

        {/* Grid */}
        {[60, 120, 180, 240].map(y => (
          <line key={y} x1="40" y1={y} x2="310" y2={y} stroke={t.border} strokeWidth="0.5" strokeDasharray="4,4" />
        ))}
        {[80, 140, 200, 260].map(x => (
          <line key={x} x1={x} y1="20" x2={x} y2="260" stroke={t.border} strokeWidth="0.5" strokeDasharray="4,4" />
        ))}

        {/* Axes */}
        <line x1="40" y1="20" x2="40" y2="260" stroke={t.text} strokeWidth="2" />
        <line x1="40" y1="260" x2="310" y2="260" stroke={t.text} strokeWidth="2" />

        {/* Labels */}
        <text x="12" y="145" fill={t.textSub} fontSize="10" textAnchor="middle" transform="rotate(-90,12,145)">
          Good Y
        </text>
        <text x="175" y="278" fill={t.textSub} fontSize="10" textAnchor="middle">
          Good X
        </text>

        {/* Indifference Curves */}
        {(step === 1 || step === 4) && (
          <>
            <path d="M 70 220 Q 150 160 250 120" fill="none" stroke="#2563eb" strokeWidth="3" />
            <path d="M 70 180 Q 150 120 250 80" fill="none" stroke="#93c5fd" strokeWidth="3" />
            <text x="255" y="118" fill="#2563eb" fontSize="11">IC2</text>
            <text x="255" y="78" fill="#93c5fd" fontSize="11">IC3</text>
          </>
        )}

        {/* Budget line */}
        {(step === 2 || step === 4) && (
          <>
            <line x1="60" y1="80" x2="290" y2="240" stroke="#f59e0b" strokeWidth="3" />
            <text x="295" y="240" fill="#f59e0b" fontSize="11">BL</text>
          </>
        )}

        {/* Equilibrium point */}
        {(step === 3 || step === 4) && (
          <>
            {/* IC */}
            <path d="M 70 220 Q 150 160 250 120" fill="none" stroke="#2563eb" strokeWidth="2" />
            {/* Budget line */}
            <line x1="60" y1="80" x2="290" y2="240" stroke="#f59e0b" strokeWidth="2" />

            {/* Tangency point */}
            <circle cx="175" cy="150" r="7" fill="#16a34a" stroke="#fff" strokeWidth="2" />
            <text x="185" y="146" fill="#16a34a" fontSize="11" fontWeight="bold">E</text>

            {/* Guides */}
            <line x1="40" y1="150" x2="175" y2="150" stroke="#16a34a" strokeDasharray="4,4" />
            <line x1="175" y1="150" x2="175" y2="260" stroke="#16a34a" strokeDasharray="4,4" />
          </>
        )}

        {/* Full diagram label */}
        {step === 4 && (
          <text x="170" y="40" fill="#16a34a" fontSize="10" fontWeight="bold" textAnchor="middle">
            Utility Maximization at Tangency
          </text>
        )}

      </svg>

      {/* Step Buttons */}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        {steps.map(s => (
          <button
            key={s.id}
            onClick={() => setStep(s.id)}
            style={{
              flex: 1,
              padding: "10px 4px",
              borderRadius: 10,
              fontSize: 11,
              fontWeight: "bold",
              cursor: "pointer",
              background: step === s.id ? s.color : t.bgInner,
              color: step === s.id ? "#fff" : t.textSub,
              border: `2px solid ${step === s.id ? s.color : t.border}`
            }}
          >
            {s.id === 4 ? "Full" : `Step ${s.id}`}
          </button>
        ))}
      </div>

      {/* Info Box */}
      <div style={{ marginTop: 12, background: t.exBg, border: `1px solid ${active.color}`, borderRadius: 12, padding: "12px 14px" }}>
        <div style={{ fontSize: 13, fontWeight: "bold", color: active.color, marginBottom: 8 }}>
          {active.label}
        </div>
        <div style={{ fontSize: 13, color: t.text, lineHeight: 1.8 }}>
          {active.desc}
        </div>
      </div>

      {/* Key Concept */}
      <div style={{ marginTop: 10, background: t.keyBg, border: `1px solid ${t.keyBorder}`, borderRadius: 12, padding: "12px 14px" }}>
        <div style={{ fontSize: 12, fontWeight: "bold", color: t.keyText, marginBottom: 6 }}>
          🔑 Key Concept
        </div>
        <div style={{ fontSize: 13, color: t.keyText, lineHeight: 1.8, fontStyle: "italic" }}>
          Consumer equilibrium occurs where MRS (Marginal Rate of Substitution) = Price ratio (Px/Py).
        </div>
      </div>

    </div>
  );
}
