export default function Header({ onBack, title, sub, t, onToggleTheme }) {
  return (
    <div
      style={{
        padding: "14px 16px",
        background: t.bgHeader,
        borderBottom: `1px solid ${t.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* LEFT: BACK BUTTON */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              border: "none",
              background: "transparent",
              fontSize: 18,
              cursor: "pointer",
              color: t.text,
            }}
          >
            ←
          </button>
        )}

        <div>
          <div style={{ fontSize: 16, fontWeight: "bold", color: t.heading }}>
            {title}
          </div>
          {sub && (
            <div style={{ fontSize: 11, color: t.textSub }}>
              {sub}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: THEME TOGGLE (optional) */}
      {onToggleTheme && (
        <button
          onClick={onToggleTheme}
          style={{
            border: `1px solid ${t.border}`,
            background: t.bgCard,
            borderRadius: 8,
            padding: "6px 10px",
            cursor: "pointer",
            fontSize: 12,
            color: t.text,
          }}
        >
          🌓
        </button>
      )}
    </div>
  );
                      }
