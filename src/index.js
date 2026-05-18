import React, { useState } from "react";  // 👈 add useState
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import { AppProvider } from "./context/AppContext";
import GlobalStyles from "./components/GlobalStyles";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

// 👇 Add this temporarily
const TestCrash = () => {
  const [crash, setCrash] = useState(false);
  if (crash) throw new Error("network error test");
  return <button onClick={() => setCrash(true)}>Test Error</button>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ErrorBoundary>
    <AppProvider>
      <GlobalStyles />
      <TestCrash />  {/* 👈 Add this temporarily */}
      <App />
    </AppProvider>
  </ErrorBoundary>
);
/*import React from "react";
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
  <ErrorBoundary>
    <AppProvider>
      <GlobalStyles />
      <App />
    </AppProvider>
  </ErrorBoundary>
);
*/
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
