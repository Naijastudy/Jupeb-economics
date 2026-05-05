import Header from "../components/Header";

export default function ExamSetup({
  t,
  goBack,
  activeSubject,
  data,
  examCount,
  setExamCount,
  examMinutes,
  setExamMinutes,
  startExam,
  goldBtn,
  toggleTheme
}) {
  const wrap = {
    minHeight: "100vh",
    background: t.bg,
    color: t.text,
  };

  const card = {
    background: t.bgCard,
    border: `1px solid ${t.border}`,
    borderRadius: 12,
    padding: "14px 16px",
    marginBottom: 16,
  };

  const totalQCount = Object.values(data.questions).reduce(
    (a, arr) => a + arr.length,
    0
  );

  return (
    <div style={wrap}>
      <Header
        onBack={goBack}
        title="Exam Mode"
        sub={activeSubject?.name}
        t={t}
        onToggleTheme={toggleTheme}
      />

      <div style={{ padding: "16px" }}>
        <div
          style={{
            background: t.exBg,
            border: `1px solid ${t.exBorder}`,
            borderRadius: 12,
            padding: "14px 16px",
            marginBottom: 20,
          }}
        >
          📝 Questions are randomly shuffled. Answer all questions first — results shown only after you submit.
        </div>

        {/* NUMBER OF QUESTIONS */}
        <div style={card}>
          <div style={{ fontWeight: "bold", marginBottom: 10 }}>
            Number of Questions
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {[15, 30, 40, 50].map(n => (
              <button
                key={n}
                onClick={() => setExamCount(n)}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 10,
                  border: `2px solid ${
                    examCount === n ? t.gold : t.border
                  }`,
                  background:
                    examCount === n ? `${t.gold}22` : t.bgInner,
                  color: examCount === n ? t.gold : t.textSub,
                  fontWeight: "bold",
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* TIME */}
        <div style={card}>
          <div style={{ fontWeight: "bold", marginBottom: 10 }}>
            Time Limit
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[15, 30, 45, 60].map(m => (
              <button
                key={m}
                onClick={() => setExamMinutes(m)}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: `2px solid ${
                    examMinutes === m ? t.gold : t.border
                  }`,
                  background:
                    examMinutes === m ? `${t.gold}22` : t.bgInner,
                  color: examMinutes === m ? t.gold : t.textSub,
                }}
              >
                {m >= 60 ? `${m / 60}hr` : `${m}min`}
              </button>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 16 }}>
          {Math.min(examCount, totalQCount)} questions from {totalQCount}
        </div>

        <button onClick={() => startExam(activeSubject)} style={goldBtn}>
          ▶ Start Exam
        </button>
      </div>
    </div>
  );
          }
