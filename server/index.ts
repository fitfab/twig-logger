import { createServer } from "http";
import path from "path";
import express from "express";
import SocketIO from "socket.io";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";

// Reference to the build(SPA) directory
const distFolder = path.resolve(__dirname, "../dist");

// set the port number
const PORT = process.env.PORT || 5000;

// Create the web app application with Expressjs
const app = express();

// Check Expressjs default env variable
const dev = app.get("env") !== "production";

// Point to the build for the static files
app.use(express.static(distFolder));

// Run Production setup
if (!dev) {
  // Helmet helps secure the Express apps by setting various HTTP headers.
  // https://www.npmjs.com/package/helmet
  app.use(helmet());

  // Compression middleware for gzip
  app.use(compression());

  // Logging middleware with the common flag
  app.use(morgan("common"));
}

if (dev) {
  // Logging middleware with the dev flag
  app.use(morgan("dev"));
  console.log(`
    [ Development Mode ]
    `);
}

// Route any request coming in
// to be handle by the SPA. -- must use `*`
// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#serving-apps-with-client-side-routing
app.use("*", (req, res, next) => {
  res.sendFile(`${distFolder}/index.html`);
});

// create the server
const server = createServer(app);

// create socket.io
const io = new SocketIO(server);

// log connection
io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("error", function(msg) {
    console.log("error: ", msg);
    io.emit("error", msg);
  });
  socket.on("perf", function(msg) {
    console.log("perf: ", msg);
    io.emit("perf", msg);
  });
});

server.listen(PORT, err => {
  if (err) throw err;
  console.log(`
    [ server started on port: ${PORT} ]
  `);
});
