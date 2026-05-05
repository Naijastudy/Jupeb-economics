import Header from "../components/Header";

export default function ExamQuiz(props) {
  const {
    t,
    goTo,
    activeSubject,
    examQs,
    examIdx,
    setExamIdx,
    examAnswers,
    setExamAnswers,
    examDone,
    examTime,
    formatTime,
    showCalc,
    setShowCalc,
    minimized,
    setMinimized,
    Calculator,
    QuizPills,
    QuestionCard,
    setExamRunning,
    setExamDone,
    setShowConfirm,
    showConfirm,
    user,
    saveScore
  } = props;

  const wrap = {
    minHeight: "100vh",
    background: t.bg,
    color: t.text,
  };

  if (examDone) {
    const correct = examQs.filter(
      (q, i) => examAnswers[i] === q.answer
    ).length;

    const pct = Math.round((correct / examQs.length) * 100);

    if (user)
      saveScore("Exam", activeSubject?.name, correct, examQs.length, pct);

    return (
      <div style={wrap}>
        <Header
          onBack={() => goTo("home")}
          title="Exam Results"
          sub={activeSubject?.name}
          t={t}
        />
        <ResultScreen qs={examQs} answers={examAnswers} t={t} />
      </div>
    );
  }

  const q = examQs[examIdx];
  if (!q) return null;

  const answered = Object.keys(examAnswers).length;

  return (
    <div style={wrap}>
      <Header
        title="Exam Mode"
        sub={`${activeSubject?.name} · ${answered}/${examQs.length}`}
        t={t}
        right={
          <div
            style={{
              background: examTime < 300 ? "#dc3545" : t.goldBtn,
              borderRadius: 20,
              padding: "6px 14px",
              fontWeight: "bold",
            }}
          >
            {formatTime(examTime)}
          </div>
        }
      />

      <div style={{ padding: 16 }}>
        <QuestionCard
          q={q}
          idx={examIdx}
          answers={examAnswers}
          setAnswers={setExamAnswers}
          t={t}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setExamIdx(i => i - 1)}>
            Prev
          </button>
          <button onClick={() => setExamIdx(i => i + 1)}>
            Next
          </button>
        </div>

        <button onClick={() => setExamDone(true)}>
          Submit
        </button>
      </div>
    </div>
  );
                  }
