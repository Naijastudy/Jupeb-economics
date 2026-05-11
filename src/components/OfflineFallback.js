import React from "react";
import PropTypes from "prop-types";
import { useApp } from "../context/AppContext";

export default function OfflineFallback({ onRetry }) {
  const { t, goldBtn } = useApp();

  return (
    <div style={{
      minHeight: "100vh",
      background: t.bg,
      fontFamily: "Georgia, serif",
      color: t.text,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      textAlign: "center",
    }}>

      {/* Icon */}
      <div style={{
        fontSize: 72,
        marginBottom: 24,
        animation: "bounce 1s infinite",
      }}>
        📶
      </div>

      {/* Title */}
      <div style={{
        fontSize: 22,
        fontWeight: "bold",
        color: t.heading,
        marginBottom: 12,
      }}>
        You're Offline
      </div>

      {/* Message */}
      <div style={{
        fontSize: 14,
        color: t.textSub,
        lineHeight: 1.8,
        marginBottom: 32,
        maxWidth: 280,
      }}>
        No internet connection detected.
        Connect to the internet to load
        fresh questions and notes.
      </div>

      {/* Cached data notice */}
      <div style={{
        background: t.keyBg,
        border: `1px solid ${t.keyBorder}`,
        borderRadius: 12,
        padding: "14px 16px",
        marginBottom: 32,
        maxWidth: 300,
        width: "100%",
      }}>
        <div style={{
          fontSize: 13,
          color: t.keyText,
          lineHeight: 1.8,
        }}>
          🔑 Previously loaded questions
          are still available! Go back
          and continue studying.
        </div>
      </div>

      {/* Retry button */}
      <button
        onClick={onRetry}
        style={{
          ...goldBtn,
          maxWidth: 300,
        }}
      >
        🔄 Try Again
      </button>
    </div>
  );
}

OfflineFallback.propTypes = {
  onRetry: PropTypes.func.isRequired,
};
