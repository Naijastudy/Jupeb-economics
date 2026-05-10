import { useState } from "react";

function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

function loadStreak() {
  try {
    const raw = localStorage.getItem("sn_streak");
    if (!raw) return { count: 0, lastDate: null };
    return JSON.parse(raw);
  } catch {
    return { count: 0, lastDate: null };
  }
}

export default function useStreak() {
  const [streak, setStreak] = useState(loadStreak);

  const updateStreak = () => {
    const today = getTodayStr();
    const current = loadStreak();
    if (current.lastDate === today) return current;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split("T")[0];

    const newCount =
      current.lastDate === yStr ? current.count + 1 : 1;
    const updated = { count: newCount, lastDate: today };
    localStorage.setItem("sn_streak", JSON.stringify(updated));
    setStreak(updated);
    return updated;
  };

  return { streak, updateStreak };
}
