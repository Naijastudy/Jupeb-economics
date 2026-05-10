import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";

const FB_CACHE_KEY = "sn_fb_questions";
const FB_CACHE_TTL = 60 * 60 * 1000;

function getCachedQuestions() {
  try {
    const raw = localStorage.getItem(FB_CACHE_KEY);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > FB_CACHE_TTL) return null;
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

  useEffect(() => {
    fetchFirebaseQuestions();
  }, []);

  const fetchFirebaseQuestions = async () => {
    const cached = getCachedQuestions();
    if (cached) {
      setFirebaseQuestions(cached);
      setLoadingFirebase(false);
      return;
    }
    try {
      const snapshot = await getDocs(query(collection(db, "questions")));
      const questions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setFirebaseQuestions(questions);
      setCachedQuestions(questions);
    } catch (e) {
      console.log("Error fetching questions:", e);
    }
    setLoadingFirebase(false);
  };

  return { firebaseQuestions, loadingFirebase };
        }
