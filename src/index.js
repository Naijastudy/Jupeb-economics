window.onerror = function(msg, src, line, col, err) {
  document.body.innerHTML = `
    <div style="padding:20px;color:red;font-size:12px;word-break:break-all">
      <b>Error:</b> ${msg}<br/>
      <b>File:</b> ${src}<br/>
      <b>Line:</b> ${line}<br/>
      <b>Stack:</b> ${err?.stack}
    </div>
  `;
};
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
