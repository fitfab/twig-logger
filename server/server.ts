import { createServer } from "http";
import path from "path";
import EventEmitter from "events";
import express from "express";
import bodyParser from "body-parser";
import SocketIO from "socket.io";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import useragent from "useragent";
import cors from "cors";

// Event Emitter

const eventEmitter = new EventEmitter();

// Reference to the build(SPA) directory
const distFolder = path.resolve(__dirname, "../dist");

// set the port number
const PORT = process.env.PORT || 5000;

// 1) Create the web app application with Express
const app = express();

// 2) Create the server
const server = createServer(app);

// 3) create socket.io
const io = SocketIO(server);

// Check Express default env variable
const dev = app.get("env") !== "production";

// enable cors

// Point to the build for the static files
app.use(express.static(distFolder));

// Run Production setup
if (!dev) {
  console.log("Prod:", dev);
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

// parse application/json
app.use(bodyParser.json());

// Handles Performance logs
app.use("/artnetlogger", cors(), (req, res, next) => {
  // get user agent
  const userAgent = useragent.parse(req.headers["user-agent"]);
  req.body.page.userAgent = userAgent.toString();

  // Attach user agent to the req.body
  req.body.page.device = userAgent.device.toString();

  // NOTE: we save the payload to DB
  // append to a log file

  // Emit event with the req.body
  eventEmitter.emit("newpost", req.body);
  res.send(JSON.stringify(req.body, null, 2));
});

// Route any request coming in
// to be handle by the SPA. -- must use `*`
// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#serving-apps-with-client-side-routing
app.use("*", (req, res, next) => {
  res.sendFile(`${distFolder}/index.html`);
});

let connected = 0;

// Web Socket connection
io.on("connection", function(socket) {
  connected++;
  console.log(`Connected: ${connected}`);

  // Listen to event "newpost"
  eventEmitter.on("newpost", msg => {
    // emits "logs" event to the client.
    socket.emit("log", msg);
  });
});

server.listen(PORT, err => {
  if (err) throw err;
  console.log(`
    [ server started on port: http://localhost:${PORT} ]
  `);
});
