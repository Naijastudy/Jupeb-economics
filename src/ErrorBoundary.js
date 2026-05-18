import React from "react";


const SUPPORT_EMAIL = "naijastudy.support@gmail.com"; 


const getEnvironment = () => {
  const hostname = window.location.hostname;
  

  if (hostname.includes('--') || hostname.includes('-')) {
    return 'preview';
  }
  
  // Check for localhost
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'development';
  }
  
  // Check for Firebase default domain
  if (hostname.includes('web.app') || hostname.includes('firebaseapp.com')) {
    return 'production';
  }
  
  // Custom domain 
  if (hostname === 'studynaija.vercel.app' || hostname === 'www.studynaija.vercel.app') {
    return 'production';
  }
  
  return 'production';
};

const isDevelopment = getEnvironment() === 'development';
const isPreview = getEnvironment() === 'preview';
const isProduction = getEnvironment() === 'production';

export default class ErrorBoundary extends React.Component {
  state = { 
    hasError: false, 
    error: null,
    errorType: null,
    recoveryAttempts: 0,
    showDetails: false
  };

  static getDerivedStateFromError(error) {
    let errorType = "unknown";
    const message = error.message?.toLowerCase() || "";
    
    if (message.includes("network") || message.includes("fetch") || message.includes("offline")) {
      errorType = "network";
    } else if (message.includes("firebase") || message.includes("firestore")) {
      errorType = "firebase";
    } else if (message.includes("permission") || message.includes("unauthorized")) {
      errorType = "permission";
    } else if (message.includes("undefined") || message.includes("null") || message.includes("cannot read")) {
      errorType = "data";
    } else if (message.includes("chunk") || message.includes("loading")) {
      errorType = "chunk";
    }
    
    return { 
      hasError: true, 
      error,
      errorType
    };
  }

  componentDidCatch(error, info) {
    console.error("App error:", error, info);
    this.logError(error, info);
  }

  async logError(error, info) {
    try {
      const errorReport = {
        message: error.message,
        stack: error.stack?.split('\n').slice(0, 5).join('\n'),
        componentStack: info.componentStack?.split('\n').slice(0, 5).join('\n'),
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        environment: getEnvironment()
      };

      // Store in localStorage for debugging
      const errors = JSON.parse(localStorage.getItem('app_errors') || '[]');
      errors.push(errorReport);
      while (errors.length > 10) errors.shift();
      localStorage.setItem('app_errors', JSON.stringify(errors));
      
      // Firebase Analytics
      if (isProduction && window.firebase) {
        const { db } = await import('./firebase');
        const { collection, addDoc } = await import('firebase/firestore');
        await addDoc(collection(db, 'error_logs'), errorReport).catch(() => {});
      }
    } catch (e) {
      console.log("Error logging failed:", e);
    }
  }

  handleReload = () => {
    try {
      const theme = localStorage.getItem('theme');
      const user = localStorage.getItem('user');
      
      localStorage.clear();
      sessionStorage.clear();
      
      if (theme) localStorage.setItem('theme', theme);
      if (user) localStorage.setItem('user', user);
      
      sessionStorage.setItem('recoveringFromError', 'true');
    } catch (e) {
      console.log("Clear failed:", e);
    }
    
    window.location.href = '/';
  };

  handleRecovery = () => {
    const { errorType, recoveryAttempts } = this.state;
    
    switch(errorType) {
      case "network":
        this.setState({ hasError: false, error: null });
        if (this.props.onNetworkRecovery) this.props.onNetworkRecovery();
        break;
        
      case "chunk":
        this.handleReload();
        break;
        
      case "firebase":
        if (recoveryAttempts < 2) {
          this.setState({ 
            recoveryAttempts: recoveryAttempts + 1, 
            hasError: false, 
            error: null 
          });
          if (this.props.onFirebaseRecovery) this.props.onFirebaseRecovery();
        } else {
          alert("Still having connection issues. Please check your internet and try reloading.");
        }
        break;
        
      default:
        if (recoveryAttempts === 0) {
          this.setState({ recoveryAttempts: 1, hasError: false, error: null });
        } else {
          this.handleReload();
        }
    }
  };

  toggleDetails = () => {
    this.setState({ showDetails: !this.state.showDetails });
  };

  copyErrorToClipboard = () => {
    const { error } = this.state;
    const errorText = `Error: ${error?.message}\n\nPlease describe what you were doing:\n\nTechnical details:\n${error?.stack}`;
    navigator.clipboard.writeText(errorText);
    alert("Error details copied! Please paste them in your email.");
  };

  render() {
    if (this.state.hasError) {
      const { errorType, error, showDetails } = this.state;
      
      const getErrorConfig = () => {
        switch(errorType) {
          case "network":
            return {
              icon: "🌐",
              title: "Connection Issue",
              message: "Having trouble connecting to our servers.",
              advice: "Check your internet connection and try again.",
              actionText: "Retry Connection"
            };
          case "chunk":
            return {
              icon: "📦",
              title: "Update Available",
              message: "The app was just updated!",
              advice: "A quick reload will get you the latest version.",
              actionText: "Reload to Update"
            };
          case "firebase":
            return {
              icon: "🔥",
              title: "Service Unavailable",
              message: "Study servers are temporarily unavailable.",
              advice: "This is usually temporary. Please wait a moment.",
              actionText: "Retry Connection"
            };
          case "permission":
            return {
              icon: "🔒",
              title: "Access Issue",
              message: "We can't access some features right now.",
              advice: "Try logging out and back in.",
              actionText: "Try to Recover"
            };
          default:
            return {
              icon: "😕",
              title: "Something Went Wrong",
              message: "The app encountered an unexpected issue.",
              advice: "Try reloading the app.",
              actionText: "Try to Recover"
            };
        }
      };
      
      const config = getErrorConfig();
      
      return (
        <div style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0a0f0a 0%, #1a2a1a 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Georgia', serif",
          padding: "20px",
          textAlign: "center"
        }}>
          <div style={{
            maxWidth: 500,
            width: "100%",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: 24,
            padding: "40px 32px",
            border: "1px solid rgba(200,168,75,0.2)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
          }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>{config.icon}</div>
            
            <div style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#f0ece0",
              marginBottom: 12
            }}>
              {config.title}
            </div>
            
            <div style={{
              fontSize: 16,
              color: "#c8a84b",
              marginBottom: 12
            }}>
              {config.message}
            </div>
            
            <div style={{
              fontSize: 14,
              color: "#aab7aa",
              marginBottom: 32,
              lineHeight: 1.6
            }}>
              {config.advice}
            </div>

            {/* Show technical details in development/preview only */}
            {(isDevelopment || isPreview) && (
              <>
                <button
                  onClick={this.toggleDetails}
                  style={{
                    background: "transparent",
                    border: "1px solid #4a5a4a",
                    borderRadius: 8,
                    color: "#8a9a8a",
                    fontSize: 12,
                    padding: "6px 12px",
                    cursor: "pointer",
                    marginBottom: 16
                  }}
                >
                  {showDetails ? "Hide Technical Details" : "Show Technical Details"}
                </button>
                
                {showDetails && error && (
                  <div style={{
                    fontSize: 11,
                    color: "#dc3545",
                    background: "#1a0000",
                    border: "1px solid #dc3545",
                    borderRadius: 10,
                    padding: "12px 16px",
                    marginBottom: 16,
                    textAlign: "left",
                    overflowX: "auto"
                  }}>
                    <strong>Error:</strong> {error.message}
                    <details style={{ marginTop: 8 }}>
                      <summary style={{ cursor: "pointer", color: "#aab7aa" }}>Stack trace</summary>
                      <pre style={{ marginTop: 8, fontSize: 10, overflowX: "auto" }}>
                        {error.stack}
                      </pre>
                    </details>
                  </div>
                )}
              </>
            )}
            
            {/* Primary Action Button */}
            <button
              onClick={config.actionText === "Reload to Update" ? this.handleReload : this.handleRecovery}
              style={{
                background: "#c8a84b",
                border: "none",
                borderRadius: 12,
                color: "#0a0f0a",
                fontSize: 16,
                fontWeight: "bold",
                padding: "14px 28px",
                cursor: "pointer",
                marginBottom: 12,
                width: "100%",
                transition: "transform 0.2s, background 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#d4b85c"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#c8a84b"}
            >
              {config.actionText}
            </button>
            
            {/* Secondary Options */}
            <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
              <button
                onClick={this.handleReload}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "1px solid #4a5a4a",
                  borderRadius: 12,
                  color: "#aab7aa",
                  fontSize: 13,
                  padding: "10px",
                  cursor: "pointer"
                }}
              >
                🔄 Full Reload
              </button>
              
              <button
                onClick={this.copyErrorToClipboard}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "1px solid #4a5a4a",
                  borderRadius: 12,
                  color: "#aab7aa",
                  fontSize: 13,
                  padding: "10px",
                  cursor: "pointer"
                }}
              >
                📋 Copy Error
              </button>
            </div>
            
            {/* Support Section */}
            <div style={{
              borderTop: "1px solid rgba(200,168,75,0.2)",
              paddingTop: 24,
              marginTop: 8
            }}>
              <div style={{
                fontSize: 12,
                color: "#6a7a6a",
                marginBottom: 8
              }}>
                Need help?
              </div>
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=StudyNaija%20Error%20Report&body=Please%20describe%20what%20you%20were%20doing%3A%0A%0A%0A%0AError%20details%3A%20${encodeURIComponent(error?.message || 'See console for details')}`}
                style={{
                  color: "#c8a84b",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: "500"
                }}
              >
                📧 Contact Support
              </a>
              
              <div style={{
                fontSize: 10,
                color: "#4a5a4a",
                marginTop: 16
              }}>
                Environment: {getEnvironment()} • 
                Error ID: {Math.random().toString(36).substr(2, 6)}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
