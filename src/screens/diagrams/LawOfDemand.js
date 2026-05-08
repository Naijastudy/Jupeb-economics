import React, { useState } from "react";

export default function LawOfDemandDiagram({ t }) {
  const [step, setStep] = useState(1);

  const steps = [
    {
      id: 1,
      label: "Step 1 — High Price",
      color: "#dc3545",
      desc: "At high price P₁, consumers buy LESS — quantity demanded is LOW at Q₁. Price and quantity demanded move in OPPOSITE directions.",
    },
    {
      id: 2,
      label: "Step 2 — Price Falls",
      color: "#f59e0b",
      desc: "Price falls from P₁ to P₂. According to the Law of Demand, quantity demanded INCREASES. We move DOWN along the demand curve.",
    },
    {
      id: 3,
      label: "Step 3 — Low Price",
      color: "#16a34a",
      desc: "At low price P₂, consumers buy MORE — quantity demanded is HIGH at Q₂. This inverse relationship between price and quantity demanded is the LAW OF DEMAND.",
    },
    {
      id: 4,
      label: "Full Diagram",
      color: "#2563eb",
      desc: "The demand curve slopes DOWNWARD from left to right — showing the inverse relationship between price and quantity demanded. This is the Law of Demand: as price rises, quantity demanded falls, and vice versa (ceteris paribus).",
    },
  ];

  const active = steps.find(s => s.id === step);

  return (
    <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: 16, marginTop: 16 }}>
      <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading, marginBottom: 4 }}>
        Law of Demand
      </div>
      <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 12 }}>
        Follow the steps to understand the law of demand
      </div>

      {/* SVG Diagram */}
      <svg viewBox="0 0 340 280" style={{ width: "100%", background: t.bgInner, borderRadius: 12, border: `1px solid ${t.border}` }}>

        {/* Grid lines */}
        {[60, 120, 180, 240].map(y => (
          <line key={y} x1="40" y1={y} x2="310" y2={y} stroke={t.border} strokeWidth="0.5" strokeDasharray="4,4" />
        ))}
        {[80, 140, 200, 260].map(x => (
          <line key={x} x1={x} y1="20" x2={x} y2="260" stroke={t.border} strokeWidth="0.5" strokeDasharray="4,4" />
        ))}

        {/* Axes */}
        <line x1="40" y1="20" x2="40" y2="260" stroke={t.text} strokeWidth="2" />
        <line x1="40" y1="260" x2="310" y2="260" stroke={t.text} strokeWidth="2" />

        {/* Axis arrows */}
        <polygon points="40,14 36,24 44,24" fill={t.text} />
        <polygon points="316,260 306,256 306,264" fill={t.text} />

        {/* Axis labels */}
        <text x="12" y="145" fill={t.textSub} fontSize="10" textAnchor="middle" transform="rotate(-90,12,145)">Price (P)</text>
        <text x="175" y="278" fill={t.textSub} fontSize="10" textAnchor="middle">Quantity Demanded (Q)</text>

        {/* Demand curve — always visible */}
        <path d="M 70 50 L 290 240" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
        <text x="294" y="238" fill="#2563eb" fontSize="13" fontWeight="bold">D</text>

        {/* Step 1 — High price point */}
        {(step === 1 || step === 4) && (
          <>
            <line x1="40" y1="90" x2="123" y2="90" stroke="#dc3545" strokeWidth="1.5" strokeDasharray="5,4" />
            <line x1="123" y1="90" x2="123" y2="260" stroke="#dc3545" strokeWidth="1.5" strokeDasharray="5,4" />
            <circle cx="123" cy="90" r="7" fill="#dc3545" stroke="#fff" strokeWidth="2" />
            <text x="133" y="86" fill="#dc3545" fontSize="11" fontWeight="bold">A</text>
            <text x="8" y="94" fill="#dc3545" fontSize="10" fontWeight="bold">P₁</text>
            <text x="115" y="275" fill="#dc3545" fontSize="10" fontWeight="bold">Q₁</text>
          </>
        )}

        {/* Step 2 — Arrow showing price fall */}
        {step === 2 && (
          <>
            {/* Both points dimmed */}
            <line x1="40" y1="90" x2="123" y2="90" stroke="#dc3545" strokeWidth="1" strokeDasharray="5,4" strokeOpacity="0.4" />
            <line x1="123" y1="90" x2="123" y2="260" stroke="#dc3545" strokeWidth="1" strokeDasharray="5,4" strokeOpacity="0.4" />
            <circle cx="123" cy="90" r="6" fill="#dc3545" stroke="#fff" strokeWidth="2" fillOpacity="0.4" />
            <text x="133" y="86" fill="#dc3545" fontSize="11" fontWeight="bold" opacity="0.4">A</text>
            <text x="8" y="94" fill="#dc3545" fontSize="10" fontWeight="bold" opacity="0.4">P₁</text>

            <line x1="40" y1="190" x2="218" y2="190" stroke="#16a34a" strokeWidth="1" strokeDasharray="5,4" strokeOpacity="0.4" />
            <line x1="218" y1="190" x2="218" y2="260" stroke="#16a34a" strokeWidth="1" strokeDasharray="5,4" strokeOpacity="0.4" />
            <circle cx="218" cy="190" r="6" fill="#16a34a" stroke="#fff" strokeWidth="2" fillOpacity="0.4" />
            <text x="228" y="186" fill="#16a34a" fontSize="11" fontWeight="bold" opacity="0.4">B</text>
            <text x="8" y="194" fill="#16a34a" fontSize="10" fontWeight="bold" opacity="0.4">P₂</text>

            {/* Price fall arrow on Y axis */}
            <line x1="40" y1="95" x2="40" y2="185" stroke="#f59e0b" strokeWidth="3" />
            <polygon points="40,188 36,178 44,178" fill="#f59e0b" />
            <text x="46" y="145" fill="#f59e0b" fontSize="10" fontWeight="bold">Price</text>
            <text x="46" y="158" fill="#f59e0b" fontSize="10" fontWeight="bold">Falls ↓</text>

            {/* Movement arrow along curve */}
            <path d="M 123 90 Q 170 140 218 190" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6,3" />
            <polygon points="221,193 213,186 220,181" fill="#f59e0b" />
            <text x="155" y="125" fill="#f59e0b" fontSize="10" fontWeight="bold">Move</text>
            <text x="150" y="138" fill="#f59e0b" fontSize="10" fontWeight="bold">along D</text>
          </>
        )}

        {/* Step 3 — Low price point */}
        {(step === 3 || step === 4) && (
          <>
            <line x1="40" y1="190" x2="218" y2="190" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5,4" />
            <line x1="218" y1="190" x2="218" y2="260" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5,4" />
            <circle cx="218" cy="190" r="7" fill="#16a34a" stroke="#fff" strokeWidth="2" />
            <text x="228" y="186" fill="#16a34a" fontSize="11" fontWeight="bold">B</text>
            <text x="8" y="194" fill="#16a34a" fontSize="10" fontWeight="bold">P₂</text>
            <text x="210" y="275" fill="#16a34a" fontSize="10" fontWeight="bold">Q₂</text>
          </>
        )}

        {/* Step 4 — Full diagram with arrow and labels */}
        {step === 4 && (
          <>
            {/* Movement arrow */}
            <path d="M 123 90 Q 170 140 218 190" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" />
            <polygon points="221,193 213,186 220,181" fill="#f59e0b" />

            {/* Inverse relationship label */}
            <text x="175" y="40" fill="#2563eb" fontSize="10" fontWeight="bold" textAnchor="middle">P↑ → Qd↓</text>
            <text x="175" y="54" fill="#2563eb" fontSize="10" fontWeight="bold" textAnchor="middle">P↓ → Qd↑</text>
          </>
        )}

      </svg>

      {/* Step buttons */}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        {steps.map(s => (
          <button key={s.id} onClick={() => setStep(s.id)} style={{
            flex: 1, padding: "10px 4px", borderRadius: 10,
            fontSize: 11, fontWeight: "bold", cursor: "pointer",
            background: step === s.id ? s.color : t.bgInner,
            color: step === s.id ? "#fff" : t.textSub,
            border: `2px solid ${step === s.id ? s.color : t.border}`
          }}>
            {s.id === 4 ? "Full" : `Step ${s.id}`}
          </button>
        ))}
      </div>

      {/* Info box */}
      <div style={{ marginTop: 12, background: t.exBg, border: `1px solid ${active.color}`, borderRadius: 12, padding: "12px 14px" }}>
        <div style={{ fontSize: 13, fontWeight: "bold", color: active.color, marginBottom: 8 }}>
          {active.label}
        </div>
        <div style={{ fontSize: 13, color: t.text, lineHeight: 1.8 }}>
          {active.desc}
        </div>
      </div>

      {/* Key point box */}
      <div style={{ marginTop: 10, background: t.keyBg, border: `1px solid ${t.keyBorder}`, borderRadius: 12, padding: "12px 14px" }}>
        <div style={{ fontSize: 12, fontWeight: "bold", color: t.keyText, marginBottom: 6 }}>🔑 Law of Demand Statement</div>
        <div style={{ fontSize: 13, color: t.keyText, lineHeight: 1.8, fontStyle: "italic" }}>
          "Other things being equal (ceteris paribus), as the price of a good rises, the quantity demanded falls, and as the price falls, the quantity demanded rises."
        </div>
      </div>
    </div>
  );
}
