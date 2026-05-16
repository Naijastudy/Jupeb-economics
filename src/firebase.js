import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey:            process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:        process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId:     process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db           = getFirestore(app);
export const auth         = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// ── SAFE MESSAGING INIT ───────────────────────────────────────────────────────
// Messaging is not supported on all browsers (e.g. Firefox, some iOS)
// So we load it dynamically and export safely
export let messaging  = null;
export let getToken   = null;
export let onMessage  = null;

const initMessaging = async () => {
  try {
    const { isSupported } = await import("firebase/messaging");
    const supported = await isSupported();

    if (supported) {
      const {
        getMessaging,
        getToken:    _getToken,
        onMessage:   _onMessage,
      } = await import("firebase/messaging");

      messaging  = getMessaging(app);
      getToken   = _getToken;
      onMessage  = _onMessage;

      console.log("Firebase messaging initialized ✅");
    } else {
      console.log("Firebase messaging not supported on this device");
    }
  } catch (e) {
    console.log("Messaging init skipped:", e.message);
  }
};

initMessaging();
