import React from "react";

export default function Profile({
  t, user, userScores, onLogin, onLogout, onBack, goldBtn, card,
}) {
  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "Georgia, serif", color: t.text }}>
      <div style={{ background: t.bgHeader, borderBottom: `2px solid ${t.gold}`, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: t.gold, letterSpacing: 3, textTransform: "uppercase" }}>StudyNaija</div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>My Profile</div>
          {user && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{user.displayName}</div>}
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        {!user ? (
          <div style={{ ...card, textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>👤</div>
            <div style={{ fontSize: 18, fontWeight: "bold", color: t.heading, marginBottom: 8 }}>Sign In to Save Scores</div>
            <div style={{ fontSize: 13, color: t.textSub, marginBottom: 24, lineHeight: 1.8 }}>
              Log in with Google to save your quiz scores and track your progress over time.
            </div>
            <button onClick={onLogin} style={{ ...goldBtn, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>🔵</span> Sign in with Google
            </button>
          </div>
        ) : (
          <>
            <div style={{ ...card, display: "flex", alignItems: "center", gap: 16 }}>
              <img src={user.photoURL} alt="profile" style={{ width: 56, height: 56, borderRadius: "50%", border: `2px solid ${t.gold}` }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: "bold", color: t.heading }}>{user.displayName}right={<span style={{ color: t.gold }}>⭐</span></div>
                <div style={{ fontSize: 12, color: t.textSub, marginTop: 4 }}>{user.email}</div>
                <div style={{ fontSize: 11, color: t.gold, marginTop: 4 }}>{userScores.length} attempts recorded</div>
              </div>
            </div>

            {userScores.length > 0 && (
              <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                <div style={{ flex: 1, background: t.correctBg, border: `1px solid ${t.correctBorder}`, borderRadius: 12, padding: "14px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: "bold", color: t.correctBorder }}>
                    {Math.round(userScores.reduce((a, s) => a + s.pct, 0) / userScores.length)}%
                  </div>
                  <div style={{ fontSize: 11, color: t.correctText }}>Average</div>
                </div>
                <div style={{ flex: 1, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 12, padding: "14px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: "bold", color: t.gold }}>
                    {Math.max(...userScores.map(s => s.pct))}%
                  </div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>Best</div>
                </div>
                <div style={{ flex: 1, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 12, padding: "14px 10px", textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: "bold", color: t.gold }}>{userScores.length}</div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>Attempts</div>
                </div>
              </div>
            )}

            <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading, marginBottom: 12 }}>Score History</div>
            {userScores.length === 0 ? (
              <div style={{ ...card, textAlign: "center", color: t.textMuted, padding: "30px" }}>
                No scores yet. Take a CBT or Exam to record your first score!
              </div>
            ) : (
              userScores.map((s) => (
                <div key={s.id} style={{ ...card, padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: "bold", color: t.heading }}>{s.mode} — {s.subject}</div>
                      <div style={{ fontSize: 11, color: t.textMuted, marginTop: 4 }}>
                        {s.score}/{s.total} correct · {s.timestamp?.toDate().toLocaleDateString("en-NG") || "Recent"}
                      </div>
                    </div>
                    <div style={{ fontSize: 20, fontWeight: "bold", color: s.pct >= 70 ? t.correctBorder : s.pct >= 50 ? t.gold : t.wrongBorder }}>{s.pct}%</div>
                  </div>
                  <div style={{ background: t.progressBg, borderRadius: 6, height: 4, marginTop: 10 }}>
                    <div style={{ background: s.pct >= 70 ? t.correctBorder : s.pct >= 50 ? t.gold : t.wrongBorder, height: 4, borderRadius: 6, width: `${s.pct}%` }} />
                  </div>
                </div>
              ))
            )}
            <button onClick={onLogout} style={{ width: "100%", background: "transparent", border: `1px solid ${t.wrongBorder}`, borderRadius: 12, color: t.wrongBorder, fontSize: 13, fontWeight: "bold", padding: 14, cursor: "pointer", marginTop: 8 }}>
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
          }
