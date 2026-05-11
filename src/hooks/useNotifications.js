import { useState, useEffect } from "react";
import { messaging, getToken, onMessage } from "../firebase";
import { db } from "../firebase";
import {
  doc, setDoc, serverTimestamp
} from "firebase/firestore";

const VAPID_KEY = process.env.REACT_APP_VAPID_KEY;
const NOTIF_KEY = "sn_notifications";

function getNotifSettings() {
  try {
    const raw = localStorage.getItem(NOTIF_KEY);
    if (!raw) return {
      enabled: false,
      dailyReminder: true,
      streakReminder: true,
      reminderHour: 18, // 6 PM default
    };
    return JSON.parse(raw);
  } catch {
    return {
      enabled: false,
      dailyReminder: true,
      streakReminder: true,
      reminderHour: 18,
    };
  }
}

function saveNotifSettings(settings) {
  try {
    localStorage.setItem(
      NOTIF_KEY,
      JSON.stringify(settings)
    );
  } catch {}
}

export default function useNotifications(user) {
  const [permission, setPermission] = useState(
    Notification.permission
  );
  const [fcmToken, setFcmToken] = useState(null);
  const [settings, setSettings] = useState(
    getNotifSettings
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Listen for foreground messages
  useEffect(() => {
    const unsubscribe = onMessage(
      messaging,
      (payload) => {
        console.log("Message received:", payload);
        // Show notification manually when app is open
        if (Notification.permission === "granted") {
          new Notification(
            payload.notification?.title || "StudyNaija",
            {
              body: payload.notification?.body,
              icon: "/android-chrome-192x192.png",
            }
          );
        }
      }
    );
    return () => unsubscribe();
  }, []);

  const requestPermission = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === "granted") {
        const token = await getToken(messaging, {
          vapidKey: VAPID_KEY,
        });

        if (token) {
          setFcmToken(token);

          // Save token to Firestore
          if (user) {
            await setDoc(
              doc(db, "fcm_tokens", user.uid),
              {
                token,
                uid: user.uid,
                name: user.displayName,
                updatedAt: serverTimestamp(),
              }
            );
          }

          // Update settings
          const updated = {
            ...settings,
            enabled: true,
          };
          setSettings(updated);
          saveNotifSettings(updated);
        }
      }
    } catch (e) {
      console.log("Notification error:", e);
      setError(
        "Could not enable notifications. Please try again."
      );
    }
    setLoading(false);
  };

  const disableNotifications = async () => {
    const updated = {
      ...settings,
      enabled: false,
    };
    setSettings(updated);
    saveNotifSettings(updated);
    setFcmToken(null);
  };

  const updateSettings = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    saveNotifSettings(updated);
  };

  return {
    permission,
    fcmToken,
    settings,
    loading,
    error,
    requestPermission,
    disableNotifications,
    updateSettings,
  };
  }
