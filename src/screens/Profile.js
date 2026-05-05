import Header from "../components/Header";

export default function Profile({
  t,
  goBack,
  user,
  userScores,
  handleGoogleLogin,
  handleLogout,
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
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
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
    <div style={wrap}>
     <Header
  onBack={goBack}
  title="My Profile"
  sub={user?.displayName}
  t={t}
  right={<span style={{ color: t.gold }}>⭐</span>}
/>
      <div style={{ padding: 16 }}>

        {/* NOT LOGGED IN */}
        {!user ? (
          <div style={{ ...card, textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>👤</div>
            <div style={{ fontSize: 18, fontWeight: "bold", color: t.heading, marginBottom: 8 }}>
              Sign In to Save Scores
            </div>
            <div style={{ fontSize: 13, color: t.textSub, marginBottom: 24, lineHeight: 1.8 }}>
              Log in with Google to save your quiz scores and track your progress over time.
            </div>

            <button onClick={handleGoogleLogin} style={goldBtn}>
              🔵 Sign in with Google
            </button>
          </div>
        ) : (
          <>
            {/* USER INFO */}
            <div
              style={{
                background: t.bgCard,
                border: `1px solid ${t.border}`,
                borderRadius: 12,
                padding: 12,
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <img
                src={user.photoURL}
                alt="profile"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  border: `2px solid ${t.gold}`,
                }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: "bold", color: t.heading }}>
                  {user.displayName}
                </div>
                <div style={{ fontSize: 12, color: t.textSub, marginTop: 4 }}>
                  {user.email}
                </div>
                <div style={{ fontSize: 11, color: t.gold, marginTop: 4 }}>
                  {userScores.length} attempts recorded
                </div>
              </div>
            </div>

            {/* STATS */}
            {userScores.length > 0 && (
              <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                <div style={{ flex: 1, background: t.correctBg, border: `1px solid ${t.correctBorder}`, borderRadius: 12, padding: 14, textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: "bold", color: t.correctBorder }}>
                    {Math.round(userScores.reduce((a, s) => a + s.pct, 0) / userScores.length)}
                    %
                  </div>
                  <div style={{ fontSize: 11, color: t.correctText }}>Average</div>
                </div>

                <div style={{ flex: 1, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 12, padding: 14, textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: "bold", color: t.gold }}>
                    {Math.max(...userScores.map(s => s.pct))}
                    %
                  </div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>Best</div>
                </div>

                <div style={{ flex: 1, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 12, padding: 14, textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: "bold", color: t.gold }}>
                    {userScores.length}
                  </div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>Attempts</div>
                </div>
              </div>
            )}

            {/* HISTORY */}
            <div style={{ fontSize: 14, fontWeight: "bold", color: t.heading, marginBottom: 12 }}>
              Score History
            </div>

            {userScores.length === 0 ? (
              <div style={card}>
                No scores yet. Take a CBT or Exam to start tracking progress.
              </div>
            ) : (
              userScores.map((s) => (
                <div key={s.id} style={card}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: "bold" }}>
                        {s.mode} — {s.subject}
                      </div>
                      <div style={{ fontSize: 11, color: t.textMuted }}>
                        {s.score}/{s.total}
                      </div>
                    </div>

                    <div style={{ fontSize: 18, fontWeight: "bold", color: t.gold }}>
                      {s.pct}%
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* LOGOUT */}
            <button onClick={handleLogout} style={{ ...goldBtn, background: "transparent", border: `1px solid ${t.wrongBorder}`, color: t.wrongBorder }}>
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
  }
