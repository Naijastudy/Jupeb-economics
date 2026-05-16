const themes = {
  dark: {
    // Base
    bg: "#111714",
    bgCard: "#1a2a1a",
    bgInner: "#0d1a0d",
    bgHeader: "linear-gradient(135deg,#1a3a1a,#0d2b0d)",

    // Borders
    border: "#2a3a2a",
    borderHover: "#c8a84b",

    // Text
    text: "#f0ece0",
    textSub: "#aab7aa",
    textMuted: "#888",

    // Accents (gold for dark)
    gold: "#c8a84b",
    goldSecondary: "#b89a3f",
    accent: "#c8a84b",       // alias for gold
    accentSecondary: "#b89a3f",

    heading: "#c8a84b",      // harmonized with gold accent

    // Buttons
    goldBtn: "#c8a84b",
    goldBtnText: "#0a0f0a",

    // Options
    optionBg: "#1e2e1e",
    optionText: "#c8c4b0",

    // Feedback states
    correctBg: "#1e4a1e",
    correctBorder: "#5cb85c",
    correctText: "#9be29b",

    wrongBg: "#4a1e1e",
    wrongBorder: "#dc3545",
    wrongText: "#ffb3b3",

    selectedBg: "#2a2416",
    selectedBorder: "#c8a84b",
    selectedText: "#f0ece0",

    expBg: "#0d2b0d",
    expBorder: "#5cb85c",
    expText: "#90c890",

    noteText: "#a8b8a8",
    tagColor: "#b89a3f",

    // Progress
    progressBg: "#1e2e1e",
    progressFill: "#c8a84b",

    // Hero / stats
    heroBg: "linear-gradient(135deg,#1e4d1e,#2d6a2d)",
    heroBorder: "#3a7a3a",
    heroText: "#b0c8b0",

    statBg: "#141f14",
    statBorder: "#2a3a2a",

    // Misc
    keyBg: "#2a2a00",
    keyText: "#ffe066",
    keyBorder: "#c8a84b44",

    exBg: "#0a2a0a",
    exText: "#90c890",
    exBorder: "#5cb85c44",

    // Accessibility & states
    focusOutline: "#c8a84b",
    disabledBg: "#2a3a2a",
    disabledText: "#777",
    shadow: "0 4px 12px rgba(0,0,0,0.3)",

    // Toggle UI
    toggleIcon: "🌙",
    toggleLabel: "Dark Mode",
  },

  light: {
    // Base
    bg: "#f5f0e8",
    bgCard: "#ffffff",
    bgInner: "#f0ebe0",
    bgHeader: "linear-gradient(135deg,#2a5c8a,#1a3a5c)",

    // Borders
    border: "#ddd8cc",
    borderHover: "#1a3a5c",

    // Text
    text: "#1a1a1a",
    textSub: "#555",
    textMuted: "#777",

    // Accents (now actual gold, matching dark)
    gold: "#c8a84b",
    goldSecondary: "#b89a3f",
    accent: "#c8a84b",
    accentSecondary: "#b89a3f",

    heading: "#1a3a5c",      // kept blue for light mode identity

    // Buttons
    goldBtn: "#1a3a5c",      // blue button (was goldBtn - kept as is to avoid breaking existing uses; but you may rename)
    goldBtnText: "#ffffff",

    // Options
    optionBg: "#f8f4ec",
    optionText: "#333",

    // Feedback states
    correctBg: "#d4edda",
    correctBorder: "#28a745",
    correctText: "#155724",

    wrongBg: "#f8d7da",
    wrongBorder: "#dc3545",
    wrongText: "#721c24",

    selectedBg: "#d6eaf8",
    selectedBorder: "#1a3a5c",
    selectedText: "#1a1a1a",

    expBg: "#d4edda",
    expBorder: "#28a745",
    expText: "#155724",

    noteText: "#444",
    tagColor: "#1a3a5c",

    // Progress
    progressBg: "#ddd8cc",
    progressFill: "#1a3a5c",

    // Hero / stats
    heroBg: "linear-gradient(135deg,#2a5c8a,#1a3a5c)",
    heroBorder: "#0d2b4a",
    heroText: "#c8e0f0",

    statBg: "#ffffff",
    statBorder: "#ddd8cc",

    // Misc
    keyBg: "#fff9cc",
    keyText: "#7a6000",
    keyBorder: "#ffe06688",

    exBg: "#d4edda",
    exText: "#155724",
    exBorder: "#28a74588",

    // Accessibility & states
    focusOutline: "#1a3a5c",
    disabledBg: "#e0dbd0",
    disabledText: "#999",
    shadow: "0 4px 12px rgba(0,0,0,0.08)",

    // Toggle UI
    toggleIcon: "☀️",
    toggleLabel: "Light Mode",
  },
};

export default themes;

/* const themes = {
  dark: {
    bg: "#111714",
    bgCard: "#1a2a1a",
    bgInner: "#0d1a0d",
    bgHeader: "linear-gradient(135deg,#1a3a1a,#0d2b0d)",
    border: "#2a3a2a",
    borderHover: "#c8a84b",

    text: "#f0ece0",
    textSub: "#aab7aa",
    textMuted: "#888",

    heading: "#7eb8e8",

    // refined accents
    gold: "#c8a84b",
    goldSecondary: "#b89a3f",

    goldBtn: "#c8a84b",
    goldBtnText: "#0a0f0a",

    optionBg: "#1e2e1e",
    optionText: "#c8c4b0",

    correctBg: "#1e4a1e",
    correctBorder: "#5cb85c",
    correctText: "#9be29b",

    wrongBg: "#4a1e1e",
    wrongBorder: "#dc3545",
    wrongText: "#ffb3b3",

    selectedBg: "#2a2416",
    selectedBorder: "#c8a84b",
    selectedText: "#f0ece0",

    expBg: "#0d2b0d",
    expBorder: "#5cb85c",
    expText: "#90c890",

    noteText: "#a8b8a8",
    tagColor: "#b89a3f",

    progressBg: "#1e2e1e",
    progressFill: "#c8a84b",

    heroBg: "linear-gradient(135deg,#1e4d1e,#2d6a2d)",
    heroBorder: "#3a7a3a",
    heroText: "#b0c8b0",

    statBg: "#141f14",
    statBorder: "#2a3a2a",

    keyBg: "#2a2a00",
    keyText: "#ffe066",
    keyBorder: "#c8a84b44",

    exBg: "#0a2a0a",
    exText: "#90c890",
    exBorder: "#5cb85c44",

    toggleIcon: "🌙",
    toggleLabel: "Dark Mode",
  },

  light: {
    bg: "#f5f0e8",
    bgCard: "#ffffff",
    bgInner: "#f0ebe0",

    bgHeader: "linear-gradient(135deg,#2a5c8a,#1a3a5c)",

    border: "#ddd8cc",
    borderHover: "#1a3a5c",

    text: "#1a1a1a",
    textSub: "#555",
    textMuted: "#777",

    heading: "#1a3a5c",

    gold: "#1a3a5c",
    goldSecondary: "#2a5c8a",

    goldBtn: "#1a3a5c",
    goldBtnText: "#ffffff",

    optionBg: "#f8f4ec",
    optionText: "#333",

    correctBg: "#d4edda",
    correctBorder: "#28a745",
    correctText: "#155724",

    wrongBg: "#f8d7da",
    wrongBorder: "#dc3545",
    wrongText: "#721c24",

    selectedBg: "#d6eaf8",
    selectedBorder: "#1a3a5c",
    selectedText: "#1a1a1a",

    expBg: "#d4edda",
    expBorder: "#28a745",
    expText: "#155724",

    noteText: "#444",

    tagColor: "#1a3a5c",

    progressBg: "#ddd8cc",
    progressFill: "#1a3a5c",

    heroBg: "linear-gradient(135deg,#2a5c8a,#1a3a5c)",
    heroBorder: "#0d2b4a",
    heroText: "#c8e0f0",

    statBg: "#ffffff",
    statBorder: "#ddd8cc",

    keyBg: "#fff9cc",
    keyText: "#7a6000",
    keyBorder: "#ffe06688",

    exBg: "#d4edda",
    exText: "#155724",
    exBorder: "#28a74588",

    toggleIcon: "☀️",
    toggleLabel: "Light Mode",
  },
};

export default themes;
*/
