var socket = io();

if (socket) {
  socket.on("perf", function(data) {
    console.log("message: ", data);
    render(data);
  });
}

const render = data => {
  const $display = document.getElementById("output");
  const title = document.createElement("h5");
  const text = `${data.type}: ${data.page.url} ${data.page.userAgent}`;
  title.append(text);

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let str = `${key}: ${data[key]}`;
      const p = document.createElement("p");
      console.log(key);
      p.append(str);
      if ($display.prepend) {
        $display.prepend(p);
      }
    }
  }

  $display.prepend(title);
};
