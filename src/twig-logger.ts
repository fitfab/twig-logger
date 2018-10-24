var socket = io();

let perfData = window.performance.timing;

const loadTime = window.performance.now();

const trackError = ({ message, filename, lineno, error }) => {
  const detail = {
    message,
    filename,
    lineno,
    error,
    url: window.location.href,
    readyState: document.readyState,
    referrer: document.referrer,
    stack: error.stack,
    historyState: JSON.stringify(window.history.state)
  };

  if (socket) {
    socket.emit("error", detail);
  }
};

const trackPerf = () => {
  const perf = {
    pageLoadTime: perfData.loadEventEnd - perfData.navigationStart,
    responseTime: perfData.responseEnd - perfData.requestStart,
    renderTime: perfData.domComplete - perfData.domLoading,
    url: window.location.href,
    readyState: document.readyState,
    referrer: document.referrer,
    historyState: JSON.stringify(window.history.state)
  };
  if (socket) {
    socket.emit("perf", perf);
  }
};

// capture front-end error
window.addEventListener("error", event => {
  trackError(event);
});

// alternative to DOMContentLoaded
document.onreadystatechange = event => {
  if (document.readyState === "complete") {
    setTimeout(trackPerf, 100);
  }
};

if (socket) {
  socket.on("perf", function(data) {
    console.log("message: " + data);
    render(data);
  });
}

const render = data => {
  const str = `
    ${data.url} : ${data.pageLoadTime}
  `;
  const p = document.createElement("p");
  p.append(str);
  document.getElementById("output").append(p);
};
