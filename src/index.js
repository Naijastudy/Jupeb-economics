window.onerror = function(msg, src, line, col, err) {
  let errorMessage = msg;
  let errorName = 'Error';
  let stackTrace = '';
  
  if (err) {
    errorName = err.name || 'Error';
    errorMessage = err.message || msg;
    stackTrace = err.stack || '';
    
    // SOURCE MAP SUPPORT: Enable original file names
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      // This helps React DevTools map errors
      console.log('React DevTools detected - source maps active');
    }
    
    // Better parsing for source-mapped stacks
    const stackLines = stackTrace.split('\n');
    
    // Find the first line that points to your source code (not node_modules or webpack internals)
    let actualFile = src;
    let actualLine = line;
    let actualCol = col;
    
    for (let i = 1; i < stackLines.length; i++) {
      const stackLine = stackLines[i];
      
      // Look for .jsx, .tsx, .js, .ts files in your src folder
      const srcMatch = stackLine.match(/\(?(?:webpack:\/\/\/)?(.+?\.(?:jsx?|tsx?|mjs)):(\d+):(\d+)\)?/);
      const simpleMatch = stackLine.match(/\(?(.+?):(\d+):(\d+)\)?/);
      const match = srcMatch || simpleMatch;
      
      if (match) {
        let file = match[1];
        const lineNum = parseInt(match[2]);
        const colNum = parseInt(match[3]);
        
        // Clean up webpack paths
        if (file.startsWith('webpack://')) {
          file = file.replace('webpack:///', '').replace(/^\w+\.\/src/, 'src');
        }
        
        // Filter out node_modules and webpack runtime
        if (!file.includes('node_modules') && 
            !file.includes('webpack/bootstrap') && 
            !file.includes('react-dom') &&
            file.includes('/src/')) {
          actualFile = file;
          actualLine = lineNum;
          actualCol = colNum;
          break; // Found your source file
        }
      }
    }
    
    // Handle ambiguous errors
    if (err.message === 'Script error.' || msg === 'Script error.') {
      errorMessage = 'Cross-origin script error. Add crossorigin="anonymous" to script tags.';
      stackTrace = 'Cannot retrieve stack trace due to CORS restrictions.';
    }
    
    // Display with source-mapped file info
    document.body.innerHTML = `
      <div style="padding:20px;font-family:monospace;background:#1e1e1e;color:#d4d4d4;font-size:12px;word-break:break-all">
        <div style="color:#f48771;margin-bottom:15px;">
          <b>${escapeHtml(errorName)}:</b> ${escapeHtml(errorMessage)}
        </div>
        <div style="margin-bottom:5px;background:#2d2d2d;padding:8px;border-left:3px solid #f48771;">
          <span style="color:#9cdcfe;">📍 Source file (from source maps):</span><br/>
          <span style="color:#ce9178;font-weight:bold;font-size:14px;">${escapeHtml(actualFile)}</span>
          <span style="color:#9cdcfe;"> at line</span> 
          <span style="color:#b5cea8;font-weight:bold;">${actualLine}</span>
          <span style="color:#9cdcfe;">, column</span> 
          <span style="color:#b5cea8;font-weight:bold;">${actualCol}</span>
        </div>
        ${src !== actualFile ? `
          <div style="margin-bottom:5px;opacity:0.6;font-size:11px;">
            <span style="color:#9cdcfe;">📦 Bundled file:</span> 
            <span style="color:#ce9178;">${escapeHtml(src || 'unknown')}</span>
            <span style="color:#9cdcfe;"> at line</span> 
            <span style="color:#b5cea8;">${line || '?'}</span>
          </div>
        ` : ''}
        ${stackTrace ? `
          <div style="margin-top:10px;">
            <div style="color:#9cdcfe;">Stack trace:</div>
            <pre style="margin:5px 0 0 0;color:#ce9178;overflow-x:auto;font-size:10px;max-height:300px;">${escapeHtml(stackTrace)}</pre>
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
    
    console.groupCollapsed(`🔴 ${errorName}: ${errorMessage}`);
    console.log('Source file:', actualFile, `(${actualLine}:${actualCol})`);
    console.log('Stack trace:', stackTrace);
    console.groupEnd();
  }
  
  return false;
};

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Also catch unhandled rejections with source map support
window.addEventListener('unhandledrejection', function(e) {
  const error = e.reason;
  if (error && error.stack) {
    console.error('Unhandled rejection with stack:', error.stack);
    
    // Parse the stack for source file
    const match = error.stack.match(/\(?(.+?\.(?:jsx?|tsx?)):(\d+):(\d+)\)?/);
    if (match) {
      console.error(`Failed in: ${match[1]} at line ${match[2]}`);
    }
  }
});

// Then your React imports...
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
