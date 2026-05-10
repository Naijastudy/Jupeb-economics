import PropTypes from "prop-types";

export default function Header({
  onBack,
  title,
  sub,
  t,
  onToggleTheme,
  right
}) {
  return (
    <div
      style={{
        background: t.bgHeader,
        borderBottom: `2px solid ${t.gold}`,
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* BACK BUTTON */}
      {onBack && (
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: 22,
            cursor: "pointer",
            padding: 0,
          }}
        >
          ←
        </button>
      )}

      {/* TITLE */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 9,
            color: t.gold,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          StudyNaija
        </div>

        <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>
          {title}
        </div>

        {sub && (
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
            {sub}
          </div>
        )}
      </div>

      {/* RIGHT SLOT (optional custom UI) */}
      {right && <div>{right}</div>}

      {/* THEME TOGGLE (ONLY shows if provided) */}
      {onToggleTheme && (
        <button
          onClick={onToggleTheme}
          style={{
            background: "none",
            border: `1px solid ${t.gold}44`,
            borderRadius: 8,
            color: t.gold,
            fontSize: 16,
            cursor: "pointer",
            padding: "6px 10px",
          }}
        >
          {t.toggleIcon || "🌓"}
        </button>
      )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  sub: PropTypes.string,
  onBack: PropTypes.func,
  onToggleTheme: PropTypes.func,
  right: PropTypes.node,
  t: PropTypes.object.isRequired,
};
