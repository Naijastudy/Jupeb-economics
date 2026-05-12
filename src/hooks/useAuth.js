import { useState, useEffect } from "react";
import { db, auth, googleProvider } from "../firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [userScores, setUserScores] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
  let unsubscribe = () => {};

  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        if (currentUser) await fetchUserScores(currentUser.uid);
        else setUserScores([]);
        setAuthLoading(false);
      });
    })
    .catch((e) => {
      console.log("Persistence error:", e);
      setAuthLoading(false);
    });

  return () => unsubscribe(); 
}, []);

  const fetchUserScores = async (uid) => {
    try {
      const q = query(
        collection(db, "scores"),
        where("uid", "==", uid),
        orderBy("timestamp", "desc")
      );
      const snapshot = await getDocs(q);
      setUserScores(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    } catch (e) {
      console.log("Error fetching scores:", e);
    }
  };

  const saveScore = async (
    mode, subject, score,
    total, pct, qs, answers
  ) => {
    if (!user) return;
    try {
      const breakdown = qs.map((q, i) => ({
        q: q.q,
        year: q.year,
        answer: q.answer,
        userAnswer: answers[i] || null,
        correct: answers[i] === q.answer,
        exp: q.exp,
        options: q.options,
      }));
      await addDoc(collection(db, "scores"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        mode, subject, score,
        total, pct, breakdown,
        timestamp: serverTimestamp(),
      });
      await fetchUserScores(user.uid);
      return { success: true };
    } catch (e) {
      console.log("Error saving score:", e);
      return { success: true };
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await setPersistence(
        auth, browserLocalPersistence
      );
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      if (e.code !== "auth/popup-closed-by-user") {
      console.log("Login error:", e);
        return { error: e.message };
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserScores([]);
    } catch (e) {
      console.log("Logout error:", e);
    }
  };

  return {
    user,
    userScores,
    authLoading,
    saveScore,
    handleGoogleLogin,
    handleLogout,
  };
}
