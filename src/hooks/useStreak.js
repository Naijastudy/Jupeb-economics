import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

const STREAK_KEY = "sn_streak";

// ── Use LOCAL date not UTC ──
function getTodayStr() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1)
    .padStart(2, "0");
  const day = String(now.getDate())
    .padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getYesterdayStr() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1)
    .padStart(2, "0");
  const day = String(yesterday.getDate())
    .padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// ── Load from localStorage ──
function loadLocalStreak() {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) return { count: 0, lastDate: null };
    return JSON.parse(raw);
  } catch {
    return { count: 0, lastDate: null };
  }
}

// ── Save to localStorage ──
function saveLocalStreak(streak) {
  try {
    localStorage.setItem(
      STREAK_KEY,
      JSON.stringify(streak)
    );
  } catch {}
}

export default function useStreak(user) {
  const [streak, setStreak] = useState(
    loadLocalStreak
  );

  // ── Load from Firestore when user logs in ──
  useEffect(() => {
    if (user) {
      loadFirestoreStreak(user.uid);
    }
  }, [user]);

  const loadFirestoreStreak = async (uid) => {
    try {
      const ref = doc(db, "streaks", uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        const firestoreStreak = {
          count: data.count || 0,
          lastDate: data.lastDate || null,
        };

        // Use whichever is higher
        // (local or firestore)
        const local = loadLocalStreak();
        const best =
          firestoreStreak.count >= local.count
            ? firestoreStreak
            : local;

        setStreak(best);
        saveLocalStreak(best);
      }
    } catch (e) {
      console.log("Error loading streak:", e);
      // Fall back to localStorage
      setStreak(loadLocalStreak());
    }
  };

  const saveFirestoreStreak = async (uid, data) => {
    try {
      await setDoc(doc(db, "streaks", uid), {
        count: data.count,
        lastDate: data.lastDate,
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      console.log("Error saving streak:", e);
    }
  };

  const updateStreak = (uid) => {
    const today = getTodayStr();
    const yesterday = getYesterdayStr();
    const current = loadLocalStreak();

    // Already updated today
    if (current.lastDate === today) {
      return current;
    }

    // Calculate new count
    const newCount =
      current.lastDate === yesterday
        ? current.count + 1  // consecutive day ✅
        : 1;                 // streak broken, restart

    const updated = {
      count: newCount,
      lastDate: today,
    };

    // Save locally
    saveLocalStreak(updated);
    setStreak(updated);

    // Save to Firestore if logged in
    if (uid || user?.uid) {
      saveFirestoreStreak(uid || user.uid, updated);
    }

    return updated;
  };

  // ── Reset streak (don't call accidentally!) ──
  const resetStreak = () => {
    const reset = { count: 0, lastDate: null };
    saveLocalStreak(reset);
    setStreak(reset);
    if (user?.uid) {
      saveFirestoreStreak(user.uid, reset);
    }
  };

  return { streak, updateStreak, resetStreak };
    }
