import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCl4-QWw8-_BgzxTD6fi9-CxsC78U7wywU",
  authDomain: "studynaija-8c01a.firebaseapp.com",
  projectId: "studynaija-8c01a",
  storageBucket: "studynaija-8c01a.firebasestorage.app",
  messagingSenderId: "668447124421",
  appId: "1:668447124421:web:c040358d19e6aab3edf9ac",
  measurementId: "G-VY9B68ZG04"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
