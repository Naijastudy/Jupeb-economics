window.onerror = function(msg, src, line, col, err) {
  // Extract the most specific error message
  let errorMessage = msg;
  let errorName = 'Error';
  let stackTrace = '';
  
  if (err) {
    // Use the actual Error object's message (more precise)
    errorName = err.name || 'Error';
    errorMessage = err.message || msg;
    stackTrace = err.stack || '';
    
    // Handle special cases for common ambiguous errors
    if (err.message === 'Script error.' || msg === 'Script error.') {
      errorMessage = 'Cross-origin script error. Add crossorigin="anonymous" and CORS headers.';
      stackTrace = 'Cannot retrieve stack trace due to CORS restrictions.';
    }
  }
  
  // Format with more detail and better readability
  document.body.innerHTML = `
    <div style="padding:20px;font-family:monospace;background:#1e1e1e;color:#d4d4d4;font-size:12px;word-break:break-all">
      <div style="color:#f48771;margin-bottom:15px;">
        <b>${errorName}:</b> ${escapeHtml(errorMessage)}
      </div>
      <div style="margin-bottom:5px;">
        <span style="color:#9cdcfe;">Location:</span> 
        <span style="color:#ce9178;">${src || 'unknown'}</span>
        <span style="color:#9cdcfe;"> at line</span> 
        <span style="color:#b5cea8;">${line || '?'}</span>
        <span style="color:#9cdcfe;">, column</span> 
        <span style="color:#b5cea8;">${col || '?'}</span>
      </div>
      ${stackTrace ? `
        <div style="margin-top:10px;">
          <div style="color:#9cdcfe;">Stack trace:</div>
          <pre style="margin:5px 0 0 0;color:#ce9178;overflow-x:auto;">${escapeHtml(stackTrace)}</pre>
        </div>
      ` : ''}
      ${!err ? `
        <div style="margin-top:10px;color:#f48771;">
          ⚠️ No Error object provided - consider wrapping code in try/catch
        </div>
      ` : ''}
    </div>
  `;
  
  // Also log to console with full detail
  console.error('[Global Error]', {
    name: errorName,
    message: errorMessage,
    source: src,
    line: line,
    column: col,
    stack: stackTrace,
    originalError: err
  });
  
  return false; // Let browser also log it
};

// Helper function to prevent XSS
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Enhanced version with better error capture
window.addEventListener('error', function(e) {
  if (e.error) {
    console.table({
      'Error Name': e.error.name,
      'Error Message': e.error.message,
      'Stack First Line': e.error.stack?.split('\n')[0],
      'File': e.filename,
      'Line': e.lineno,
      'Column': e.colno
    });
  }
});

// Also catch unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled Promise Rejection:', e.reason);
  // Optionally display it similarly
});
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import { AppProvider } from "./context/AppContext";
import GlobalStyles from "./components/GlobalStyles";
import * as serviceWorkerRegistration
  from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
 // <ErrorBoundary>
    <AppProvider>
      <GlobalStyles />
      <App />
    </AppProvider>
  //</ErrorBoundary>
);

// Register service worker for offline support
serviceWorkerRegistration.register({
  onSuccess: () => {
    console.log("App ready for offline use!");
  },
  onUpdate: (registration) => {
    // Tell SW to skip waiting and activate new version
    if (registration && registration.waiting) {
      registration.waiting.postMessage({
        type: "SKIP_WAITING"
      });
    }
    window.location.reload();
  },
});
