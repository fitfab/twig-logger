console.log("website:", window.location.href);
let perfData;
// capture front-end error
//Reports JavasScript errors to Haystack
const loadTime = window.performance.now();
window.addEventListener("error", event => {
  const { message, filename, lineno, error } = event;
  const customEvent = new CustomEvent("apperror", {
    bubbles: true,
    detail: {
      message,
      filename,
      lineno,
      error,
      url: window.location.href,
      readyState: document.readyState,
      referrer: document.referrer,
      stack: error.stack,
      historyState: JSON.stringify(window.history.state),
      timeSinceLoad: window.performance.now() - loadTime
    }
  });
  // Dispatch the event.
  window.dispatchEvent(customEvent);
});

// Listen for the event.
window.addEventListener("apperror", function(event: CustomEvent) {
  console.log(event.detail);
});

window.addEventListener("load", function(event: CustomEvent) {
  perfData = window.performance.timing;
  trackPerf(perfData);
});

const trackPerf = perfData => {
  var pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  console.log("pageLoadTime", pageLoadTime);
  var connectTime = perfData.responseEnd - perfData.requestStart;
  console.log("connectTime", connectTime);
  var renderTime = perfData.domComplete - perfData.domLoading;
  console.log("renderTime", renderTime);
};
