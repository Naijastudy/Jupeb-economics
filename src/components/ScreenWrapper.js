import React from "react";
import PropTypes from "prop-types";
import { fadeIn } from "../styles/animations";
import { useApp } from "../context/AppContext";

export default function ScreenWrapper({ children, style }) {
  const { t } = useApp();

  return (
    <div style={{
      minHeight: "100vh",
      background: t.bg,
      fontFamily: "Georgia, serif",
      color: t.text,
      ...fadeIn,
      ...style,
    }}>
      {children}
    </div>
  );
}

ScreenWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};
