import React, { useState, useEffect } from "react";

export default function CostCurvesDiagram({ t }) {
  const [step, setStep] = useState(1);
  const [animate, setAnimate] = useState(false);

  const steps = [
    {
      id: 1,
      label: "Step 1 — Fixed & Variable Cost",
      color: "#2563eb",
      desc: "Fixed Cost (FC) does NOT change with output. Variable Cost (VC) increases as output increases.",
    },
    {
      id: 2,
      label: "Step 2 — Total Cost",
      color: "#f59e0b",
      desc: "Total Cost (TC) = Fixed Cost + Variable Cost.",
    },
    {
      id: 3,
      label: "Step 3 — Average Costs",
      color: "#16a34a",
      desc: "AFC falls continuously. AVC is U-shaped. ATC is also U-shaped.",
    },
    {
      id: 4,
      label: "Step 4 — Marginal Cost",
      color: "#dc3545",
      desc: "MC is the cost of producing one extra unit and cuts ATC at its minimum point.",
    },
    {
      id: 5,
      label: "Full Cost Curves",
      color: "#7c3aed",
      desc: "All cost curves together show short-run cost behaviour.",
    },
  ];

  const active = steps.find(s => s.id === step);

  useEffect(() => {
    if (step === 4 || step === 5) {
      setAnimate(false);
      const timer = setTimeout(() => setAnimate(true), 120);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 16, padding: 16, marginTop: 16 }}>

      {/* HEADER */}
      <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading }}>
        Cost Curves (Short Run)
      </div>

      <div style={{ fontSize: 11, color: t.textMuted, marginBottom: 12 }}>
        Fixed Cost, Variable Cost, Total Cost, Average & Marginal Costs
      </div>

      {/* SVG */}
      <svg viewBox="0 0 340 280" style={{ width: "100%", background: t.bgInner, borderRadius: 12, border: `1px solid ${t.border}` }}>

        {/* GRID */}
        {[60, 120, 180, 240].map(y => (
          <line key={y} x1="40" y1={y} x2="310" y2={y} stroke={t.border} strokeWidth="0.5" strokeDasharray="4,4" />
        ))}
        {[80, 140, 200, 260].map(x => (
          <line key={x} x1={x} y1="20" x2={x} y2="260" stroke={t.border} strokeWidth="0.5" strokeDasharray="4,4" />
        ))}

        {/* AXES */}
        <line x1="40" y1="20" x2="40" y2="260" stroke={t.text} strokeWidth="2" />
        <line x1="40" y1="260" x2="310" y2="260" stroke={t.text} strokeWidth="2" />

        <text x="170" y="278" fill={t.textSub} fontSize="10" textAnchor="middle">
          Output (Q)
        </text>

        <text x="12" y="145" fill={t.textSub} fontSize="10" textAnchor="middle" transform="rotate(-90,12,145)">
          Cost (C)
        </text>

        {/* FIXED COST */}
        {(step === 1 || step === 5) && (
          <>
            <line x1="40" y1="70" x2="310" y2="70" stroke="#2563eb" strokeWidth="3" />
            <text x="315" y="70" fill="#2563eb" fontSize="11">FC</text>
          </>
        )}

        {/* VARIABLE COST */}
        {(step === 1 || step === 2 || step === 5) && (
          <>
            <path
              d="M 60 220 Q 140 180 200 140 T 300 80"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
            />
            <text x="300" y="80" fill="#f59e0b" fontSize="11">VC</text>
          </>
        )}

        {/* TOTAL COST */}
        {(step === 2 || step === 5) && (
          <>
            <path
              d="M 60 150 Q 140 120 200 100 T 300 50"
              fill="none"
              stroke="#16a34a"
              strokeWidth="3"
            />
            <text x="300" y="50" fill="#16a34a" fontSize="11">TC</text>
          </>
        )}

        {/* AFC */}
        {(step === 3 || step === 5) && (
          <>
            <path
              d="M 60 240 Q 140 160 300 120"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="2"
            />
            <text x="300" y="120" fill="#7c3aed" fontSize="11">AFC</text>
          </>
        )}

        {/* AVC */}
        {(step === 3 || step === 5) && (
          <>
            <path
              d="M 60 200 Q 140 120 220 160 T 300 220"
              fill="none"
              stroke="#f97316"
              strokeWidth="2.5"
            />
            <text x="300" y="220" fill="#f97316" fontSize="11">AVC</text>
          </>
        )}

        {/* ATC (animated opacity) */}
        {(step === 3 || step === 5) && (
          <>
            <path
              d="M 60 180 Q 140 110 220 140 T 300 190"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2.5"
              opacity={animate ? 1 : 0.2}
              style={{ transition: "opacity 0.8s ease" }}
            />
            <text x="300" y="190" fill="#0ea5e9" fontSize="11">ATC</text>
          </>
        )}

        {/* MC (ANIMATED DRAW-IN) */}
        {(step === 4 || step === 5) && (
          <path
            d="M 60 230 Q 120 100 160 140 T 300 230"
            fill="none"
            stroke="#dc3545"
            strokeWidth="3"
            strokeDasharray="500"
            strokeDashoffset={animate ? "0" : "500"}
            style={{
              transition: "stroke-dashoffset 1.2s ease-in-out"
            }}
          />
        )}

        {/* MC label */}
        {(step === 4 || step === 5) && (
          <text x="300" y="230" fill="#dc3545" fontSize="11">MC</text>
        )}

        {/* EQUILIBRIUM POINT (MC = ATC MIN) */}
        {(step === 4 || step === 5) && (
          <>
            {/* Main point */}
            <circle
              cx="180"
              cy="150"
              r={animate ? 7 : 4}
              fill="#dc3545"
              stroke="#fff"
              strokeWidth="2"
              style={{ transition: "r 0.4s ease" }}
            />

            {/* Pulse effect */}
            {animate && (
              <circle
                cx="180"
                cy="150"
                r="12"
                fill="none"
                stroke="#dc3545"
                strokeWidth="2"
                opacity="0.5"
              >
                <animate attributeName="r" from="10" to="18" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
            )}
          </>
        )}

        {/* MC cuts ATC label */}
        {step === 4 && (
          <text x="170" y="40" fill="#dc3545" fontSize="10" fontWeight="bold" textAnchor="middle">
            MC cuts ATC at minimum point
          </text>
        )}

      </svg>

      {/* BUTTONS */}
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
            {s.id === 5 ? "Full" : `Step ${s.id}`}
          </button>
        ))}
      </div>

      {/* INFO BOX */}
      <div style={{ marginTop: 12, background: t.exBg, border: `1px solid ${active.color}`, borderRadius: 12, padding: "12px 14px" }}>
        <div style={{ fontSize: 13, fontWeight: "bold", color: active.color }}>
          {active.label}
        </div>
        <div style={{ fontSize: 13, color: t.text, marginTop: 6, lineHeight: 1.7 }}>
          {active.desc}
        </div>
      </div>

      {/* KEY FORMULAS */}
      <div style={{ marginTop: 10, background: t.keyBg, border: `1px solid ${t.keyBorder}`, borderRadius: 12, padding: "12px 14px" }}>
        <div style={{ fontSize: 12, fontWeight: "bold", color: t.keyText }}>
          🔑 Key Cost Formulas
        </div>
        <div style={{ fontSize: 13, color: t.keyText, marginTop: 6, lineHeight: 1.7 }}>
          TC = FC + VC<br />
          AFC = FC / Q<br />
          AVC = VC / Q<br />
          ATC = AFC + AVC<br />
          MC = ΔTC / ΔQ
        </div>
      </div>

    </div>
  );
        }
