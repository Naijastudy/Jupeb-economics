import Header from "../components/Header"; // adjust path if needed

export default function Settings({
  t,
  goBack,
  goTo,
  user,
  themeKey,
  setThemeKey,
  goldBtn,
  toggleTheme,
}) {

  const wrap = {
    minHeight: "100vh",
    background: t.bg,
    fontFamily: "Georgia, serif",
    color: t.text,
  };

  const card = {
    background: t.bgCard,
    border: `1px solid ${t.border}`,
    borderRadius: 16,
    padding: "18px 16px",
    marginBottom: 14,
  };

  return (
    <div style={wrap}>
      <Header
  onBack={goBack}
  title="Settings"
  t={t}
  onToggleTheme={toggleTheme}
/>
      <div style={{ padding: 16 }}>

        {/* PROFILE CARD */}
        <div
          onClick={() => goTo("profile")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: 14,
            borderRadius: 12,
            border: "1px solid #c8a84b44",
            marginBottom: 16,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              overflow: "hidden",
              background: t.exBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: t.keyText,
            }}
          >
            {user ? (
              <img src={user.photoURL} style={{ width: "100%", height: "100%" }} />
            ) : (
              "👤"
            )}
          </div>

          <div>
            <div style={{ color: t.heading, fontSize: 17 }}>
              {user ? "My Account" : "Guest User"}
            </div>
            <div style={{ color: t.text, fontSize: 13 }}>
              Tap to view profile
            </div>
          </div>
        </div>

        {/* ACCOUNT */}
        <div style={{ background: t.exBg, borderRadius: 12, padding: 12, marginBottom: 12 }}>
          <div style={{ color: t.heading, fontSize: 15, marginBottom: 8 }}>
            ACCOUNT
          </div>

          <div
            onClick={() => goTo("login")}
            style={{ padding: 10, color: t.text, cursor: "pointer", fontSize: 13 }}
          >
            Log in
          </div>
        </div>

        {/* SUPPORT */}
        <div style={{ background: t.exBg, borderRadius: 12, padding: 12, marginBottom: 12 }}>
          <div style={{ color: t.heading, fontSize: 15, marginBottom: 8 }}>
            SUPPORT
          </div>

          <button
            onClick={() => goTo("feedback")}
            style={{ ...goldBtn, marginTop: 8 }}
          >
            📤 Send Feedback / Report Issue
          </button>
        </div>

        {/* ABOUT */}
        <div style={{ background: t.exBg, borderRadius: 12, padding: 12, marginBottom: 16 }}>
          <div style={{ color: t.heading, fontSize: 13, marginBottom: 8 }}>
            ABOUT
          </div>

          <div
            onClick={() => goTo("about")}
            style={{ padding: 10, color: t.text, cursor: "pointer", fontSize: 13 }}
          >
            About StudyNaija
          </div>
        </div>

        {/* DISPLAY MODE */}
        <div style={card}>
          <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading, marginBottom: 16 }}>
            Display Mode
          </div> <div style={{ fontSize: 12, color: t.textSub, marginBottom: 12 }}>
Current: <span style={{ color: t.gold }}>
  {themeKey === "system" ? "Auto" : themeKey}
</span></div> 
          <div style={{ display: "flex", gap: 12 }}>
            {["system", "dark", "light"].map(mode => (
              <button
              
                key={mode}
                onClick={() => setThemeKey(mode)}
                style={{
                  flex: 1,
                  padding: "20px 10px",
                  borderRadius: 14,
                  cursor: "pointer",
                  textAlign: "center",
                  background:
                    
                    themeKey === mode
                      ? mode === "dark"
                        ? "#1a2a1a"
                        : "#e8f0f8"
                      : t.bgInner,
                  border:
                    themeKey === mode
                      ? `2px solid ${t.gold}`
                      : `1px solid ${t.border}`,
                  color: t.text,
                }}
              >
                <div style={{ fontSize: 30, marginBottom: 8 }}>
                 {mode === "system" ? "📱" : mode === "dark" ? "🌙" : "☀️"}</div>
                <div style={{ fontSize: 13, fontWeight: "bold" }}>
                  {mode === "dark" ? "Night Mode" : "Day Mode"}
                </div>
                {themeKey === mode && (
                  <div style={{ fontSize: 10, color: t.gold, marginTop: 6 }}>
                    ✓ Active
                  </div>
                )}
                  {mode === "system"
  ? "Auto (System)"
  : mode === "dark"
  ? "Night Mode"
  : "Day Mode"}
              </button>
            ))}
          </div>
        </div>

        {/* THEME PREVIEW */}
        <div style={card}>
          <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading, marginBottom: 12 }}>
            Theme Preview
          </div>

          <div
            style={{
              background: t.keyBg,
              border: `1px solid ${t.keyBorder}`,
              borderRadius: 8,
              padding: "10px 12px",
              marginBottom: 10,
              fontSize: 13,
              color: t.keyText,
            }}
          >
            🔑 Key Point — Yellow highlight
          </div>

          <div
            style={{
              background: t.exBg,
              border: `1px solid ${t.exBorder}`,
              borderRadius: 8,
              padding: "10px 12px",
              fontSize: 13,
              color: t.exText,
            }}
          >
            📝 Explanation — Green highlight
          </div>
        </div>

      </div>
    </div>
  );
    }
