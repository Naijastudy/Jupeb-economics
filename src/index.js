window.onerror = function(msg, src, line, col, err) {
  let errorMessage = msg;
  let errorName = 'Error';
  let stackTrace = '';
  
  if (err) {
    errorName = err.name || 'Error';
    errorMessage = err.message || msg;
    stackTrace = err.stack || '';
    
    // Extract the ACTUAL file from stack trace
    const stackLines = stackTrace.split('\n');
    const firstStackLine = stackLines[1] || '';
    
    // Parse webpack/react stack trace format
    // Example: "at ComponentName (https://example.com/static/js/main.chunk.js:42:15)"
    // Or: "at ComponentName (webpack:///src/components/MyComponent.jsx:15:10)"
    const webpackMatch = firstStackLine.match(/\((.+?):(\d+):(\d+)\)/);
    const atMatch = firstStackLine.match(/at\s+.+?\s+\(?(.+?):(\d+):(\d+)\)?/);
    const simpleMatch = firstStackLine.match(/(.+?):(\d+):(\d+)/);
    
    let actualFile = src;
    let actualLine = line;
    let actualCol = col;
    
    if (webpackMatch || atMatch || simpleMatch) {
      const match = webpackMatch || atMatch || simpleMatch;
      actualFile = match[1];
      actualLine = parseInt(match[2]);
      actualCol = parseInt(match[3]);
      
      // Clean up webpack:// paths
      if (actualFile.startsWith('webpack://')) {
        actualFile = actualFile.replace('webpack:///', '').replace(/\?[^?]+$/, '');
      }
    }
    
    // Handle ambiguous errors
    if (err.message === 'Script error.' || msg === 'Script error.') {
      errorMessage = 'Cross-origin script error. Add crossorigin="anonymous" and CORS headers.';
      stackTrace = 'Cannot retrieve stack trace due to CORS restrictions.';
    }
    
    // Display with ACTUAL file info
    document.body.innerHTML = `
      <div style="padding:20px;font-family:monospace;background:#1e1e1e;color:#d4d4d4;font-size:12px;word-break:break-all">
        <div style="color:#f48771;margin-bottom:15px;">
          <b>${escapeHtml(errorName)}:</b> ${escapeHtml(errorMessage)}
        </div>
        <div style="margin-bottom:5px;background:#2d2d2d;padding:8px;border-left:3px solid #f48771;">
          <span style="color:#9cdcfe;">📍 Actual Source:</span><br/>
          <span style="color:#ce9178;font-weight:bold;">${escapeHtml(actualFile)}</span>
          <span style="color:#9cdcfe;"> at line</span> 
          <span style="color:#b5cea8;font-weight:bold;">${actualLine}</span>
          <span style="color:#9cdcfe;">, column</span> 
          <span style="color:#b5cea8;font-weight:bold;">${actualCol}</span>
        </div>
        <div style="margin-bottom:5px;opacity:0.7;">
          <span style="color:#9cdcfe;">Bundled File:</span> 
          <span style="color:#ce9178;">${escapeHtml(src || 'unknown')}</span>
          <span style="color:#9cdcfe;"> at line</span> 
          <span style="color:#b5cea8;">${line || '?'}</span>
        </div>
        ${stackTrace ? `
          <div style="margin-top:10px;">
            <div style="color:#9cdcfe;">Stack trace:</div>
            <pre style="margin:5px 0 0 0;color:#ce9178;overflow-x:auto;font-size:10px;">${escapeHtml(stackTrace)}</pre>
          </div>
        ` : ''}
        <button onclick="location.reload()" style="
          margin-top:15px;
          padding:5px 10px;
          background:#007acc;
          color:white;
          border:none;
          cursor:pointer;
          border-radius:3px;
        ">Reload App</button>
      </div>
    `;
    
    console.error('[Global Error]', {
      errorName,
      errorMessage,
      actualFile,
      actualLine,
      actualCol,
      bundledFile: src,
      bundledLine: line,
      fullStack: stackTrace
    });
  }
  
  return false;
};

// ✅ CRITICAL: Catch errors in async code and event handlers
window.addEventListener('error', function(e) {
  console.error('Window error event caught:', e.error);
  // Your handler might already catch this, but this is backup
  if (e.error && !e.error._handled) {
    e.error._handled = true;
    // Force display error if onerror missed it
    document.body.innerHTML = `
      <div style="padding:20px;font-family:monospace;background:#1e1e1e;color:#d4d4d4;">
        <b style="color:#f48771;">Caught by backup handler:</b><br/>
        <b>${e.error?.name || 'Error'}:</b> ${e.error?.message || msg}<br/>
        <pre>${e.error?.stack || 'No stack trace'}</pre>
      </div>
    `;
  }
});

// ✅ CRITICAL: Catch Promise rejections (common in React)
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled Promise Rejection:', e.reason);
  
  const error = e.reason;
  let errorMessage = error?.message || String(error);
  let stackTrace = error?.stack || '';
  
  // Parse stack trace to find actual file
  const stackLines = stackTrace.split('\n');
  const firstStackLine = stackLines[1] || '';
  const match = firstStackLine.match(/\(?(.+?):(\d+):(\d+)\)?/);
  
  let actualFile = 'unknown';
  let actualLine = '?';
  
  if (match) {
    actualFile = match[1];
    actualLine = match[2];
    if (actualFile.startsWith('webpack://')) {
      actualFile = actualFile.replace('webpack:///', '');
    }
  }
  
  document.body.innerHTML = `
    <div style="padding:20px;font-family:monospace;background:#1e1e1e;color:#d4d4d4;font-size:12px;">
      <div style="color:#ff9800;margin-bottom:15px;">
        <b>⚠️ Unhandled Promise Rejection:</b> ${escapeHtml(errorMessage)}
      </div>
      <div style="background:#2d2d2d;padding:8px;border-left:3px solid #ff9800;">
        <span style="color:#9cdcfe;">📍 Failed in:</span><br/>
        <span style="color:#ce9178;">${escapeHtml(actualFile)}</span>
        <span style="color:#9cdcfe;"> at line</span> 
        <span style="color:#b5cea8;">${actualLine}</span>
      </div>
      ${stackTrace ? `<pre style="font-size:10px;margin-top:10px;">${escapeHtml(stackTrace)}</pre>` : ''}
      <button onclick="location.reload()" style="margin-top:15px;padding:5px 10px;background:#007acc;color:white;border:none;cursor:pointer;">Reload</button>
    </div>
  `;
});

// Helper function
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// ✅ OPTIONAL: Test if your error handler works
setTimeout(() => {
  console.log('✅ Error handlers installed. Throw a test error in 2 seconds...');
}, 1000);

// Then your React code
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import GlobalStyles from "./components/GlobalStyles";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AppProvider>
    <GlobalStyles />
    <App />
  </AppProvider>
);

serviceWorkerRegistration.register({
  onSuccess: () => {
    console.log("App ready for offline use!");
  },
  onUpdate: (registration) => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
    window.location.reload();
  },
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
