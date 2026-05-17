import React, { useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import PropTypes from "prop-types";

const noteColors = ["#0d9488", "#2563eb", "#ea580c", "#7c3aed"];

function RadioDot({ selected, color }) {
  return (
    <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${selected ? color : "#888"}`, background: selected ? color : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
    </div>
  );
}

// ── HELPER: normalize a Firebase question to match local format ──
function normalizeFbQuestion(q) {
  return {
    year: q.year || "2025",
    q: q.q,
    options: q.options,
    answer: q.answer,
    exp: q.exp || "",
    table: q.table || null,
    questionDiagram: q.questionDiagram || null,
  };
}

// ── HELPER: get all questions for a topic (local + Firebase) ──
function getTopicQuestions(data, firebaseQuestions, subjectId, topicId) {
  const local = data.questions[topicId] || [];
  const fromFb = (firebaseQuestions || [])
    .filter(q => q.subject === subjectId && q.topic === topicId)
    .map(normalizeFbQuestion);
  return [...local, ...fromFb];
}

// ─────────────────────────────────────────────────────────────────────────────
// PastQCourses — now counts Firebase questions per course too
// ─────────────────────────────────────────────────────────────────────────────
export function PastQCourses({ t, data, activeSubject, firebaseQuestions, onSelectCourse, onBack }) {
  return (
    <ScreenWrapper>
      <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>Past Questions</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{activeSubject?.name}</div>
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {data.courses.map((c, ci) => {
            // ✅ FIX: count both local AND Firebase questions per course
            const qCount = c.topics.reduce((a, tp) => {
              return a + getTopicQuestions(data, firebaseQuestions, activeSubject?.id, tp.id).length;
            }, 0);
            return (
              <button key={c.id} onClick={() => onSelectCourse(c)}
                style={{ background: noteColors[ci % noteColors.length], border: "none", borderRadius: 16, padding: "20px 14px", cursor: "pointer", textAlign: "left" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{c.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: "bold", color: "#fff" }}>{c.code}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 4, lineHeight: 1.4 }}>{c.title}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>{qCount} questions</div>
              </button>
            );
          })}
        </div>
      </div>
    </ScreenWrapper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PastQTopics — now counts Firebase questions and unlocks Firebase-only topics
// ─────────────────────────────────────────────────────────────────────────────
export function PastQTopics({ t, data, pqCourse, firebaseQuestions, subjectId, onSelectTopic, onBack }) {
  return (
    <ScreenWrapper>
      <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>{pqCourse.title}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{pqCourse.code}</div>
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        {pqCourse.topics.map((tp, i) => {
          // ✅ FIX: count both local AND Firebase questions per topic
          const qCount = getTopicQuestions(data, firebaseQuestions, subjectId, tp.id).length;
          return (
            <button key={tp.id}
              onClick={() => { if (qCount > 0) onSelectTopic(tp); }}
              style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, cursor: qCount > 0 ? "pointer" : "default", width: "100%", textAlign: "left", marginBottom: 10, opacity: qCount > 0 ? 1 : 0.5 }}
              onMouseEnter={e => { if (qCount > 0) e.currentTarget.style.border = `1px solid ${t.borderHover}`; }}
              onMouseLeave={e => e.currentTarget.style.border = `1px solid ${t.border}`}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: `${t.gold}22`, border: `1px solid ${t.gold}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: t.gold, fontWeight: "bold" }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading }}>{tp.label}</div>
                <div style={{ fontSize: 11, color: t.textMuted, marginTop: 3 }}>
                  {qCount > 0 ? `${qCount} questions` : "Coming soon"}
                </div>
              </div>
              <div style={{ color: t.gold, fontSize: 18 }}>›</div>
            </button>
          );
        })}
      </div>
    </ScreenWrapper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PastQView — now merges local + Firebase questions
// ─────────────────────────────────────────────────────────────────────────────
export function PastQView({ t, data, pqTopic, firebaseQuestions, subjectId, onBack, card }) {
  const [revealed, setRevealed] = useState({});
  const [selected, setSelected] = useState({});

  // ✅ FIX: merge local + Firebase questions
  const pqs = getTopicQuestions(data, firebaseQuestions, subjectId, pqTopic.id);

  return (
    <ScreenWrapper>
      <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>{pqTopic.label}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{pqs.length} past questions</div>
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        {pqs.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: t.textMuted }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
            <div style={{ fontSize: 14 }}>No questions yet for this topic.</div>
          </div>
        )}
        {pqs.map((q, qi) => {
          const userAns = selected[qi];
          const isRev = revealed[qi];
          return (
            <div key={qi}>
              <div style={{ background: t.bgCard, border: `1px solid ${isRev ? t.correctBorder : t.border}`, borderRadius: 16, padding: "18px 16px", marginBottom: 14 }}>
                <div style={{ fontSize: 10, color: t.tagColor, letterSpacing: 2, marginBottom: 10 }}>JUPEB {q.year}</div>
                <div style={{ fontSize: 14, lineHeight: 1.7, color: t.text, marginBottom: q.table || q.questionDiagram ? 10 : 16 }}>{q.q}</div>

                {/* TABLE */}
                {q.table && (
                  <div style={{ overflowX: "auto", marginBottom: 16 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                      <thead>
                        <tr>
                          {q.table.headers.map((h, i) => (
                            <th key={i} style={{ background: t.bgHeader, color: t.gold, padding: "8px 10px", border: `1px solid ${t.border}`, textAlign: "center", fontSize: 11, fontWeight: "bold" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {q.table.rows.map((row, ri) => (
                          <tr key={ri} style={{ background: ri % 2 === 0 ? t.bgCard : t.bgInner }}>
                            {row.map((cell, ci) => (
                              <td key={ci} style={{ padding: "8px 10px", border: `1px solid ${t.border}`, textAlign: "center", color: cell === "X" || cell === "Y" ? t.gold : t.text, fontWeight: cell === "X" || cell === "Y" ? "bold" : "normal", fontSize: 12 }}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* DIAGRAM */}
                {q.questionDiagram && (
                  <div style={{ background: t.bgInner, border: `1px solid ${t.border}`, borderRadius: 12, padding: 10, marginBottom: 16 }}>
                    {q.questionDiagram === "ppc" && (
                      <svg viewBox="0 0 340 200" style={{ width: "100%" }}>
                        <line x1="40" y1="10" x2="40" y2="180" stroke={t.text} strokeWidth="2" />
                        <line x1="40" y1="180" x2="310" y2="180" stroke={t.text} strokeWidth="2" />
                        <polygon points="40,4 36,14 44,14" fill={t.text} />
                        <polygon points="316,180 306,176 306,184" fill={t.text} />
                        <text x="12" y="100" fill={t.textSub} fontSize="9" textAnchor="middle" transform="rotate(-90,12,100)">Capital goods</text>
                        <text x="175" y="196" fill={t.textSub} fontSize="9" textAnchor="middle">Consumer goods</text>
                        <path d="M 40 20 Q 180 80 300 170" fill="none" stroke="#16a34a" strokeWidth="2.5" />
                        <text x="44" y="22" fill={t.text} fontSize="10" fontWeight="bold">B</text>
                        <circle cx="160" cy="76" r="5" fill="#16a34a" />
                        <text x="166" y="72" fill={t.text} fontSize="10" fontWeight="bold">C</text>
                        <circle cx="160" cy="120" r="5" fill="#f59e0b" />
                        <text x="166" y="116" fill="#f59e0b" fontSize="10" fontWeight="bold">E</text>
                        <circle cx="240" cy="45" r="5" fill="#dc3545" />
                        <text x="246" y="41" fill="#dc3545" fontSize="9">Unattainable</text>
                        <text x="295" y="174" fill={t.text} fontSize="10" fontWeight="bold">D</text>
                      </svg>
                    )}
                    {q.questionDiagram === "demand" && (
                      <svg viewBox="0 0 340 200" style={{ width: "100%" }}>
                        <line x1="40" y1="10" x2="40" y2="180" stroke={t.text} strokeWidth="2" />
                        <line x1="40" y1="180" x2="310" y2="180" stroke={t.text} strokeWidth="2" />
                        <polygon points="40,4 36,14 44,14" fill={t.text} />
                        <polygon points="316,180 306,176 306,184" fill={t.text} />
                        <text x="12" y="100" fill={t.textSub} fontSize="9" textAnchor="middle" transform="rotate(-90,12,100)">Price (P)</text>
                        <text x="175" y="196" fill={t.textSub} fontSize="9" textAnchor="middle">Quantity (Q)</text>
                        <path d="M 60 20 L 290 170" fill="none" stroke="#2563eb" strokeWidth="2.5" />
                        <text x="294" y="168" fill="#2563eb" fontSize="12" fontWeight="bold">D</text>
                      </svg>
                    )}
                    {q.questionDiagram === "supply" && (
                      <svg viewBox="0 0 340 200" style={{ width: "100%" }}>
                        <line x1="40" y1="10" x2="40" y2="180" stroke={t.text} strokeWidth="2" />
                        <line x1="40" y1="180" x2="310" y2="180" stroke={t.text} strokeWidth="2" />
                        <polygon points="40,4 36,14 44,14" fill={t.text} />
                        <polygon points="316,180 306,176 306,184" fill={t.text} />
                        <text x="12" y="100" fill={t.textSub} fontSize="9" textAnchor="middle" transform="rotate(-90,12,100)">Price (P)</text>
                        <text x="175" y="196" fill={t.textSub} fontSize="9" textAnchor="middle">Quantity (Q)</text>
                        <path d="M 60 170 L 290 20" fill="none" stroke="#16a34a" strokeWidth="2.5" />
                        <text x="294" y="18" fill="#16a34a" fontSize="12" fontWeight="bold">S</text>
                      </svg>
                    )}
                    <div style={{ fontSize: 10, color: t.textMuted, textAlign: "center", marginTop: 4 }}>
                      {q.questionDiagram === "ppc" ? "🟢 On curve = Efficient · 🟡 Inside = Inefficient · 🔴 Outside = Unattainable" :
                       q.questionDiagram === "demand" ? "Demand Curve — slopes downward from left to right" :
                       "Supply Curve — slopes upward from left to right"}
                    </div>
                  </div>
                )}

                {/* OPTIONS */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {q.options.map(opt => {
                    const l = opt[0], isSel = userAns === l, isRight = l === q.answer;
                    let bg = t.optionBg, border = t.border, col = t.optionText, dotColor = "#888";
                    if (isRev && isRight)             { bg = t.correctBg; border = t.correctBorder; col = t.correctText; dotColor = t.correctBorder; }
                    else if (isRev && isSel && !isRight) { bg = t.wrongBg;   border = t.wrongBorder;   col = t.wrongText;   dotColor = t.wrongBorder; }
                    else if (!isRev && isSel)         { bg = t.selectedBg; border = t.selectedBorder; col = t.selectedText; dotColor = t.selectedBorder; }
                    return (
                      <button key={opt}
                        onClick={() => { if (!isRev) setSelected(s => ({ ...s, [qi]: l })); }}
                        style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10, padding: "12px 14px", textAlign: "left", color: col, fontSize: 13, cursor: isRev ? "default" : "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                        <RadioDot selected={isSel || (isRev && isRight)} color={dotColor} />
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* EXPLANATION */}
                {isRev && (
                  <div style={{ marginTop: 14, background: t.expBg, borderRadius: 10, padding: "14px", fontSize: 13, color: t.expText, lineHeight: 1.7, borderLeft: `3px solid ${t.correctBorder}` }}>
                    💡 <strong>Explanation:</strong> {q.exp}
                  </div>
                )}
              </div>

              {/* SHOW ANSWER BUTTON */}
              {!isRev && (
                <button
                  onClick={() => setRevealed(r => ({ ...r, [qi]: true }))}
                  style={{ marginTop: -6, marginBottom: 14, background: "transparent", border: `1px solid ${t.gold}`, borderRadius: 10, color: t.gold, fontSize: 13, padding: "10px 18px", cursor: "pointer", width: "100%", fontWeight: "bold" }}>
                  Show Answer & Explanation
                </button>
              )}
            </div>
          );
        })}
      </div>
    </ScreenWrapper>
  );
}

// ── PropTypes ─────────────────────────────────────────────────────────────────
PastQCourses.propTypes = {
  t: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  activeSubject: PropTypes.shape({ name: PropTypes.string, id: PropTypes.string }),
  firebaseQuestions: PropTypes.array.isRequired,
  onSelectCourse: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

PastQTopics.propTypes = {
  t: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  pqCourse: PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.string,
    topics: PropTypes.array,
  }).isRequired,
  firebaseQuestions: PropTypes.array.isRequired,
  subjectId: PropTypes.string.isRequired,
  onSelectTopic: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

PastQView.propTypes = {
  t: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  pqTopic: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  firebaseQuestions: PropTypes.array.isRequired,
  subjectId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
};
                            
