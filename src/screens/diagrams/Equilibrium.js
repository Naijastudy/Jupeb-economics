import React, { useState } from "react";

export default function EquilibriumDiagram({ t }) {
  const [mode, setMode] = useState("equilibrium");

  return (
    <div
      style={{
        background: t.bgCard,
        border: `1px solid ${t.border}`,
        borderRadius: 16,
        padding: 16,
        marginTop: 16,
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: 14,
          fontWeight: "bold",
          color: t.heading,
          marginBottom: 4,
        }}
      >
        Market Equilibrium Diagram
      </div>

      <div
        style={{
          fontSize: 11,
          color: t.textMuted,
          marginBottom: 12,
        }}
      >
        Understand equilibrium, shortage, and surplus
      </div>

      {/* Mode buttons */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[
          {
            id: "equilibrium",
            label: "⚖ Equilibrium",
            color: "#2563eb",
          },
          {
            id: "shortage",
            label: "📉 Shortage",
            color: "#dc3545",
          },
          {
            id: "surplus",
            label: "📈 Surplus",
            color: "#16a34a",
          },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setMode(btn.id)}
            style={{
              flex: 1,
              padding: "10px 8px",
              borderRadius: 10,
              fontSize: 12,
              fontWeight: "bold",
              cursor: "pointer",
              background: mode === btn.id ? btn.color : t.bgInner,
              color: mode === btn.id ? "#fff" : t.textSub,
              border: `2px solid ${
                mode === btn.id ? btn.color : t.border
              }`,
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* SVG */}
      <svg
        viewBox="0 0 340 280"
        style={{
          width: "100%",
          background: t.bgInner,
          borderRadius: 12,
          border: `1px solid ${t.border}`,
        }}
      >
        {/* Grid */}
        {[60, 120, 180, 240].map((y) => (
          <line
            key={y}
            x1="40"
            y1={y}
            x2="310"
            y2={y}
            stroke={t.border}
            strokeWidth="0.5"
            strokeDasharray="4,4"
          />
        ))}

        {[80, 140, 200, 260].map((x) => (
          <line
            key={x}
            x1={x}
            y1="20"
            x2={x}
            y2="260"
            stroke={t.border}
            strokeWidth="0.5"
            strokeDasharray="4,4"
          />
        ))}

        {/* Axes */}
        <line
          x1="40"
          y1="20"
          x2="40"
          y2="260"
          stroke={t.text}
          strokeWidth="2"
        />

        <line
          x1="40"
          y1="260"
          x2="310"
          y2="260"
          stroke={t.text}
          strokeWidth="2"
        />

        {/* Axis arrows */}
        <polygon points="40,14 36,24 44,24" fill={t.text} />
        <polygon points="316,260 306,256 306,264" fill={t.text} />

        {/* Labels */}
        <text
          x="12"
          y="145"
          fill={t.textSub}
          fontSize="10"
          textAnchor="middle"
          transform="rotate(-90,12,145)"
        >
          Price (P)
        </text>

        <text
          x="175"
          y="278"
          fill={t.textSub}
          fontSize="10"
          textAnchor="middle"
        >
          Quantity (Q)
        </text>

        {/* Demand Curve */}
        <path
          d="M 60 40 L 290 240"
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <text
          x="292"
          y="238"
          fill="#2563eb"
          fontSize="12"
          fontWeight="bold"
        >
          D
        </text>

        {/* Supply Curve */}
        <path
          d="M 60 240 L 290 40"
          fill="none"
          stroke="#dc3545"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <text
          x="292"
          y="42"
          fill="#dc3545"
          fontSize="12"
          fontWeight="bold"
        >
          S
        </text>

        {/* Equilibrium Point */}
        <circle
          cx="175"
          cy="140"
          r="7"
          fill="#f59e0b"
          stroke="#fff"
          strokeWidth="2"
        />

        <text
          x="184"
          y="136"
          fill="#f59e0b"
          fontSize="11"
          fontWeight="bold"
        >
          E
        </text>

        {/* Equilibrium lines */}
        <line
          x1="40"
          y1="140"
          x2="175"
          y2="140"
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeDasharray="5,4"
        />

        <line
          x1="175"
          y1="140"
          x2="175"
          y2="260"
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeDasharray="5,4"
        />

        <text
          x="10"
          y="144"
          fill="#f59e0b"
          fontSize="10"
          fontWeight="bold"
        >
          Pₑ
        </text>

        <text
          x="168"
          y="275"
          fill="#f59e0b"
          fontSize="10"
          fontWeight="bold"
        >
          Qₑ
        </text>

        {/* SHORTAGE */}
        {mode === "shortage" && (
          <>
            {/* Price below equilibrium */}
            <line
              x1="40"
              y1="190"
              x2="260"
              y2="190"
              stroke="#dc3545"
              strokeWidth="2"
              strokeDasharray="6,4"
            />

            {/* Quantity supplied */}
            <line
              x1="120"
              y1="190"
              x2="120"
              y2="260"
              stroke="#dc3545"
              strokeWidth="1.5"
              strokeDasharray="5,4"
            />

            {/* Quantity demanded */}
            <line
              x1="235"
              y1="190"
              x2="235"
              y2="260"
              stroke="#2563eb"
              strokeWidth="1.5"
              strokeDasharray="5,4"
            />

            {/* Arrow */}
            <path
              d="M 125 175 L 230 175"
              fill="none"
              stroke="#dc3545"
              strokeWidth="2"
            />

            <polygon
              points="234,175 226,171 226,179"
              fill="#dc3545"
            />

            <text
              x="150"
              y="168"
              fill="#dc3545"
              fontSize="10"
              fontWeight="bold"
            >
              Shortage
            </text>
          </>
        )}

        {/* SURPLUS */}
        {mode === "surplus" && (
          <>
            {/* Price above equilibrium */}
            <line
              x1="40"
              y1="90"
              x2="260"
              y2="90"
              stroke="#16a34a"
              strokeWidth="2"
              strokeDasharray="6,4"
            />

            {/* Quantity demanded */}
            <line
              x1="120"
              y1="90"
              x2="120"
              y2="260"
              stroke="#2563eb"
              strokeWidth="1.5"
              strokeDasharray="5,4"
            />

            {/* Quantity supplied */}
            <line
              x1="235"
              y1="90"
              x2="235"
              y2="260"
              stroke="#16a34a"
              strokeWidth="1.5"
              strokeDasharray="5,4"
            />

            {/* Arrow */}
            <path
              d="M 125 75 L 230 75"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2"
            />

            <polygon
              points="234,75 226,71 226,79"
              fill="#16a34a"
            />

            <text
              x="160"
              y="68"
              fill="#16a34a"
              fontSize="10"
              fontWeight="bold"
            >
              Surplus
            </text>
          </>
        )}
      </svg>

      {/* Info Box */}
     <div
  style={{
    marginTop: 14,
    background:
      mode === "equilibrium"
        ? t.exBg
        : mode === "shortage"
        ? t.mode === "dark"
          ? "rgba(220,53,69,0.18)"
          : "#fff4f4"
        : t.mode === "dark"
        ? "rgba(22,163,74,0.18)"
        : "#f0fdf4",

    border: `1px solid ${
      mode === "equilibrium"
        ? t.exBorder
        : mode === "shortage"
        ? t.mode === "dark"
          ? "rgba(220,53,69,0.45)"
          : "#f5c2c7"
        : t.mode === "dark"
        ? "rgba(22,163,74,0.45)"
        : "#bbf7d0"
    }`,

    borderRadius: 12,
    padding: "12px 14px",
  }}
>
        {mode === "equilibrium" && (
          <>
            <div
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: t.correctBorder,
                marginBottom: 8,
              }}
            >
              ⚖ Market Equilibrium
            </div>

            <div
              style={{
                fontSize: 13,
                color: t.text,
                lineHeight: 1.8,
              }}
            >
              Equilibrium occurs where the <strong>demand curve</strong>{" "}
              intersects the <strong>supply curve</strong>.{"\n\n"}
              At equilibrium:
              {"\n"}• Quantity demanded = Quantity supplied
              {"\n"}• There is no shortage or surplus
              {"\n"}• The market is stable
            </div>
          </>
        )}

        {mode === "shortage" && (
          <>
            <div
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: "#dc3545",
                marginBottom: 8,
              }}
            >
              📉 Shortage (Excess Demand)
            </div>

            <div
              style={{
                fontSize: 13,
                color: t.text,
                lineHeight: 1.8,
              }}
            >
              A shortage occurs when the price is{" "}
              <strong>below equilibrium price</strong>.{"\n\n"}
              Quantity demanded becomes greater than quantity supplied. Buyers
              compete for limited goods, causing prices to rise toward
              equilibrium.
            </div>
          </>
        )}

        {mode === "surplus" && (
          <>
            <div
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: "#16a34a",
                marginBottom: 8,
              }}
            >
              📈 Surplus (Excess Supply)
            </div>

            <div
              style={{
                fontSize: 13,
                color: t.text,
                lineHeight: 1.8,
              }}
            >
              A surplus occurs when the price is{" "}
              <strong>above equilibrium price</strong>.{"\n\n"}
              Quantity supplied becomes greater than quantity demanded. Sellers
              reduce prices to clear excess stock and move back toward
              equilibrium.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
