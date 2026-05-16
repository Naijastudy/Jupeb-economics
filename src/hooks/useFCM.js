import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

// ✅ FIXED — static imports instead of dynamic
// Dynamic imports inside useEffect caused:
// "ReferenceError: Cannot access 'Oe' before initialization"
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const FCM_TOKEN_KEY = "sn_fcm_token";
const VAPID_KEY     = process.env.REACT_APP_VAPID_PUBLIC_KEY;

// ── DETECT PLATFORM ───────────────────────────────────────────────────────────
function getPlatform() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua))          return "android";
  return "web";
}

// ── SAVE TOKEN TO FIRESTORE ───────────────────────────────────────────────────
async function saveTokenToFirestore(token, uid = null) {
  try {
    await setDoc(doc(db, "fcm_tokens", token), {
      token,
      uid:       uid || null,
      platform:  getPlatform(),
      updatedAt: serverTimestamp(),
    });
    console.log("FCM token saved ✅");
  } catch (e) {
    console.log("Error saving FCM token:", e.message);
  }
}

// ── HOOK ──────────────────────────────────────────────────────────────────────
export default function useFCM(user) {
  const [fcmToken, setFcmToken] = useState(null);
  const [fcmReady, setFcmReady] = useState(false);
  const [fcmError, setFcmError] = useState(null);

  // ── INITIALIZE FCM ──
  useEffect(() => {
    // Only run if permission already granted
    if (Notification.permission !== "granted") return;
    initFCM();
  }, [user]);

  // ── WATCH FOR PERMISSION GRANT ──
  // Polls every 3 seconds until token is obtained
  // Handles case where user grants permission and we need to get token
  useEffect(() => {
    if (fcmToken) return; // already have token — stop polling

    const interval = setInterval(() => {
      if (Notification.permission === "granted" && !fcmToken) {
        initFCM();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [fcmToken]);

  const initFCM = async () => {
    try {
      // ✅ Check if FCM is supported on this device
      const supported = await isSupported();
      if (!supported) {
        console.log("FCM not supported on this device");
        setFcmError("not_supported");
        return;
      }

      // ✅ Get messaging instance
      const messagingInstance = getMessaging();

      // ✅ Get SW registration — FCM needs it
      const swReg = await navigator.serviceWorker.ready;

      // ✅ Get FCM token
      const token = await getToken(messagingInstance, {
        vapidKey:                  VAPID_KEY,
        serviceWorkerRegistration: swReg,
      });

      if (!token) {
        console.log("No FCM token received");
        setFcmError("no_token");
        return;
      }

      // ✅ Only save if token is new or changed
      const savedToken = localStorage.getItem(FCM_TOKEN_KEY);
      if (token !== savedToken) {
        await saveTokenToFirestore(token, user?.uid);
        localStorage.setItem(FCM_TOKEN_KEY, token);
      }

      setFcmToken(token);
      setFcmReady(true);

      // ✅ Handle foreground messages
      // When app is OPEN — FCM doesn't auto-show notification
      // We catch it here and show via SW for consistency
      onMessage(messagingInstance, async (payload) => {
        console.log("FCM foreground message:", payload);
        const { title, body } = payload.notification || {};
        if (title && swReg.active) {
          await swReg.showNotification(title, {
            body:    body || "Time to study!",
            icon:    "/android-chrome-192x192.png",
            badge:   "/android-chrome-192x192.png",
            vibrate: [200, 100, 200],
            tag:     "fcm-foreground",
            data:    { url: payload.data?.url || "/" },
            actions: [
              { action: "open",    title: "Study Now 📚" },
              { action: "dismiss", title: "Later" },
            ],
          });
        }
      });

    } catch (e) {
      console.log("FCM init error:", e.message);
      setFcmError(e.message);
    }
  };

  // ── LINK TOKEN TO USER AFTER LOGIN ──
  // ✅ When user signs in, attach their uid to the saved token
  useEffect(() => {
    if (!user || !fcmToken) return;
    const savedToken = localStorage.getItem(FCM_TOKEN_KEY);
    if (savedToken) {
      saveTokenToFirestore(savedToken, user.uid);
    }
  }, [user, fcmToken]);

  return { fcmToken, fcmReady, fcmError };
    }
