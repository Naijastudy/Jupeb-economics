import React from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import PropTypes from "prop-types";

const ALL_YEARS = [
  "2015", "2016", "2017", "2018", "2019",
  "2020", "2021", "2022", "2023", "2024", "2025", "2026"
];

export default function YearSelect({ t, data, firebaseQuestions, subjectId, onSelectYear, onBack }) {

  // Find which years actually have questions
  const availableYears = new Set();
  Object.values(data.questions).forEach(qs => {
    qs.forEach(q => { if (q.year) availableYears.add(q.year); });
  });
  firebaseQuestions.filter(q => q.subject === subjectId).forEach(q => {
    if (q.year) availableYears.add(q.year);
  });

  return (
   <ScreenWrapper>
    <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija · Exam Mode</div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>Select Year</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Choose a past question year</div>
        </div>
      </div>

      <div style={{ padding: "16px" }}>
        <div style={{ background: t.keyBg, border: `1px solid ${t.keyBorder}`, borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: t.keyText, lineHeight: 1.8 }}>
            🔑 Select a year to practice questions from that specific exam. Only years with available questions can be selected.
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {ALL_YEARS.map(year => {
            const hasQuestions = availableYears.has(year);
            const isLocked = !hasQuestions;
            return (
              <button key={year} onClick={() => { if (hasQuestions) onSelectYear(year); }}
                style={{
                  background: hasQuestions ? t.bgCard : t.bgInner,
                  border: `2px solid ${hasQuestions ? t.gold : t.border}`,
                  borderRadius: 14, padding: "18px 10px",
                  cursor: hasQuestions ? "pointer" : "default",
                  textAlign: "center", opacity: isLocked ? 0.5 : 1,
                  position: "relative"
                }}>
                <div style={{ fontSize: 18, fontWeight: "bold", color: hasQuestions ? t.gold : t.textMuted }}>{year}</div>
                {hasQuestions ? (
                  <div style={{ fontSize: 10, color: t.textSub, marginTop: 4 }}>
                    {[...Object.values(data.questions)].flat().filter(q => q.year === year).length +
                      firebaseQuestions.filter(q => q.subject === subjectId && q.year === year).length} Qs
                  </div>
                ) : (
                  <div style={{ fontSize: 10, color: t.textMuted, marginTop: 4 }}>🔒 Soon</div>
                )}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 20, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ fontSize: 13, color: t.textSub, lineHeight: 1.8 }}>
            ✅ Available: {[...availableYears].join(", ")}<br />
            🔒 Coming soon: years without questions yet
          </div>
        </div>
      </div>
    </ScreenWrapper>
  );
}
YearSelect.propTypes = {
  t: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  firebaseQuestions: PropTypes.array.isRequired,
  subjectId: PropTypes.string.isRequired,
  onSelectYear: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
