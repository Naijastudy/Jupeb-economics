import React, { useState } from "react";
import PropTypes from "prop-types";
import { transitions } from "../styles/animations";

export default function AnimatedButton({
  onClick, style, children,
  disabled, scaleDown
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        ...style,
        transition: transitions.spring,
        transform: pressed && !disabled
          ? `scale(${scaleDown || 0.96})`
          : "scale(1)",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );
}

AnimatedButton.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  scaleDown: PropTypes.number,
};
