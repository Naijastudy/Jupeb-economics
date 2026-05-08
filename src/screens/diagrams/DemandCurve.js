import React, { useState } from "react";

export default function DemandCurveDiagram({ t }) {
  const [mode, setMode] = useState("movement");
  const [showPrice, setShowPrice] = useState("high");

  return (
    <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: 16, marginTop: 16 }}>
      <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading, marginBottom: 4 }}>
        Demand Curve Diagram
      </div>
      <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 12 }}>
        Switch between movement along curve and shift of curve
      </div>

      {/* Mode toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setMode("movement")} style={{
          flex: 1, padding: "10px 8px", borderRadius: 10, fontSize: 12, fontWeight: "bold", cursor: "pointer",
          background: mode === "movement" ? "#2563eb" : t.bgInner,
          color: mode === "movement" ? "#fff" : t.textSub,
          border: `2px solid ${mode === "movement" ? "#2563eb" : t.border}`
        }}>
          📍 Movement Along Curve
        </button>
        <button onClick={() => setMode("shift")} style={{
          flex: 1, padding: "10px 8px", borderRadius: 10, fontSize: 12, fontWeight: "bold", cursor: "pointer",
          background: mode === "shift" ? "#16a34a" : t.bgInner,
          color: mode === "shift" ? "#fff" : t.textSub,
          border: `2px solid ${mode === "shift" ? "#16a34a" : t.border}`
        }}>
          ↔ Shift of Curve
        </button>
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

        {mode === "movement" ? (
          <>
            {/* Original demand curve D */}
            <path d="M 60 40 L 290 240" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
            <text x="294" y="238" fill="#2563eb" fontSize="12" fontWeight="bold">D</text>

            {/* High price point */}
            {showPrice === "high" && (
              <>
                {/* Dotted lines from high price point */}
                <line x1="40" y1="100" x2="138" y2="100" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5,4" />
                <line x1="138" y1="100" x2="138" y2="260" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5,4" />
                {/* Point on curve */}
                <circle cx="138" cy="100" r="7" fill="#2563eb" stroke="#fff" strokeWidth="2" />
                <text x="148" y="96" fill="#2563eb" fontSize="11" fontWeight="bold">A</text>
                {/* Price label */}
                <text x="10" y="104" fill="#2563eb" fontSize="10" fontWeight="bold">P₁</text>
                {/* Quantity label */}
                <text x="130" y="275" fill="#2563eb" fontSize="10" fontWeight="bold">Q₁</text>
              </>
            )}

            {/* Low price point */}
            {showPrice === "low" && (
              <>
                {/* Dotted lines from low price point */}
                <line x1="40" y1="180" x2="218" y2="180" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5,4" />
                <line x1="218" y1="180" x2="218" y2="260" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5,4" />
                {/* Point on curve */}
                <circle cx="218" cy="180" r="7" fill="#16a34a" stroke="#fff" strokeWidth="2" />
                <text x="228" y="176" fill="#16a34a" fontSize="11" fontWeight="bold">B</text>
                {/* Price label */}
                <text x="10" y="184" fill="#16a34a" fontSize="10" fontWeight="bold">P₂</text>
                {/* Quantity label */}
                <text x="210" y="275" fill="#16a34a" fontSize="10" fontWeight="bold">Q₂</text>
              </>
            )}

            {/* Both points */}
            {showPrice === "both" && (
              <>
                {/* High price */}
                <line x1="40" y1="100" x2="138" y2="100" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5,4" />
                <line x1="138" y1="100" x2="138" y2="260" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5,4" />
                <circle cx="138" cy="100" r="7" fill="#2563eb" stroke="#fff" strokeWidth="2" />
                <text x="148" y="96" fill="#2563eb" fontSize="11" fontWeight="bold">A</text>
                <text x="10" y="104" fill="#2563eb" fontSize="10" fontWeight="bold">P₁</text>
                <text x="130" y="275" fill="#2563eb" fontSize="10" fontWeight="bold">Q₁</text>

                {/* Low price */}
                <line x1="40" y1="180" x2="218" y2="180" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5,4" />
                <line x1="218" y1="180" x2="218" y2="260" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5,4" />
                <circle cx="218" cy="180" r="7" fill="#16a34a" stroke="#fff" strokeWidth="2" />
                <text x="228" y="176" fill="#16a34a" fontSize="11" fontWeight="bold">B</text>
                <text x="10" y="184" fill="#16a34a" fontSize="10" fontWeight="bold">P₂</text>
                <text x="210" y="275" fill="#16a34a" fontSize="10" fontWeight="bold">Q₂</text>

                {/* Arrow showing movement */}
                <path d="M 138 100 Q 180 130 218 180" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3" markerEnd="url(#arrow)" />
                <text x="185" y="130" fill="#f59e0b" fontSize="10" fontWeight="bold">Movement</text>
              </>
            )}
          </>
        ) : (
          <>
            {/* Original demand curve D1 */}
            <path d="M 60 40 L 290 240" fill="none" stroke="#888" strokeWidth="2" strokeDasharray="6,3" strokeLinecap="round" />
            <text x="294" y="238" fill="#888" fontSize="12" fontWeight="bold">D₁</text>

            {/* Increased demand D2 — shifted right */}
            <path d="M 110 40 L 310 210" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
            <text x="310" y="208" fill="#16a34a" fontSize="12" fontWeight="bold">D₂</text>

            {/* Decreased demand D0 — shifted left */}
            <path d="M 40 60 L 210 240" fill="none" stroke="#dc3545" strokeWidth="3" strokeLinecap="round" />
            <text x="212" y="240" fill="#dc3545" fontSize="12" fontWeight="bold">D₀</text>

            {/* Right shift arrow */}
            <path d="M 175 140 L 215 140" fill="none" stroke="#16a34a" strokeWidth="2" />
            <polygon points="218,140 210,136 210,144" fill="#16a34a" />
            <text x="220" y="136" fill="#16a34a" fontSize="9">Increase</text>

            {/* Left shift arrow */}
            <path d="M 155 160 L 115 160" fill="none" stroke="#dc3545" strokeWidth="2" />
            <polygon points="112,160 120,156 120,164" fill="#dc3545" />
            <text x="80" y="156" fill="#dc3545" fontSize="9">Decrease</text>
          </>
        )}
      </svg>

      {/* Movement controls */}
      {mode === "movement" && (
        <div style={{ display: "flex", gap: 8, marginTop: 12, justifyContent: "center" }}>
          {[
            { id: "high", label: "High Price (P₁)", color: "#2563eb" },
            { id: "low", label: "Low Price (P₂)", color: "#16a34a" },
            { id: "both", label: "Show Both", color: "#f59e0b" },
          ].map(btn => (
            <button key={btn.id} onClick={() => setShowPrice(btn.id)} style={{
              flex: 1, padding: "8px 4px", borderRadius: 10, fontSize: 11, fontWeight: "bold", cursor: "pointer",
              background: showPrice === btn.id ? btn.color : t.bgInner,
              color: showPrice === btn.id ? "#fff" : t.textSub,
              border: `2px solid ${showPrice === btn.id ? btn.color : t.border}`
            }}>{btn.label}</button>
          ))}
        </div>
      )}

      {/* Info box */}
      <div style={{ marginTop: 14, background: mode === "movement" ? t.exBg : t.keyBg, border: `1px solid ${mode === "movement" ? t.exBorder : t.keyBorder}`, borderRadius: 12, padding: "12px 14px" }}>
        {mode === "movement" ? (
          <>
            <div style={{ fontSize: 13, fontWeight: "bold", color: t.correctBorder, marginBottom: 8 }}>
              📍 Change in Quantity Demanded
            </div>
            <div style={{ fontSize: 13, color: t.text, lineHeight: 1.8 }}>
              Caused by a <strong>change in PRICE only</strong>. The demand curve stays in the same position — the point just moves UP or DOWN along the same curve.{"\n\n"}
              When price falls from P₁ to P₂ → quantity demanded rises from Q₁ to Q₂ (movement from A to B).
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 13, fontWeight: "bold", color: t.keyText, marginBottom: 8 }}>
              ↔ Change in Demand
            </div>
            <div style={{ fontSize: 13, color: t.text, lineHeight: 1.8 }}>
              Caused by factors <strong>OTHER than price</strong> — income, tastes, prices of related goods, expectations, population.{"\n\n"}
              <span style={{ color: "#16a34a", fontWeight: "bold" }}>D₂ (rightward shift)</span> = Increase in demand{"\n"}
              <span style={{ color: "#dc3545", fontWeight: "bold" }}>D₀ (leftward shift)</span> = Decrease in demand
            </div>
          </>
        )}
      </div>
    </div>
  );
        }
