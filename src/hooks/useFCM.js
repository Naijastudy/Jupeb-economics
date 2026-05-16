import { useEffect, useState } from "react";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

const FCM_TOKEN_KEY = "sn_fcm_token";
const VAPID_KEY = process.env.REACT_APP_VAPID_PUBLIC_KEY;

async function saveTokenToFirestore(token, uid = null) {
  try {
    const { db } = await import("../firebase"); // ← lazy
    await setDoc(doc(db, "fcm_tokens", token), {
      token,
      uid: uid || null,
      platform: getPlatform(),
      updatedAt: serverTimestamp(),
    });
    console.log("FCM token saved to Firestore ✅");
  } catch (e) {
    console.log("Error saving FCM token:", e.message);
  }
}

function getPlatform() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "web";
}

export default function useFCM(user) {
  const [fcmToken, setFcmToken] = useState(null);
  const [fcmReady, setFcmReady] = useState(false);
  const [fcmError, setFcmError] = useState(null);

  useEffect(() => {
    if (Notification.permission !== "granted") return;
    initFCM();
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Notification.permission === "granted" && !fcmToken) {
        initFCM();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [fcmToken]);

  const initFCM = async () => {
    try {
      const { isSupported } = await import("firebase/messaging");
      const supported = await isSupported();

      if (!supported) {
        setFcmError("FCM not supported");
        return;
      }

      const { app } = await import("../firebase"); // ← lazy
      const { getMessaging, getToken, onMessage } = await import("firebase/messaging");

      const messagingInstance = getMessaging(app);
      const swReg = await navigator.serviceWorker.ready;

      const token = await getToken(messagingInstance, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: swReg,
      });

      if (!token) {
        setFcmError("No token received");
        return;
      }

      const savedToken = localStorage.getItem(FCM_TOKEN_KEY);
      if (token !== savedToken) {
        await saveTokenToFirestore(token, user?.uid);
        localStorage.setItem(FCM_TOKEN_KEY, token);
      }

      setFcmToken(token);
      setFcmReady(true);

      onMessage(messagingInstance, async (payload) => {
        const { title, body } = payload.notification || {};
        if (title && swReg.active) {
          await swReg.showNotification(title, {
            body: body || "Time to study!",
            icon: "/android-chrome-192x192.png",
            badge: "/android-chrome-192x192.png",
            vibrate: [200, 100, 200],
            tag: "fcm-foreground",
            data: { url: payload.data?.url || "/" },
            actions: [
              { action: "open", title: "Study Now 📚" },
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

  useEffect(() => {
    if (!user || !fcmToken) return;
    const savedToken = localStorage.getItem(FCM_TOKEN_KEY);
    if (savedToken) {
      saveTokenToFirestore(savedToken, user.uid);
    }
  }, [user, fcmToken]);

  return { fcmToken, fcmReady, fcmError };
}
