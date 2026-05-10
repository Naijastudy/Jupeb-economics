import { useState } from "react";
import PropTypes from "prop-types";

export default function Calculator({ t }) {
  const [input, setInput] = useState("");
  const [scientific, setScientific] = useState(true);
  const [degreeMode, setDegreeMode] = useState(true);

  const add = (val) => setInput((prev) => prev + val);
  const clear = () => setInput("");
  const backspace = () => setInput((prev) => prev.slice(0, -1));

  const calculate = () => {
    try {
      let exp = input
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/√/g, "Math.sqrt")
        .replace(/log/g, "Math.log10")
        .replace(/ln/g, "Math.log");

      if (degreeMode) {
        exp = exp
          .replace(/sin\((.*?)\)/g, "Math.sin(($1)*Math.PI/180)")
          .replace(/cos\((.*?)\)/g, "Math.cos(($1)*Math.PI/180)")
          .replace(/tan\((.*?)\)/g, "Math.tan(($1)*Math.PI/180)");
      } else {
        exp = exp
          .replace(/sin/g, "Math.sin")
          .replace(/cos/g, "Math.cos")
          .replace(/tan/g, "Math.tan");
      }

      const result = Function(`"use strict"; return (${exp})`)();
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  const btn = (label, onClick, bg) => (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        margin: 4,
        padding: 12,
        borderRadius: 10,
        border: "none",
        background: bg || t.bgCard,
        color: t.text,
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      {label}
    </button>
  );

  return (
    <div>
      {/* DISPLAY */}
      <div style={{
        background: t.bg,
        color: t.heading,
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
        textAlign: "right",
        fontSize: 20
      }}>
        {input || "0"}
      </div>

      {/* MODE TOGGLES */}
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        <button
          onClick={() => setScientific(!scientific)}
          style={{
            flex: 1,
            padding: 8,
            border: "none",
            borderRadius: 8,
            background: t.goldBtn,
            color: t.goldBtnText
          }}
        >
          {scientific ? "Basic" : "Scientific"}
        </button>

        <button
          onClick={() => setDegreeMode(!degreeMode)}
          style={{
            flex: 1,
            padding: 8,
            border: "none",
            borderRadius: 8,
            background: degreeMode ? "#16a34a" : "#6b7280",
            color: "#fff"
          }}
        >
          {degreeMode ? "DEG" : "RAD"}
        </button>
      </div>

      {/* SCIENTIFIC */}
      {scientific && (
        <>
          <div style={{ display: "flex" }}>
            {btn("sin(", () => add("sin("))}
            {btn("cos(", () => add("cos("))}
            {btn("tan(", () => add("tan("))}
            {btn("√(", () => add("√("))}
          </div>

          <div style={{ display: "flex" }}>
            {btn("log(", () => add("log("))}
            {btn("ln(", () => add("ln("))}
            {btn("π", () => add("π"))}
            {btn("e", () => add("e"))}
          </div>

          <div style={{ display: "flex" }}>
            {btn("^", () => add("**"))}
            {btn("(", () => add("("))}
            {btn(")", () => add(")"))}
            {btn("⌫", backspace, "#dc3545")}
          </div>
        </>
      )}

      {/* MAIN */}
      {[
        ["7","8","9","/"],
        ["4","5","6","*"],
        ["1","2","3","-"],
        ["C","0","=","+"]
      ].map((row, i) => (
        <div key={i} style={{ display: "flex" }}>
          {row.map((b) =>
            btn(
              b,
              () => {
                if (b === "=") calculate();
                else if (b === "C") clear();
                else add(b);
              }
            )
          )}
        </div>
      ))}
    </div>
  );
        }
Calculator.propTypes = {
  t: PropTypes.object.isRequired,
};
