export const makeStyles = (t) => ({

  // ── LAYOUT ──
  screen: {
    minHeight: "100vh",
    background: t.bg,
    fontFamily: "Georgia, serif",
    color: t.text,
  },

  // ── HEADER ──
  header: {
    background: t.bgHeader,
    borderBottom: `2px solid ${t.gold}`,
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  headerTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },

  headerSub: {
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
  },

  headerBrand: {
    fontSize: 9,
    color: t.gold,
    letterSpacing: 3,
    textTransform: "uppercase",
  },

  backBtn: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: 22,
    cursor: "pointer",
    padding: 0,
  },

  // ── CARDS ──
  card: {
    background: t.bgCard,
    border: `1px solid ${t.border}`,
    borderRadius: 16,
    padding: "18px 16px",
    marginBottom: 14,
  },

  // ── BUTTONS ──
  goldBtn: {
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
  },

  outlineBtn: {
    width: "100%",
    background: "transparent",
    border: `1px solid ${t.border}`,
    borderRadius: 12,
    color: t.textSub,
    fontSize: 13,
    padding: 12,
    cursor: "pointer",
  },

  // ── HIGHLIGHTS ──
  keyBox: {
    background: t.keyBg,
    border: `1px solid ${t.keyBorder}`,
    borderRadius: 12,
    padding: "14px 16px",
    marginBottom: 20,
  },

  keyText: {
    fontSize: 13,
    color: t.keyText,
    lineHeight: 1.8,
  },

  exBox: {
    background: t.exBg,
    border: `1px solid ${t.exBorder}`,
    borderRadius: 12,
    padding: "14px 16px",
    marginBottom: 20,
  },

  exText: {
    fontSize: 13,
    color: t.exText,
    lineHeight: 1.8,
  },

  // ── PROGRESS ──
  progressBar: {
    background: t.progressBg,
    borderRadius: 6,
    height: 5,
    marginBottom: 14,
  },

  progressFill: (pct) => ({
    background: t.progressFill,
    height: 5,
    borderRadius: 6,
    width: `${pct}%`,
    transition: "width 0.3s",
  }),

  // ── TAGS ──
  tag: {
    fontSize: 10,
    color: t.tagColor,
    letterSpacing: 2,
    marginBottom: 10,
  },

  // ── OPTIONS ──
  option: {
    background: t.optionBg,
    border: `1px solid ${t.border}`,
    borderRadius: 10,
    padding: "12px 14px",
    textAlign: "left",
    color: t.optionText,
    fontSize: 13,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  correctOption: {
    background: t.correctBg,
    border: `1px solid ${t.correctBorder}`,
    borderRadius: 10,
    padding: "12px 14px",
    color: t.correctText,
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  wrongOption: {
    background: t.wrongBg,
    border: `1px solid ${t.wrongBorder}`,
    borderRadius: 10,
    padding: "12px 14px",
    color: t.wrongText,
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  // ── EXPLANATION ──
  explanation: {
    marginTop: 14,
    background: t.expBg,
    borderRadius: 10,
    padding: 14,
    fontSize: 13,
    color: t.expText,
    lineHeight: 1.7,
    borderLeft: `3px solid ${t.correctBorder}`,
  },

  // ── NUMBER BADGE ──
  badge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: `${t.gold}22`,
    border: `1px solid ${t.gold}55`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    color: t.gold,
    fontWeight: "bold",
  },
});
