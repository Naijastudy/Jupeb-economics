import { useState, useEffect, useCallback } from "react";

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const NOTIF_KEY = "sn_notifications";

// ── DEFAULT SETTINGS ──────────────────────────────────────────────────────────
const DEFAULT_SETTINGS = {
  enabled:        false,
  dailyReminder:  true,
  streakReminder: true,
  reminderHour:   18,
  fcmEnabled:     false, // ✅ tracks if FCM is active
};

// ── NOTIFICATION MESSAGES ─────────────────────────────────────────────────────
const DAILY_MESSAGES = [
  { title: "StudyNaija 📚", body: "Time to study! Keep your streak alive 🔥" },
  { title: "StudyNaija 🎯", body: "Your JUPEB exam won't pass itself. Let's go!" },
  { title: "StudyNaija 💡", body: "10 minutes of study is better than zero. Start now!" },
  { title: "StudyNaija 🏆", body: "Champions study every day. Are you a champion?" },
  { title: "StudyNaija 📝", body: "New day, new questions. Keep the momentum going!" },
  { title: "StudyNaija ⚡", body: "Your future self will thank you for studying today." },
];

const STREAK_MESSAGES = [
  { title: "StudyNaija 🔥", body: "Don't break your streak! Study something today." },
  { title: "StudyNaija ⚡", body: "Your streak is at risk! Come study now." },
  { title: "StudyNaija 💪", body: "Keep it going! One question can save your streak." },
];

function getRandomMessage(messages) {
  return messages[Math.floor(Math.random() * messages.length)];
}

// ── SETTINGS HELPERS ──────────────────────────────────────────────────────────
function getNotifSettings() {
  try {
    const raw = localStorage.getItem(NOTIF_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function saveNotifSettings(settings) {
  try {
    localStorage.setItem(NOTIF_KEY, JSON.stringify(settings));
  } catch {}
}

// ── SCHEDULE VIA SERVICE WORKER ───────────────────────────────────────────────
// ✅ Fallback for when FCM server push is not available
async function scheduleViaServiceWorker(hour, type = "daily") {
  try {
    if (!("serviceWorker" in navigator)) return false;
    const registration = await navigator.serviceWorker.ready;

    const now    = new Date();
    const target = new Date();
    target.setHours(hour, 0, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);

    const delayMs = target.getTime() - now.getTime();

    registration.active?.postMessage({
      type:    "SCHEDULE_NOTIFICATION",
      payload: {
        notifType:   type,
        hour,
        delayMs,
        triggerTime: target.getTime(),
      },
    });

    console.log(
      `[SW] Scheduled ${type} in ${Math.round(delayMs / 60000)} min`
    );
    return true;
  } catch (e) {
    console.warn("SW schedule failed:", e.message);
    return false;
  }
}

// ── CANCEL VIA SERVICE WORKER ─────────────────────────────────────────────────
async function cancelViaServiceWorker(type = "all") {
  try {
    if (!("serviceWorker" in navigator)) return;
    const registration = await navigator.serviceWorker.ready;
    registration.active?.postMessage({
      type:    "CANCEL_NOTIFICATION",
      payload: { notifType: type },
    });
  } catch (e) {
    console.warn("SW cancel failed:", e.message);
  }
}

// ── HOOK ──────────────────────────────────────────────────────────────────────
export default function useNotifications() {
  const [permission, setPermission] = useState(
    typeof Notification !== "undefined"
      ? Notification.permission
      : "default"
  );
  const [settings, setSettings] = useState(getNotifSettings);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const [swReady,  setSwReady]  = useState(false);

  // ── CHECK SW READINESS ──
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.ready.then((reg) => {
      setSwReady(!!reg.active);
    });
  }, []);

  // ── RESTORE SCHEDULES ON APP LOAD ──
  // ✅ Re-schedules SW timers every time app opens
  // Acts as fallback in case FCM server push hasn't fired
  useEffect(() => {
    if (!swReady) return;
    const s = getNotifSettings();
    if (!s.enabled || Notification.permission !== "granted") return;

    if (s.dailyReminder) {
      scheduleViaServiceWorker(s.reminderHour, "daily");
    }
    if (s.streakReminder) {
      const streakHour = Math.max(0, s.reminderHour - 2);
      scheduleViaServiceWorker(streakHour, "streak");
    }
  }, [swReady]);

  // ── REQUEST PERMISSION ────────────────────────────────────────────────────
  const requestPermission = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (typeof Notification === "undefined") {
      setError(
        "Notifications not supported. On iPhone, add app to Home Screen first!"
      );
      setLoading(false);
      return;
    }

    if (!("serviceWorker" in navigator)) {
      setError("Service Worker not supported on this browser.");
      setLoading(false);
      return;
    }

    try {
      // Step 1 — Request permission
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result !== "granted") {
        setError("Permission denied. Please enable in phone settings.");
        setLoading(false);
        return;
      }

      // Step 2 — Get SW registration
      const registration = await navigator.serviceWorker.ready;

      // Step 3 — Save settings
      // ✅ fcmEnabled will be updated by useFCM after token is saved
      const updated = { ...settings, enabled: true };
      setSettings(updated);
      saveNotifSettings(updated);

      // Step 4 — Schedule SW fallback timers
      if (updated.dailyReminder) {
        await scheduleViaServiceWorker(updated.reminderHour, "daily");
      }
      if (updated.streakReminder) {
        const streakHour = Math.max(0, updated.reminderHour - 2);
        await scheduleViaServiceWorker(streakHour, "streak");
      }

      // Step 5 — Show welcome notification via SW
      await registration.showNotification("StudyNaija 🎉", {
        body:    "Notifications enabled! You'll be reminded to study daily.",
        icon:    "/android-chrome-192x192.png",
        badge:   "/android-chrome-192x192.png",
        vibrate: [200, 100, 200],
        tag:     "welcome",
        data:    { url: "/" },
      });

    } catch (e) {
      console.log("Notification setup error:", e);
      setError(
        "Setup failed. On iPhone, add app to Home Screen first!"
      );
    }

    setLoading(false);
  }, [settings]);

  // ── MARK FCM AS ENABLED ───────────────────────────────────────────────────
  // ✅ Called by useFCM hook after FCM token is saved to Firestore
  const markFcmEnabled = useCallback(() => {
    const updated = { ...getNotifSettings(), fcmEnabled: true };
    setSettings(updated);
    saveNotifSettings(updated);
  }, []);

  // ── DISABLE NOTIFICATIONS ─────────────────────────────────────────────────
  const disableNotifications = useCallback(async () => {
    await cancelViaServiceWorker("all");
    const updated = {
      ...settings,
      enabled:    false,
      fcmEnabled: false,
    };
    setSettings(updated);
    saveNotifSettings(updated);
  }, [settings]);

  // ── UPDATE SETTINGS ───────────────────────────────────────────────────────
  const updateSettings = useCallback(async (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    saveNotifSettings(updated);

    if (!settings.enabled) return;

    if (key === "reminderHour") {
      await scheduleViaServiceWorker(value, "daily");
      if (updated.streakReminder) {
        const streakHour = Math.max(0, value - 2);
        await scheduleViaServiceWorker(streakHour, "streak");
      }
    }

    if (key === "dailyReminder") {
      if (value) await scheduleViaServiceWorker(settings.reminderHour, "daily");
      else       await cancelViaServiceWorker("daily");
    }

    if (key === "streakReminder") {
      if (value) {
        const streakHour = Math.max(0, settings.reminderHour - 2);
        await scheduleViaServiceWorker(streakHour, "streak");
      } else {
        await cancelViaServiceWorker("streak");
      }
    }
  }, [settings]);

  // ── SEND STREAK REMINDER IMMEDIATELY ─────────────────────────────────────
  const sendStreakReminder = useCallback(async () => {
    if (!settings.streakReminder) return;
    if (Notification.permission !== "granted") return;
    try {
      const registration = await navigator.serviceWorker.ready;
      const msg = getRandomMessage(STREAK_MESSAGES);
      await registration.showNotification(msg.title, {
        body:     msg.body,
        icon:     "/android-chrome-192x192.png",
        badge:    "/android-chrome-192x192.png",
        vibrate:  [200, 100, 200],
        tag:      "streak-reminder",
        renotify: true,
        data:     { url: "/" },
        actions: [
          { action: "open",    title: "Study Now 📚" },
          { action: "dismiss", title: "Later" },
        ],
      });
    } catch (e) {
      console.warn("Streak reminder failed:", e.message);
    }
  }, [settings.streakReminder]);

  return {
    permission,
    settings,
    loading,
    error,
    swReady,
    requestPermission,
    markFcmEnabled,   
    disableNotifications,
    updateSettings,
    sendStreakReminder,
  };
        }
                                     
