import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.log("App error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          background: "#0a0f0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          padding: "20px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>😕</div>
          <div style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#f0ece0",
            marginBottom: 8
          }}>
            Something went wrong
          </div>
          <div style={{
            fontSize: 13,
            color: "#aab7aa",
            marginBottom: 24,
            lineHeight: 1.8
          }}>
            Don't worry, your progress is safe.{"\n"}
            Please reload the app.
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "#c8a84b",
              border: "none",
              borderRadius: 12,
              color: "#0a0f0a",
              fontSize: 14,
              fontWeight: "bold",
              padding: "14px 28px",
              cursor: "pointer",
              marginBottom: 12
            }}
          >
            🔄 Reload App
          </button>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              background: "transparent",
              border: "1px solid #2a3a2a",
              borderRadius: 12,
              color: "#aab7aa",
              fontSize: 13,
              padding: "12px 28px",
              cursor: "pointer"
            }}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
        }
