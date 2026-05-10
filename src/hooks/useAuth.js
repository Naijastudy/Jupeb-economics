import { useState, useEffect } from "react";
import { db, auth, googleProvider } from "../firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy
} from "firebase/firestore";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [userScores, setUserScores] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchUserScores(currentUser.uid);
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
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (e) {
      console.log("Error fetching scores:", e);
    }
  };

  const saveScore = async (
    mode, subject, score, total, pct, qs, answers, activeSubject
  ) => {
    if (!user) return;
    try {
      const breakdown = qs.map((q, i) => ({
        q: q.q, year: q.year, answer: q.answer,
        userAnswer: answers[i] || null,
        correct: answers[i] === q.answer,
        exp: q.exp, options: q.options,
      }));
      await addDoc(collection(db, "scores"), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        mode, subject, score, total, pct, breakdown,
        timestamp: serverTimestamp(),
      });
      fetchUserScores(user.uid);
    } catch (e) {
      console.log("Error saving score:", e);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.log("Login error:", e);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserScores([]);
    } catch (e) {
      console.log("Logout error:", e);
    }
  };

  return {
    user,
    userScores,
    saveScore,
    handleGoogleLogin,
    handleLogout,
  };
        }
