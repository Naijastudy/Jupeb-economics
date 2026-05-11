import { useState, useEffect } from "react";

const NOTIF_KEY = "sn_notifications";
const ALARM_KEY = "sn_alarm_time";

function getNotifSettings() {
  try {
    const raw = localStorage.getItem(NOTIF_KEY);
    if (!raw) return {
      enabled: false,
      dailyReminder: true,
      streakReminder: true,
      reminderHour: 18,
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

function scheduleNotification(hour) {
  // Cancel existing alarm
  const existingId = localStorage.getItem(ALARM_KEY);
  if (existingId) clearTimeout(Number(existingId));

  const now = new Date();
  const target = new Date();
  target.setHours(hour, 0, 0, 0);

  // If time already passed today, schedule for tomorrow
  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  const delay = target.getTime() - now.getTime();

  const id = setTimeout(() => {
    // Show notification
    if (Notification.permission === "granted") {
      new Notification("StudyNaija 📚", {
        body: "Time to study! Keep your streak alive 🔥",
        icon: "/android-chrome-192x192.png",
        badge: "/android-chrome-192x192.png",
        vibrate: [200, 100, 200],
        tag: "daily-reminder",
      });
    }
    // Reschedule for next day
    scheduleNotification(hour);
  }, delay);

  localStorage.setItem(ALARM_KEY, String(id));
}

function cancelNotification() {
  const existingId = localStorage.getItem(ALARM_KEY);
  if (existingId) {
    clearTimeout(Number(existingId));
    localStorage.removeItem(ALARM_KEY);
  }
}

export default function useNotifications() {
  const [permission, setPermission] = useState(
    typeof Notification !== "undefined"
      ? Notification.permission
      : "default"
  );
  const [settings, setSettings] = useState(
    getNotifSettings
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reschedule on app load if enabled
  useEffect(() => {
    const s = getNotifSettings();
    if (
      s.enabled &&
      s.dailyReminder &&
      Notification.permission === "granted"
    ) {
      scheduleNotification(s.reminderHour);
    }
  }, []);

  const requestPermission = async () => {
    setLoading(true);
    setError(null);
    try {
      const result =
        await Notification.requestPermission();
      setPermission(result);

      if (result === "granted") {
        const updated = {
          ...settings,
          enabled: true,
        };
        setSettings(updated);
        saveNotifSettings(updated);

        // Schedule first notification
        if (updated.dailyReminder) {
          scheduleNotification(updated.reminderHour);
        }

        // Show immediate test notification
        new Notification("StudyNaija 🎉", {
          body: "Notifications enabled! You'll be reminded to study daily.",
          icon: "/android-chrome-192x192.png",
        });
      } else {
        setError(
          "Permission denied. Please enable in phone settings."
        );
      }
    } catch (e) {
      console.log("Notification error:", e);
      setError("Could not enable notifications.");
    }
    setLoading(false);
  };

  const disableNotifications = () => {
    cancelNotification();
    const updated = {
      ...settings,
      enabled: false,
    };
    setSettings(updated);
    saveNotifSettings(updated);
  };

  const updateSettings = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    saveNotifSettings(updated);

    // Reschedule if time changed
    if (key === "reminderHour" && settings.enabled) {
      scheduleNotification(value);
    }

    // Handle daily reminder toggle
    if (key === "dailyReminder") {
      if (value) {
        scheduleNotification(settings.reminderHour);
      } else {
        cancelNotification();
      }
    }
  };

  // Send streak reminder
  const sendStreakReminder = () => {
    if (
      settings.streakReminder &&
      Notification.permission === "granted"
    ) {
      new Notification("StudyNaija 🔥", {
        body: "Don't break your streak! Study something today.",
        icon: "/android-chrome-192x192.png",
        tag: "streak-reminder",
      });
    }
  };

  return {
    permission,
    settings,
    loading,
    error,
    requestPermission,
    disableNotifications,
    updateSettings,
    sendStreakReminder,
  };
    }
