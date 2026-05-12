import { useState, useEffect } from "react";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleOptions(q) {
  const shuffled = shuffle([...q.options]);
  const relabeled = shuffled.map(
    (opt, i) => String.fromCharCode(65 + i) + opt.slice(1)
  );
  const newAnswer = String.fromCharCode(
    65 + shuffled.findIndex((opt) => opt[0] === q.answer)
  );
  return { ...q, options: relabeled, answer: newAnswer };
}

function getAllQuestions(data, fbQuestions = [], subjectId = "economics", year = null) {
  let all = [];
  Object.entries(data.questions).forEach(([topicId, qs]) => {
    qs.forEach((q) => {
      if (!year || q.year === year) {
        all.push(shuffleOptions({ ...q, topicId }));
      }
    });
  });
  fbQuestions
    .filter((q) => q.subject === subjectId && (!year || q.year === year))
    .forEach((q) => {
      all.push(
        shuffleOptions({
          year: q.year || "2025",
          q: q.q,
          options: q.options,
          answer: q.answer,
          exp: q.exp,
          topicId: q.topic || "intro",
          fromFirebase: true,
        })
      );
    });
  return shuffle(all);
}

export default function useQuiz(firebaseQuestions, updateStreak, showToast) {

  // ── CBT STATE ──
  const [cbtQs, setCbtQs] = useState([]);
  const [cbtIdx, setCbtIdx] = useState(0);
  const [cbtAnswers, setCbtAnswers] = useState({});
  const [cbtDone, setCbtDone] = useState(false);
  const [cbtTime, setCbtTime] = useState(3600);
  const [cbtRunning, setCbtRunning] = useState(false);
  const [cbtScoreSaved, setCbtScoreSaved] = useState(false);

  // ── EXAM STATE ──
  const [examCount, setExamCount] = useState(50);
  const [examMinutes, setExamMinutes] = useState(60);
  const [examQs, setExamQs] = useState([]);
  const [examIdx, setExamIdx] = useState(0);
  const [examAnswers, setExamAnswers] = useState({});
  const [examDone, setExamDone] = useState(false);
  const [examTime, setExamTime] = useState(3600);
  const [examRunning, setExamRunning] = useState(false);
  const [examScoreSaved, setExamScoreSaved] = useState(false);

  // ── CALCULATOR ──
  const [showCalc, setShowCalc] = useState(false);
  const [minimized, setMinimized] = useState(false);

  // ── CBT TIMER ──
  useEffect(() => {
    if (!cbtRunning || cbtDone) return;
    const timer = setInterval(() => {
      setCbtTime((prev) => {
       if (prev === 180) showToast("⏰ 3 minutes remaining!", "warning", 5000);
        if (prev <= 1) {
          setCbtRunning(false);
          setCbtDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cbtRunning, cbtDone]);

  // ── EXAM TIMER ──
  useEffect(() => {
    if (!examRunning || examDone) return;
    const timer = setInterval(() => {
      setExamTime((prev) => {
       if (prev === 180) showToast("⏰ 3 minutes remaining!", "warning", 5000);
        if (prev <= 1) {
          setExamRunning(false);
          setExamDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [examRunning, examDone]);

  // ── START CBT ──
  const startCbt = (subject, goTo, uid) => {
    let qs = getAllQuestions(
      subject.data, firebaseQuestions, subject.id
    );
    if (qs.length > 50) qs = qs.slice(0, 50);
    setCbtQs(qs);
    setCbtIdx(0);
    setCbtAnswers({});
    setCbtDone(false);
    setCbtScoreSaved(false);
    setCbtTime(60 * 60);
    setCbtRunning(true);
    updateStreak(uid);
    goTo("cbt_quiz");
  };

  // ── START EXAM ──
  const startExam = (subject, goTo, year = null, uid) => {
    let qs = getAllQuestions(
      subject.data, firebaseQuestions, subject.id, year
    );
    if (qs.length > examCount) qs = qs.slice(0, examCount);
    setExamQs(qs);
    setExamIdx(0);
    setExamAnswers({});
    setExamDone(false);
    setExamScoreSaved(false);
    setExamTime(examMinutes * 60);
    setExamRunning(true);
    updateStreak(uid);
    goTo("exam_quiz");
  };

  return {
    // CBT
    cbtQs, cbtIdx, setCbtIdx,
    cbtAnswers, setCbtAnswers,
    cbtDone, setCbtDone,
    cbtTime, cbtRunning, setCbtRunning,
    cbtScoreSaved, setCbtScoreSaved,
    startCbt,

    // EXAM
    examCount, setExamCount,
    examMinutes, setExamMinutes,
    examQs, examIdx, setExamIdx,
    examAnswers, setExamAnswers,
    examDone, setExamDone,
    examTime, examRunning, setExamRunning,
    examScoreSaved, setExamScoreSaved,
    startExam,

    // CALCULATOR
    showCalc, setShowCalc,
    minimized, setMinimized,
  };
}
