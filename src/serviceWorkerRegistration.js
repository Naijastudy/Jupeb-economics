import { Workbox } from "workbox-window";

export function register() {
  if ("serviceWorker" in navigator) {
    const wb = new Workbox("/service-worker.js");

    // Show update notification when new content available
    wb.addEventListener("waiting", () => {
      if (window.confirm("📚 New content available! Click OK to update StudyNaija with the latest questions.")) {
        wb.messageSkipWaiting();
        window.location.reload();
      }
    });

    wb.addEventListener("controlling", () => {
      window.location.reload();
    });

    wb.addEventListener("activated", event => {
      if (!event.isUpdate) {
        console.log("StudyNaija is ready for offline use!");
      }
    });

    wb.register()
      .then(reg => console.log("SW registered:", reg))
      .catch(err => console.log("SW failed:", err));
  }
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(reg => reg.unregister());
  }
}
