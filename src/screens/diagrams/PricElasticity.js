import React, { useState } from "react";

export default function PriceElasticityDiagram({ t }) {
  const [selected, setSelected] = useState("elastic");

  const types = {
    elastic: {
      label: "Elastic Demand (PED > 1)",
      color: "#2563eb",
      desc: "A small change in price causes a LARGE change in quantity demanded. The curve is relatively FLAT. Examples: luxury goods, holidays, designer clothes.",
      formula: "% change in Qd > % change in Price",
    },
    inelastic: {
      label: "Inelastic Demand (PED < 1)",
      color: "#dc3545",
      desc: "A large change in price causes a SMALL change in quantity demanded. The curve is relatively STEEP. Examples: petrol, salt, medicine, necessities.",
      formula: "% change in Qd < % change in Price",
    },
    unitary: {
      label: "Unitary Elastic (PED = 1)",
      color: "#f59e0b",
      desc: "The percentage change in quantity demanded EQUALS the percentage change in price. Total revenue stays constant when price changes.",
      formula: "% change in Qd = % change in Price",
    },
    perfectly_inelastic: {
      label: "Perfectly Inelastic (PED = 0)",
      color: "#7c3aed",
      desc: "Quantity demanded does NOT change at all regardless of price changes. The curve is a VERTICAL line. Examples: life-saving medicine, insulin.",
      formula: "% change in Qd = 0",
    },
    perfectly_elastic: {
      label: "Perfectly Elastic (PED = ∞)",
      color: "#16a34a",
      desc: "Any rise in price causes quantity demanded to fall to ZERO. The curve is a HORIZONTAL line. Examples: perfect competition — no one buys above market price.",
      formula: "% change in Qd = ∞",
    },
  };

  const active = types[selected];

  // Curve paths for each type
  const getCurvePath = () => {
    switch (selected) {
      case "elastic":
        // Flatter curve
        return "M 60 60 L 290 220";
      case "inelastic":
        // Steeper curve
        return "M 120 40 L 200 240";
      case "unitary":
        // Hyperbola-like curve
        return "M 60 40 Q 160 130 290 240";
      case "perfectly_inelastic":
        // Vertical line
        return "M 175 30 L 175 250";
      case "perfectly_elastic":
        // Horizontal line
        return "M 50 140 L 300 140";
      default:
        return "M 60 60 L 290 220";
    }
  };

  return (
    <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: 16, marginTop: 16 }}>
      <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading, marginBottom: 4 }}>
        Price Elasticity of Demand
      </div>
      <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 12 }}>
        Tap each type to see its curve and explanation
      </div>

      {/* Type selector */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {Object.entries(types).map(([key, val]) => (
          <button key={key} onClick={() => setSelected(key)} style={{
            padding: "10px 14px", borderRadius: 10, fontSize: 12,
            fontWeight: "bold", cursor: "pointer", textAlign: "left",
            background: selected === key ? val.color : t.bgInner,
            color: selected === key ? "#fff" : t.textSub,
            border: `2px solid ${selected === key ? val.color : t.border}`
          }}>
            {val.label}
          </button>
        ))}
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

        {/* Price change indicators for elastic/inelastic */}
        {(selected === "elastic" || selected === "inelastic" || selected === "unitary") && (
          <>
            {/* Price change line */}
            <line x1="40" y1="90" x2="40" y2="170" stroke={active.color} strokeWidth="2" />
            <polygon points="40,86 36,96 44,96" fill={active.color} />
            <polygon points="40,174 36,164 44,164" fill={active.color} />
            <text x="2" y="134" fill={active.color} fontSize="9" textAnchor="middle">ΔP</text>
          </>
        )}

        {/* Demand curve */}
        <path d={getCurvePath()} fill="none" stroke={active.color} strokeWidth="3" strokeLinecap="round" />

        {/* D label */}
        {selected !== "perfectly_inelastic" && selected !== "perfectly_elastic" && (
          <text x="294" y="234" fill={active.color} fontSize="13" fontWeight="bold">D</text>
        )}
        {selected === "perfectly_inelastic" && (
          <text x="180" y="30" fill={active.color} fontSize="13" fontWeight="bold">D</text>
        )}
        {selected === "perfectly_elastic" && (
          <text x="304" y="136" fill={active.color} fontSize="13" fontWeight="bold">D</text>
        )}

        {/* Quantity change indicators */}
        {selected === "elastic" && (
          <>
            {/* Large quantity change */}
            <line x1="100" y1="260" x2="240" y2="260" stroke={active.color} strokeWidth="2" />
            <polygon points="96,260 106,256 106,264" fill={active.color} />
            <polygon points="244,260 234,256 234,264" fill={active.color} />
            <text x="170" y="274" fill={active.color} fontSize="9" textAnchor="middle">Large ΔQ</text>
          </>
        )}
        {selected === "inelastic" && (
          <>
            {/* Small quantity change */}
            <line x1="148" y1="260" x2="180" y2="260" stroke={active.color} strokeWidth="2" />
            <polygon points="144,260 154,256 154,264" fill={active.color} />
            <polygon points="184,260 174,256 174,264" fill={active.color} />
            <text x="164" y="274" fill={active.color} fontSize="9" textAnchor="middle">Small ΔQ</text>
          </>
        )}

        {/* PED value label */}
        <text x="175" y="50" fill={active.color} fontSize="11" fontWeight="bold" textAnchor="middle">
          {selected === "elastic" ? "PED > 1" :
           selected === "inelastic" ? "PED < 1" :
           selected === "unitary" ? "PED = 1" :
           selected === "perfectly_inelastic" ? "PED = 0" : "PED = ∞"}
        </text>

      </svg>

      {/* Formula box */}
      <div style={{ marginTop: 12, background: t.bgInner, border: `2px solid ${active.color}`, borderRadius: 12, padding: "10px 14px", textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: "bold", color: active.color }}>
          📐 {active.formula}
        </div>
      </div>

      {/* Info box */}
      <div style={{ marginTop: 10, background: t.exBg, border: `1px solid ${t.exBorder}`, borderRadius: 12, padding: "12px 14px" }}>
        <div style={{ fontSize: 13, fontWeight: "bold", color: active.color, marginBottom: 8 }}>
          {active.label}
        </div>
        <div style={{ fontSize: 13, color: t.text, lineHeight: 1.8 }}>
          {active.desc}
        </div>
      </div>

      {/* Summary table */}
      <div style={{ marginTop: 14 }}>
        <div style={{ fontSize: 13, fontWeight: "bold", color: t.heading, marginBottom: 10 }}>Quick Reference</div>
        {Object.entries(types).map(([key, val]) => (
          <div key={key} onClick={() => setSelected(key)} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "10px 12px", marginBottom: 6, borderRadius: 10, cursor: "pointer",
            background: selected === key ? `${val.color}22` : t.bgInner,
            border: `1px solid ${selected === key ? val.color : t.border}`
          }}>
            <div style={{ fontSize: 12, color: selected === key ? val.color : t.text, fontWeight: selected === key ? "bold" : "normal" }}>
              {val.label.split("(")[0].trim()}
            </div>
            <div style={{ fontSize: 12, color: val.color, fontWeight: "bold" }}>
              {key === "elastic" ? "PED > 1" :
               key === "inelastic" ? "PED < 1" :
               key === "unitary" ? "PED = 1" :
               key === "perfectly_inelastic" ? "PED = 0" : "PED = ∞"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
