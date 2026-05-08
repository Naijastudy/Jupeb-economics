import React, { useState } from "react";

export default function PPCDiagram({ t }) {
  const [showPoint, setShowPoint] = useState("B");

  const points = {
    A: { x: 40, y: 60, label: "A (Max Capital)", desc: "All resources used for capital goods — no consumer goods produced." },
    B: { x: 160, y: 120, label: "B (Efficient)", desc: "Economy is on the PPC — using all resources efficiently." },
    C: { x: 280, y: 60, label: "C (Max Consumer)", desc: "All resources used for consumer goods — no capital goods produced." },
    D: { x: 160, y: 200, label: "D (Inefficient)", desc: "Point inside PPC — resources are NOT fully or efficiently used." },
    E: { x: 260, y: 40, label: "E (Unattainable)", desc: "Point outside PPC — impossible with current resources and technology." },
  };

  const active = points[showPoint];

  return (
    <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: 16, marginTop: 16 }}>
      <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading, marginBottom: 4 }}>
        Production Possibility Curve (PPC)
      </div>
      <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 16 }}>
        Tap any point to learn about it
      </div>

      {/* SVG Diagram */}
      <svg viewBox="0 0 340 280" style={{ width: "100%", background: t.bgInner, borderRadius: 12, border: `1px solid ${t.border}` }}>

        {/* Grid lines */}
        {[60, 120, 180, 240].map(y => (
          <line key={y} x1="40" y1={y} x2="300" y2={y} stroke={t.border} strokeWidth="0.5" strokeDasharray="4,4" />
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
        <text x="10" y="140" fill={t.textSub} fontSize="10" textAnchor="middle" transform="rotate(-90, 10, 140)">Capital Goods</text>
        <text x="175" y="278" fill={t.textSub} fontSize="10" textAnchor="middle">Consumer Goods</text>

        {/* PPC Curve — quadratic bezier */}
        <path d="M 40 40 Q 180 80 300 240" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />

        {/* Shaded area under curve (attainable region) */}
        <path d="M 40 40 Q 180 80 300 240 L 300 260 L 40 260 Z" fill="#16a34a" fillOpacity="0.08" />

        {/* Point A — on curve top left */}
        <circle cx="40" cy="40" r={showPoint === "A" ? 9 : 6}
          fill={showPoint === "A" ? "#16a34a" : t.bgCard}
          stroke="#16a34a" strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => setShowPoint("A")} />
        <text x="50" y="36" fill={t.text} fontSize="11" fontWeight="bold">A</text>

        {/* Point B — on curve middle */}
        <circle cx="160" cy="118" r={showPoint === "B" ? 9 : 6}
          fill={showPoint === "B" ? "#16a34a" : t.bgCard}
          stroke="#16a34a" strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => setShowPoint("B")} />
        <text x="170" y="114" fill={t.text} fontSize="11" fontWeight="bold">B</text>

        {/* Point C — on curve bottom right */}
        <circle cx="300" cy="240" r={showPoint === "C" ? 9 : 6}
          fill={showPoint === "C" ? "#16a34a" : t.bgCard}
          stroke="#16a34a" strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => setShowPoint("C")} />
        <text x="286" y="236" fill={t.text} fontSize="11" fontWeight="bold">C</text>

        {/* Point D — inside curve (inefficient) */}
        <circle cx="160" cy="180" r={showPoint === "D" ? 9 : 6}
          fill={showPoint === "D" ? "#f59e0b" : t.bgCard}
          stroke="#f59e0b" strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => setShowPoint("D")} />
        <text x="170" y="176" fill="#f59e0b" fontSize="11" fontWeight="bold">D</text>

        {/* Point E — outside curve (unattainable) */}
        <circle cx="240" cy="50" r={showPoint === "E" ? 9 : 6}
          fill={showPoint === "E" ? "#dc3545" : t.bgCard}
          stroke="#dc3545" strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => setShowPoint("E")} />
        <text x="250" y="46" fill="#dc3545" fontSize="11" fontWeight="bold">E</text>

        {/* Labels for regions */}
        <text x="200" y="150" fill="#16a34a" fontSize="9" fillOpacity="0.6">Attainable</text>
        <text x="210" y="80" fill="#dc3545" fontSize="9" fillOpacity="0.8">Unattainable</text>

      </svg>

      {/* Legend */}
      <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#16a34a" }} />
          <span style={{ fontSize: 11, color: t.textSub }}>On PPC (Efficient)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
          <span style={{ fontSize: 11, color: t.textSub }}>Inside (Inefficient)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#dc3545" }} />
          <span style={{ fontSize: 11, color: t.textSub }}>Outside (Unattainable)</span>
        </div>
      </div>

      {/* Active point info */}
      <div style={{ marginTop: 14, background: showPoint === "D" ? "#f59e0b" : showPoint === "E" ? "#dc3545" : t.exBg, border: `1px solid ${showPoint === "D" ? "#f59e0b" : showPoint === "E" ? "#dc3545" : t.exBorder}`, borderRadius: 12, padding: "12px 14px" }}>
        <div style={{ fontSize: 13, fontWeight: "bold", color: "#fff", marginBottom: 6 }}>
          📍 Point {showPoint}
        </div>
        <div style={{ fontSize: 13, color: "#fff", lineHeight: 1.7 }}>{active.desc}</div>
      </div>

      {/* Point selector buttons */}
      <div style={{ display: "flex", gap: 8, marginTop: 12, justifyContent: "center" }}>
        {Object.keys(points).map(p => (
          <button key={p} onClick={() => setShowPoint(p)} style={{
            width: 36, height: 36, borderRadius: "50%",
            border: `2px solid ${showPoint === p ? (p === "D" ? "#f59e0b" : p === "E" ? "#dc3545" : "#16a34a") : t.border}`,
            background: showPoint === p ? (p === "D" ? "#f59e0b" : p === "E" ? "#dc3545" : "#16a34a") : t.bgInner,
            color: showPoint === p ? "#fff" : t.heading,
            fontSize: 13, fontWeight: "bold", cursor: "pointer"
          }}>{p}</button>
        ))}
      </div>
    </div>
  );
}
