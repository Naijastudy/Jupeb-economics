import { createContext, useContext, useState, useEffect } from "react";
import themes from "../themes";

const AppContext = createContext();

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function AppProvider({ children }) {
  const [themeKey, setThemeKey] = useState(
    () => localStorage.getItem("theme") || "system"
  );

  const actualTheme = themeKey === "system" ? getSystemTheme() : themeKey;
  const t = themes[actualTheme];

  const toggleTheme = () =>
    setThemeKey((k) => (k === "dark" ? "light" : "dark"));

  // Persist theme
  useEffect(() => {
    localStorage.setItem("theme", themeKey);
  }, [themeKey]);

  // System theme listener
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if (themeKey === "system") setThemeKey("system");
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [themeKey]);

  // Shared styles
  const card = {
    background: t.bgCard,
    border: `1px solid ${t.border}`,
    borderRadius: 16,
    padding: "18px 16px",
    marginBottom: 14,
  };

  const goldBtn = {
    width: "100%",
    background: t.goldBtn,
    border: "none",
    borderRadius: 12,
    color: t.goldBtnText,
    fontSize: 14,
    fontWeight: "bold",
    padding: 14,
    cursor: "pointer",
    display: "block",
    marginBottom: 10,
  };

  return (
    <AppContext.Provider value={{
      t, themeKey, setThemeKey,
      toggleTheme, card, goldBtn
    }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for easy access
export function useApp() {
  return useContext(AppContext);
      }
