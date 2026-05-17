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
  limit,       
  startAfter,  
} from "firebase/firestore";


const SCORES_PER_PAGE = 20;

export default function useAuth() {
  const [user,          setUser]          = useState(null);
  const [userScores,    setUserScores]    = useState([]);
  const [authLoading,   setAuthLoading]   = useState(true);

  
  const [lastScoreDoc,  setLastScoreDoc]  = useState(null); // last Firestore doc fetched
  const [hasMoreScores, setHasMoreScores] = useState(false); // whether more scores exist
  const [loadingMore,   setLoadingMore]   = useState(false); // loading next page

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(
          auth,
          async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
              await fetchUserScores(currentUser.uid);
            } else {
              setUserScores([]);
              setLastScoreDoc(null);
              setHasMoreScores(false);
            }
            setAuthLoading(false);
          }
        );
        return () => unsubscribe();
      })
      .catch((e) => {
        console.log("Persistence error:", e);
        setAuthLoading(false);
      });
  }, []);

  // ── FETCH FIRST PAGE OF SCORES ────────────────────────────────────────────
  const fetchUserScores = async (uid) => {
    try {
      const q = query(
        collection(db, "scores"),
        where("uid", "==", uid),
        orderBy("timestamp", "desc"),
        limit(SCORES_PER_PAGE)  
      );
      const snapshot = await getDocs(q);
      const docs = snapshot.docs;

      setUserScores(
        docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );

    
      setLastScoreDoc(docs[docs.length - 1] || null);

    
      setHasMoreScores(docs.length === SCORES_PER_PAGE);

    } catch (e) {
      console.log("Error fetching scores:", e);
    }
  };

  // ── LOAD MORE SCORES ──────────────────────────────────────────────────────
  const loadMoreScores = async () => {
    if (!user || !lastScoreDoc || !hasMoreScores || loadingMore) return;

    setLoadingMore(true);
    try {
      const q = query(
        collection(db, "scores"),
        where("uid", "==", user.uid),
        orderBy("timestamp", "desc"),
        startAfter(lastScoreDoc),  
        limit(SCORES_PER_PAGE)
      );
      const snapshot = await getDocs(q);
      const docs = snapshot.docs;

      
      setUserScores((prev) => [
        ...prev,
        ...docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      ]);

      
      setLastScoreDoc(docs[docs.length - 1] || lastScoreDoc);

      
      setHasMoreScores(docs.length === SCORES_PER_PAGE);

    } catch (e) {
      console.log("Error loading more scores:", e);
    }
    setLoadingMore(false);
  };

  // ── SAVE SCORE ────────────────────────────────────────────────────────────
  const saveScore = async (
    mode, subject, score,
    total, pct, qs, answers
  ) => {
    if (!user) return;
    try {
      const breakdown = qs.map((q, i) => ({
        q:          q.q,
        year:       q.year,
        answer:     q.answer,
        userAnswer: answers[i] || null,
        correct:    answers[i] === q.answer,
        exp:        q.exp,
        options:    q.options,
      }));

      await addDoc(collection(db, "scores"), {
        uid:       user.uid,
        name:      user.displayName,
        email:     user.email,
        mode, subject, score,
        total, pct, breakdown,
        timestamp: serverTimestamp(),
      });

      
      await fetchUserScores(user.uid);

    } catch (e) {
      console.log("Error saving score:", e);
    }
  };

  // ── GOOGLE LOGIN ──────────────────────────────────────────────────────────
  const handleGoogleLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.log("Login error:", e);
    }
  };

  // ── LOGOUT ────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserScores([]);
      setLastScoreDoc(null);
      setHasMoreScores(false);
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
    loadMoreScores,
    hasMoreScores,
    loadingMore,
  };
}
