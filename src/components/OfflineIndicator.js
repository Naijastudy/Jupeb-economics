import React from "react";
import PropTypes from "prop-types";
import { useApp } from "../context/AppContext";

export default function OfflineIndicator({
  isOnline, wasOffline
}) {
  const { t } = useApp();

  // Back online message
  if (isOnline && wasOffline) {
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#16a34a",
        color: "#fff",
        padding: "10px 16px",
        textAlign: "center",
        fontSize: 13,
        fontWeight: "bold",
        fontFamily: "Georgia, serif",
        animation: "slideUp 0.3s ease forwards",
      }}>
        ✅ Back online!
      </div>
    );
  }

  // Offline message
  if (!isOnline) {
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#dc3545",
        color: "#fff",
        padding: "10px 16px",
        textAlign: "center",
        fontSize: 13,
        fontWeight: "bold",
        fontFamily: "Georgia, serif",
        animation: "slideUp 0.3s ease forwards",
      }}>
        📶 You are offline — using cached data
      </div>
    );
  }

  return null;
}

OfflineIndicator.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  wasOffline: PropTypes.bool.isRequired,
};
