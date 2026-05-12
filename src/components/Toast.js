import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const COLORS = {
  success: { bg: "#16a34a", border: "#15803d", icon: "✅" },
  error:   { bg: "#dc3545", border: "#b91c1c", icon: "❌" },
  warning: { bg: "#f59e0b", border: "#d97706", icon: "⚠️" },
  info:    { bg: "#2563eb", border: "#1d4ed8", icon: "ℹ️" },
};

export default function Toast({ toast, onHide }) {
  const [visible, setVisible] = useState(false);

  // animate in when toast appears, animate out before hiding
  useEffect(() => {
    if (toast) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [toast]);

  if (!toast) return null;

  const style = COLORS[toast.type] || COLORS.info;

  return (
    <div
      onClick={onHide}
      style={{
        position: "fixed",
        top: 70,                         
        left: "50%",
        transform: `translateX(-50%) translateY(${visible ? "0" : "-20px"})`,
        zIndex: 9999,
        background: style.bg,
        border: `1px solid ${style.border}`,
        borderRadius: 14,
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        maxWidth: "calc(100vw - 32px)",
        width: "max-content",
        boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease, transform 0.25s ease",
        fontFamily: "Georgia, serif",
      }}
    >
      <span style={{ fontSize: 18, flexShrink: 0 }}>{style.icon}</span>
      <span style={{ fontSize: 13, fontWeight: "bold", color: "#fff", lineHeight: 1.4 }}>
        {toast.message}
      </span>
    </div>
  );
}

Toast.propTypes = {
  toast: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  }),
  onHide: PropTypes.func.isRequired,
};
