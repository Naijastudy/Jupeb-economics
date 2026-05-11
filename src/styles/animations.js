// ── TRANSITIONS ──
export const transitions = {
  smooth: "all 0.2s ease",
  fast: "all 0.1s ease",
  slow: "all 0.4s ease",
  spring: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
};

// ── SCREEN FADE ──
export const fadeIn = {
  animation: "fadeIn 0.3s ease forwards",
};

export const slideUp = {
  animation: "slideUp 0.3s ease forwards",
};

export const slideIn = {
  animation: "slideIn 0.3s ease forwards",
};

// ── KEYFRAMES ──
export const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%   { opacity: 1; }
    50%  { opacity: 0.5; }
    100% { opacity: 1; }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-8px); }
  }

  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }
`;
