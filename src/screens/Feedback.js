import React from "react";
import Header from "../components/Header";

export default function Feedback({
  t, feedbackName, setFeedbackName, feedbackMessage, setFeedbackMessage,
  feedbackSending, feedbackSent, setFeedbackSent, feedbackError,
  onSend, onBack, goldBtn, card,
}) {
  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text }}>
      <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>Send Feedback</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Help us improve</div>
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        {feedbackSent ? (
          <div style={{ ...card, textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
            <div style={{ fontSize: 18, fontWeight: "bold", color: t.heading, marginBottom: 8 }}>Thank you!</div>
            <div style={{ fontSize: 13, color: t.textSub, marginBottom: 24, lineHeight: 1.8 }}>
              Your feedback has been received. We read every message and use it to improve StudyNaija.
            </div>
            <button onClick={() => setFeedbackSent(false)} style={goldBtn}>Send Another</button>
            <button onClick={onBack} style={{ ...goldBtn, background: "transparent", border: `1px solid ${t.border}`, color: t.textSub }}>Back</button>
          </div>
        ) : (
          <>
            <div style={{ background: t.exBg, border: `1px solid ${t.exBorder}`, borderRadius: 12, padding: "14px 16px", marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: t.exText, lineHeight: 1.8 }}>
                📝 Found a wrong answer? Want a new subject? Have a suggestion? Let us know!
              </div>
            </div>
            <div style={{ ...card }}>
              <div style={{ fontSize: 13, color: t.textSub, marginBottom: 8 }}>Your Name (optional)</div>
              <input value={feedbackName} onChange={e => setFeedbackName(e.target.value)}
                placeholder="e.g. Ayomide"
                style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${t.border}`, background: t.bgInner, color: t.text, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ ...card }}>
              <div style={{ fontSize: 13, color: t.textSub, marginBottom: 8 }}>Your Message *</div>
              <textarea value={feedbackMessage} onChange={e => setFeedbackMessage(e.target.value)}
                placeholder="Type your feedback, suggestion or report here..."
                rows={6}
                style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${t.border}`, background: t.bgInner, color: t.text, fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "Georgia, serif" }} />
            </div>
            {feedbackError && (
              <div style={{ background: t.wrongBg, border: `1px solid ${t.wrongBorder}`, borderRadius: 10, padding: "12px 14px", marginBottom: 14, fontSize: 13, color: t.wrongText }}>
                ⚠️ {feedbackError}
              </div>
            )}
            <button onClick={onSend} disabled={feedbackSending} style={{ ...goldBtn, opacity: feedbackSending ? 0.7 : 1 }}>
              {feedbackSending ? "Sending..." : "Send Feedback 📤"}
            </button>
          </>
        )}
      </div>
    </div>
  );
  }
