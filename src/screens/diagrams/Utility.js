import React, { useState } from "react";

export default function UtilityCurveDiagram({ t }) {
  const [mode, setMode] = useState("total");

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
        Utility Curves Diagram
      </div>

      <div
        style={{
          fontSize: 11,
          color: t.textMuted,
          marginBottom: 12,
        }}
      >
        Understand Total Utility and Marginal Utility
      </div>

      {/* Toggle Buttons */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[
          {
            id: "total",
            label: "📈 Total Utility",
            color: "#2563eb",
          },
          {
            id: "marginal",
            label: "📉 Marginal Utility",
            color: "#dc3545",
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
              transition: "all 0.3s ease",

              background:
                mode === btn.id ? btn.color : t.bgInner,

              color:
                mode === btn.id ? "#fff" : t.textSub,

              border: `2px solid ${
                mode === btn.id ? btn.color : t.border
              }`,

              transform:
                mode === btn.id
                  ? "scale(1.03)"
                  : "scale(1)",
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* SVG GRAPH */}
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

        {/* Axis Arrows */}
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
          Utility
        </text>

        <text
          x="175"
          y="278"
          fill={t.textSub}
          fontSize="10"
          textAnchor="middle"
        >
          Units Consumed
        </text>

        {/* TOTAL UTILITY */}
        {mode === "total" && (
          <>
            {/* TU Curve */}
            <path
              d="M 50 240 Q 120 120 190 70 Q 240 45 290 55"
              fill="none"
              stroke="#2563eb"
              strokeWidth="4"
              strokeLinecap="round"
              style={{
                transition: "all 0.4s ease",
              }}
            />

            {/* Maximum Point */}
            <circle
              cx="255"
              cy="52"
              r="7"
              fill="#f59e0b"
              stroke="#fff"
              strokeWidth="2"
              filter="drop-shadow(0 0 6px rgba(245,158,11,0.8))"
            />

            <text
              x="264"
              y="48"
              fill="#f59e0b"
              fontSize="11"
              fontWeight="bold"
            >
              Maximum TU
            </text>

            {/* Curve Label */}
            <text
              x="286"
              y="68"
              fill="#2563eb"
              fontSize="12"
              fontWeight="bold"
            >
              TU
            </text>

            {/* Diminishing section */}
            <path
              d="M 190 70 Q 230 45 290 55"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="6,4"
            />

            <text
              x="205"
              y="92"
              fill="#f59e0b"
              fontSize="10"
              fontWeight="bold"
            >
              Diminishing Satisfaction
            </text>
          </>
        )}

        {/* MARGINAL UTILITY */}
        {mode === "marginal" && (
          <>
            {/* MU Curve */}
            <path
              d="M 55 40 Q 120 80 170 130 Q 220 185 290 235"
              fill="none"
              stroke="#dc3545"
              strokeWidth="4"
              strokeLinecap="round"
              style={{
                transition: "all 0.4s ease",
              }}
            />

            {/* Zero utility line */}
            <line
              x1="40"
              y1="210"
              x2="310"
              y2="210"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeDasharray="5,4"
            />

            <text
              x="10"
              y="214"
              fill="#f59e0b"
              fontSize="10"
              fontWeight="bold"
            >
              0
            </text>

            {/* MU Label */}
            <text
              x="286"
              y="238"
              fill="#dc3545"
              fontSize="12"
              fontWeight="bold"
            >
              MU
            </text>

            {/* Falling utility arrow */}
            <path
              d="M 120 90 Q 170 120 230 180"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="6,4"
            />

            <text
              x="145"
              y="105"
              fill="#f59e0b"
              fontSize="10"
              fontWeight="bold"
            >
              Diminishing MU
            </text>
          </>
        )}
      </svg>

      {/* INFO BOX */}
      <div
        style={{
          marginTop: 14,

          background:
            mode === "total"
              ? "rgba(37,99,235,0.12)"
              : "rgba(220,53,69,0.12)",

          border: `1px solid ${
            mode === "total"
              ? "rgba(37,99,235,0.4)"
              : "rgba(220,53,69,0.4)"
          }`,

          borderRadius: 12,
          padding: "12px 14px",

          backdropFilter: "blur(4px)",
        }}
      >
        {mode === "total" ? (
          <>
            <div
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: "#60a5fa",
                marginBottom: 8,
              }}
            >
              📈 Total Utility (TU)
            </div>

            <div
              style={{
                fontSize: 13,
                color: t.text,
                lineHeight: 1.8,
              }}
            >
              Total Utility is the total satisfaction a consumer
              gets from consuming goods and services.
              {"\n\n"}
              TU increases at first, but eventually increases at
              a decreasing rate due to diminishing satisfaction.
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: "#f87171",
                marginBottom: 8,
              }}
            >
              📉 Marginal Utility (MU)
            </div>

            <div
              style={{
                fontSize: 13,
                color: t.text,
                lineHeight: 1.8,
              }}
            >
              Marginal Utility is the additional satisfaction
              gained from consuming one more unit of a good.
              {"\n\n"}
              According to the Law of Diminishing Marginal Utility,
              MU falls as more units are consumed.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
