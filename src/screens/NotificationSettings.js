import React from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";
import ScreenWrapper from "../components/ScreenWrapper";
import { useApp } from "../context/AppContext";

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const ampm = i < 12 ? "AM" : "PM";
  const hour = i === 0 ? 12 : i > 12 ? i - 12 : i;
  return { value: i, label: `${hour}:00 ${ampm}` };
});

export default function NotificationSettings({
  onBack,
  permission,
  settings,
  loading,
  error,
  onRequestPermission,
  onDisable,
  onUpdateSettings,
}) {
  const { t, card, goldBtn } = useApp();

  return (
    <ScreenWrapper>
      <Header
        onBack={onBack}
        title="Notifications"
        sub="Study reminders"
        t={t}
      />

      <div style={{ padding: 16 }}>

        {/* Status Card */}
        <div style={{
          ...card,
          textAlign: "center",
          padding: "28px 20px",
        }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>
            {permission === "granted"
              ? settings.enabled ? "🔔" : "🔕"
              : permission === "denied" ? "🚫" : "🔔"}
          </div>

          <div style={{
            fontSize: 18,
            fontWeight: "bold",
            color: t.heading,
            marginBottom: 8,
          }}>
            {permission === "granted"
              ? settings.enabled
                ? "Notifications On"
                : "Notifications Off"
              : permission === "denied"
              ? "Notifications Blocked"
              : "Enable Notifications"}
          </div>

          <div style={{
            fontSize: 13,
            color: t.textSub,
            lineHeight: 1.8,
            marginBottom: 24,
          }}>
            {permission === "granted"
              ? settings.enabled
                ? "You will receive study reminders"
                : "Tap to turn on reminders"
              : permission === "denied"
              ? "Please enable in phone settings → Apps → StudyNaija → Notifications"
              : "Get daily reminders to keep your streak going!"}
          </div>

          {/* Error */}
{error && !settings.enabled && 
 permission !== "granted" && (
   <div style={{
    background: t.wrongBg,
    border: `1px solid ${t.wrongBorder}`,
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    color: t.wrongText,
    marginBottom: 16,
  }}>
    ⚠️ {error}
  </div>
)}

          {/* Action Button */}
          {permission !== "denied" && (
            settings.enabled
              ? <button
                  onClick={onDisable}
                  style={{
                    ...goldBtn,
                    background: t.wrongBorder,
                  }}
                >
                  🔕 Turn Off Notifications
                </button>
              : <button
                  onClick={onRequestPermission}
                  disabled={loading}
                  style={{
                    ...goldBtn,
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading
                    ? "Setting up..."
                    : "🔔 Enable Notifications"}
                </button>
          )}
        </div>

        {/* Settings — only show if enabled */}
        {settings.enabled &&
          permission === "granted" && (
          <>
            {/* Daily Reminder */}
            <div style={card}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}>
                <div>
                  <div style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: t.heading,
                  }}>
                    📚 Daily Study Reminder
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: t.textSub,
                    marginTop: 4,
                  }}>
                    Remind me to study every day
                  </div>
                </div>

                {/* Toggle */}
                <div
                  onClick={() => onUpdateSettings(
                    "dailyReminder",
                    !settings.dailyReminder
                  )}
                  style={{
                    width: 48,
                    height: 26,
                    borderRadius: 13,
                    background: settings.dailyReminder
                      ? t.gold : t.border,
                    cursor: "pointer",
                    position: "relative",
                    transition: "background 0.2s",
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#fff",
                    position: "absolute",
                    top: 3,
                    left: settings.dailyReminder ? 25 : 3,
                    transition: "left 0.2s",
                  }} />
                </div>
              </div>

              {/* Reminder Time */}
              {settings.dailyReminder && (
                <>
                  <div style={{
                    fontSize: 13,
                    color: t.textSub,
                    marginBottom: 10,
                  }}>
                    Reminder Time:
                  </div>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns:
                      "1fr 1fr 1fr",
                    gap: 8,
                  }}>
                    {[8, 12, 14, 16, 18, 20].map(h => {
                      const ampm = h < 12 ? "AM" : "PM";
                      const hour = h > 12
                        ? h - 12 : h;
                      return (
                        <button
                          key={h}
                          onClick={() =>
                            onUpdateSettings(
                              "reminderHour", h
                            )
                          }
                          style={{
                            padding: "10px 6px",
                            borderRadius: 10,
                            border: `2px solid ${
                              settings.reminderHour === h
                                ? t.gold : t.border
                            }`,
                            background:
                              settings.reminderHour === h
                                ? `${t.gold}22`
                                : t.bgInner,
                            color:
                              settings.reminderHour === h
                                ? t.gold : t.textSub,
                            fontSize: 12,
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          {hour}:00 {ampm}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Streak Reminder */}
            <div style={card}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <div>
                  <div style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: t.heading,
                  }}>
                    🔥 Streak Reminder
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: t.textSub,
                    marginTop: 4,
                  }}>
                    Remind me to keep my streak
                  </div>
                </div>

                {/* Toggle */}
                <div
                  onClick={() => onUpdateSettings(
                    "streakReminder",
                    !settings.streakReminder
                  )}
                  style={{
                    width: 48,
                    height: 26,
                    borderRadius: 13,
                    background: settings.streakReminder
                      ? t.gold : t.border,
                    cursor: "pointer",
                    position: "relative",
                    transition: "background 0.2s",
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#fff",
                    position: "absolute",
                    top: 3,
                    left: settings.streakReminder
                      ? 25 : 3,
                    transition: "left 0.2s",
                  }} />
                </div>
              </div>
            </div>

          </>
        )}

        {/* Info Box */}
      <div style={{
  background: t.exBg,
  border: `1px solid ${t.exBorder}`,
  borderRadius: 12,
  padding: "14px 16px",
}}>
  <div style={{
    fontSize: 13,
    color: t.exText,
    lineHeight: 1.8,
  }}>
    📝 Notifications help you:{"\n"}
    🔥 Maintain your study streak{"\n"}
    📚 Study consistently every day{"\n"}
    🎯 Reach your JUPEB goals
  </div>
</div>

{/* iPhone notice */}
<div style={{
  background: t.keyBg,
  border: `1px solid ${t.keyBorder}`,
  borderRadius: 12,
  padding: "14px 16px",
  marginTop: 12,
}}>
  <div style={{
    fontSize: 13,
    color: t.keyText,
    lineHeight: 1.8,
  }}>
    🍎 iPhone users: Add StudyNaija
    to your Home Screen first, then
    open from there to enable
    notifications!
  </div>
</div>
      </div>
    </ScreenWrapper>
  );
}

NotificationSettings.propTypes = {
  onBack: PropTypes.func.isRequired,
  permission: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onRequestPermission: PropTypes.func.isRequired,
  onDisable: PropTypes.func.isRequired,
  onUpdateSettings: PropTypes.func.isRequired,
};
