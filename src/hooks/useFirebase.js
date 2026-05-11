import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";

const FB_CACHE_KEY = "sn_fb_questions";
const FB_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours offline

function getCachedQuestions() {
  try {
    const raw = localStorage.getItem(FB_CACHE_KEY);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    // Use cache if within TTL
    if (Date.now() - timestamp > FB_CACHE_TTL) return null;
    return data;
  } catch {
    return null;
  }
}

function getCachedQuestionsAnyAge() {
  // Returns cache regardless of age
  // Used when offline
  try {
    const raw = localStorage.getItem(FB_CACHE_KEY);
    if (!raw) return null;
    const { data } = JSON.parse(raw);
    return data;
  } catch {
    return null;
  }
}

function setCachedQuestions(data) {
  try {
    localStorage.setItem(
      FB_CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {}
}

export default function useFirebase() {
  const [firebaseQuestions, setFirebaseQuestions] = useState([]);
  const [loadingFirebase, setLoadingFirebase] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetchFirebaseQuestions();
  }, []);

  const fetchFirebaseQuestions = async () => {
    setFetchError(false);

    // 1. Try fresh cache first
    const cached = getCachedQuestions();
    if (cached) {
      setFirebaseQuestions(cached);
      setLoadingFirebase(false);
      return;
    }

    // 2. Try fetching from Firestore
    try {
      const snapshot = await getDocs(
        query(collection(db, "questions"))
      );
      const questions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFirebaseQuestions(questions);
      setCachedQuestions(questions);
    } catch (e) {
      console.log("Error fetching questions:", e);
      setFetchError(true);

      // 3. Fall back to old cache if offline
      const oldCache = getCachedQuestionsAnyAge();
      if (oldCache) {
        setFirebaseQuestions(oldCache);
        console.log("Using old cached questions");
      }
    }
    setLoadingFirebase(false);
  };

  return {
    firebaseQuestions,
    loadingFirebase,
    fetchError,
    refetch: fetchFirebaseQuestions,
  };
}
