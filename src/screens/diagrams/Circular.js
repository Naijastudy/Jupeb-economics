import React, { useState, useEffect } from "react";

export default function CircularFlowAdvanced({ t }) {
  const [step, setStep] = useState(1);

  // Simulation controls
  const [tax, setTax] = useState(20);
  const [savings, setSavings] = useState(15);
  const [imports, setImports] = useState(10);

  const [investment, setInvestment] = useState(25);
  const [govSpending, setGovSpending] = useState(30);
  const [exports, setExports] = useState(20);

  const [flow, setFlow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlow(f => !f);
    }, 1200); // creates flowing animation pulse
    return () => clearInterval(interval);
  }, []);

  const leakages = tax + savings + imports;
  const injections = investment + govSpending + exports;

  const steps = [
    {
      id: 1,
      label: "Basic Flow",
      color: "#2563eb",
      desc: "Households and firms interact through goods and factor markets.",
    },
    {
      id: 2,
      label: "Money Flow Animation",
      color: "#f59e0b",
      desc: "Money continuously flows between households and firms.",
    },
    {
      id: 3,
      label: "Leakages & Injections",
      color: "#16a34a",
      desc: "Leakages withdraw money from circular flow. Injections add money into it.",
    },
  ];

  const active = steps.find(s => s.id === step);

  return (
    <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: 16 }}>

      <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading }}>
        Circular Flow of Income (Advanced Simulator)
      </div>

      <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 12 }}>
        With animation, leakage vs injection, and economic balance
      </div>

      {/* ================= SVG DIAGRAM ================= */}
      <svg viewBox="0 0 360 300" style={{ width: "100%", background: t.bgInner, borderRadius: 12, border: `1px solid ${t.border}` }}>

        {/* HOUSEHOLDS */}
        <rect x="40" y="120" width="100" height="60" stroke="#2563eb" fill="none" strokeWidth="2" />
        <text x="90" y="150" textAnchor="middle" fill="#2563eb" fontSize="11">Households</text>

        {/* FIRMS */}
        <rect x="220" y="120" width="100" height="60" stroke="#16a34a" fill="none" strokeWidth="2" />
        <text x="270" y="150" textAnchor="middle" fill="#16a34a" fontSize="11">Firms</text>

        {/* ================= FLOW ANIMATION ================= */}

        {/* Goods flow */}
        <path
          d="M 140 130 Q 180 80 220 130"
          stroke="#2563eb"
          strokeWidth="3"
          fill="none"
          opacity={flow ? 1 : 0.4}
        />
        <text x="180" y="75" fill="#2563eb" fontSize="10" textAnchor="middle">
          Goods & Services →
        </text>

        {/* Factor flow */}
        <path
          d="M 220 170 Q 180 220 140 170"
          stroke="#16a34a"
          strokeWidth="3"
          fill="none"
          opacity={flow ? 1 : 0.4}
        />
        <text x="180" y="235" fill="#16a34a" fontSize="10" textAnchor="middle">
          Factors ←
        </text>

        {/* Money flow */}
        {(step >= 2) && (
          <>
            <path
              d="M 140 150 Q 90 90 220 150"
              stroke="#f59e0b"
              strokeWidth="3"
              fill="none"
              opacity={flow ? 1 : 0.4}
            />
            <path
              d="M 220 150 Q 270 210 140 150"
              stroke="#f59e0b"
              strokeWidth="3"
              fill="none"
              opacity={!flow ? 1 : 0.4}
            />
          </>
        )}

        {/* ================= LEAKAGES ================= */}
        {step === 3 && (
          <>
            <text x="20" y="40" fill="#dc3545" fontSize="10">Leakages</text>

            <text x="20" y="60" fill="#dc3545" fontSize="9">S (Savings): {savings}</text>
            <text x="20" y="75" fill="#dc3545" fontSize="9">T (Tax): {tax}</text>
            <text x="20" y="90" fill="#dc3545" fontSize="9">M (Imports): {imports}</text>
          </>
        )}

        {/* ================= INJECTIONS ================= */}
        {step === 3 && (
          <>
            <text x="250" y="40" fill="#16a34a" fontSize="10">Injections</text>

            <text x="250" y="60" fill="#16a34a" fontSize="9">I (Investment): {investment}</text>
            <text x="250" y="75" fill="#16a34a" fontSize="9">G (Govt): {govSpending}</text>
            <text x="250" y="90" fill="#16a34a" fontSize="9">X (Exports): {exports}</text>
          </>
        )}

        {/* EQUILIBRIUM CONDITION */}
        {step === 3 && (
          <text x="180" y="20" textAnchor="middle" fill={injections >= leakages ? "#16a34a" : "#dc3545"} fontSize="11">
            {injections >= leakages ? "Injection ≥ Leakages (Expansion)" : "Leakages > Injections (Contraction)"}
          </text>
        )}

      </svg>

      {/* ================= CONTROLS ================= */}
      {step === 3 && (
        <div style={{ marginTop: 12, display: "grid", gap: 8 }}>

          <div>
            Savings: {savings}
            <input type="range" min="0" max="50" value={savings} onChange={e => setSavings(+e.target.value)} />
          </div>

          <div>
            Tax: {tax}
            <input type="range" min="0" max="50" value={tax} onChange={e => setTax(+e.target.value)} />
          </div>

          <div>
            Imports: {imports}
            <input type="range" min="0" max="50" value={imports} onChange={e => setImports(+e.target.value)} />
          </div>

          <div>
            Investment: {investment}
            <input type="range" min="0" max="60" value={investment} onChange={e => setInvestment(+e.target.value)} />
          </div>

          <div>
            Government Spending: {govSpending}
            <input type="range" min="0" max="60" value={govSpending} onChange={e => setGovSpending(+e.target.value)} />
          </div>

          <div>
            Exports: {exports}
            <input type="range" min="0" max="60" value={exports} onChange={e => setExports(+e.target.value)} />
          </div>

        </div>
      )}

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

      {/* SUMMARY */}
      {step === 3 && (
        <div style={{ marginTop: 10, background: t.keyBg, border: `1px solid ${t.keyBorder}`, borderRadius: 12, padding: 12 }}>
          <div style={{ fontSize: 12, fontWeight: "bold", color: t.keyText }}>
            🔑 Economic Balance
          </div>
          <div style={{ fontSize: 13, color: t.keyText }}>
            Injections = Leakages for equilibrium (I + G + X = S + T + M)
          </div>
        </div>
      )}

    </div>
  );
    }
