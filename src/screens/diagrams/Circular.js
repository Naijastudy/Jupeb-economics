import React, { useState, useEffect } from "react";

export default function CircularFlow4Sector({ t }) {
  const [step, setStep] = useState(1);
  const [flow, setFlow] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setFlow(f => !f), 1200);
    return () => clearInterval(id);
  }, []);

  const steps = [
    {
      id: 1,
      label: "Basic Economy",
      color: "#2563eb",
      desc: "Households and firms interact through product and factor markets.",
    },
    {
      id: 2,
      label: "Government Added",
      color: "#f59e0b",
      desc: "Government collects taxes and provides public goods and services.",
    },
    {
      id: 3,
      label: "Foreign Sector Added",
      color: "#16a34a",
      desc: "Exports bring money into economy, imports take money out.",
    },
    {
      id: 4,
      label: "Full Circular Flow",
      color: "#dc3545",
      desc: "All sectors interact with flows of income, spending, taxes, trade.",
    },
  ];

  const active = steps.find(s => s.id === step);

  return (
    <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: 16 }}>

      <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading }}>
        Circular Flow of Income (4-Sector Economy)
      </div>

      <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 12 }}>
        Households, Firms, Government, Foreign Sector
      </div>

      <svg viewBox="0 0 380 300" style={{ width: "100%", background: t.bgInner, borderRadius: 12, border: `1px solid ${t.border}` }}>

        {/* ================= HOUSEHOLDS ================= */}
        <rect x="40" y="120" width="100" height="60" stroke="#2563eb" fill="none" strokeWidth="2" />
        <text x="90" y="145" textAnchor="middle" fill="#2563eb" fontSize="11">Households</text>

        {/* GIVE: Factors */}
        <text x="20" y="110" fill="#2563eb" fontSize="9">Give: Labour, Land, Capital</text>
        <text x="20" y="195" fill="#2563eb" fontSize="9">Receive: Income</text>

        {/* ================= FIRMS ================= */}
        <rect x="240" y="120" width="100" height="60" stroke="#16a34a" fill="none" strokeWidth="2" />
        <text x="290" y="145" textAnchor="middle" fill="#16a34a" fontSize="11">Firms</text>

        <text x="240" y="110" fill="#16a34a" fontSize="9">Give: Goods & Services</text>
        <text x="240" y="195" fill="#16a34a" fontSize="9">Receive: Revenue</text>

        {/* ================= MONEY FLOW ================= */}
        <path
          d="M 140 140 Q 190 80 240 140"
          stroke="#f59e0b"
          strokeWidth="3"
          fill="none"
          opacity={flow ? 1 : 0.4}
        />
        <text x="190" y="75" fill="#f59e0b" fontSize="9" textAnchor="middle">
          Income / Spending →
        </text>

        <path
          d="M 240 160 Q 190 220 140 160"
          stroke="#f59e0b"
          strokeWidth="3"
          fill="none"
          opacity={!flow ? 1 : 0.4}
        />
        <text x="190" y="235" fill="#f59e0b" fontSize="9" textAnchor="middle">
          Goods & Services ←
        </text>

        {/* ================= GOVERNMENT ================= */}
        {step >= 2 && (
          <>
            <rect x="40" y="20" width="90" height="50" stroke="#dc3545" fill="none" strokeWidth="2" />
            <text x="85" y="50" textAnchor="middle" fill="#dc3545" fontSize="10">Government</text>

            <text x="10" y="20" fill="#dc3545" fontSize="9">Give: Public Goods</text>
            <text x="10" y="75" fill="#dc3545" fontSize="9">Receive: Taxes</text>

            {/* Taxes */}
            <path d="M 90 70 Q 110 100 140 140" stroke="#dc3545" strokeWidth="2" fill="none" />
            <text x="105" y="95" fill="#dc3545" fontSize="9">Taxes</text>

            {/* Government spending */}
            <path d="M 140 160 Q 110 90 90 70" stroke="#dc3545" strokeWidth="2" fill="none" />
            <text x="110" y="175" fill="#dc3545" fontSize="9">G Spending</text>
          </>
        )}

        {/* ================= FOREIGN SECTOR ================= */}
        {step >= 3 && (
          <>
            <rect x="240" y="20" width="110" height="50" stroke="#16a34a" fill="none" strokeWidth="2" />
            <text x="295" y="50" textAnchor="middle" fill="#16a34a" fontSize="10">Foreign Sector</text>

            <text x="235" y="20" fill="#16a34a" fontSize="9">Exports (X)</text>
            <text x="235" y="75" fill="#16a34a" fontSize="9">Imports (M)</text>

            {/* Exports */}
            <path d="M 295 70 Q 270 100 240 140" stroke="#16a34a" strokeWidth="2" fill="none" />
            <text x="275" y="95" fill="#16a34a" fontSize="9">Exports</text>

            {/* Imports */}
            <path d="M 240 160 Q 270 210 295 70" stroke="#16a34a" strokeWidth="2" fill="none" />
            <text x="275" y="190" fill="#16a34a" fontSize="9">Imports</text>
          </>
        )}

        {/* ================= FLOW INDICATOR ================= */}
        <circle cx="190" cy="140" r={flow ? 6 : 3} fill="#f59e0b" />

      </svg>

      {/* ================= STEP BUTTONS ================= */}
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
              background: step === s.id ? s.color : t.bgInner,
              color: step === s.id ? "#fff" : t.textSub,
              border: `2px solid ${step === s.id ? s.color : t.border}`
            }}
          >
            Step {s.id}
          </button>
        ))}
      </div>

      {/* INFO */}
      <div style={{ marginTop: 12, background: t.exBg, border: `1px solid ${active.color}`, borderRadius: 12, padding: 12 }}>
        <div style={{ fontSize: 13, fontWeight: "bold", color: active.color }}>
          {active.label}
        </div>
        <div style={{ fontSize: 13, color: t.text, marginTop: 6 }}>
          {active.desc}
        </div>
      </div>

      {/* KEY SUMMARY */}
      <div style={{ marginTop: 10, background: t.keyBg, border: `1px solid ${t.keyBorder}`, borderRadius: 12, padding: 12 }}>
        <div style={{ fontSize: 12, fontWeight: "bold", color: t.keyText }}>
          🔑 Economic Identity
        </div>
        <div style={{ fontSize: 13, color: t.keyText }}>
          Y = C + I + G + (X − M)
        </div>
      </div>

    </div>
  );
          }
