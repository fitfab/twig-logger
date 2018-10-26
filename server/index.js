// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"7QCb":[function(require,module,exports) {
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var http_1 = require("http");

var path_1 = __importDefault(require("path"));

var events_1 = __importDefault(require("events"));

var express_1 = __importDefault(require("express"));

var body_parser_1 = __importDefault(require("body-parser"));

var socket_io_1 = __importDefault(require("socket.io"));

var compression_1 = __importDefault(require("compression"));

var morgan_1 = __importDefault(require("morgan"));

var helmet_1 = __importDefault(require("helmet")); // Event Emitter


var eventEmitter = new events_1["default"](); // Reference to the build(SPA) directory

var distFolder = path_1["default"].resolve(__dirname, "../dist"); // set the port number

var PORT = process.env.PORT || 5000; // 1) Create the web app application with Expressjs

var app = express_1["default"](); // 2) create the server

var server = http_1.createServer(app); // 3) create socket.io

var io = new socket_io_1["default"](server); // Check Express default env variable

var dev = app.get("env") !== "production"; // Point to the build for the static files

app.use(express_1["default"].static(distFolder)); // Run Production setup

if (!dev) {
  // Helmet helps secure the Express apps by setting various HTTP headers.
  // https://www.npmjs.com/package/helmet
  app.use(helmet_1["default"]()); // Compression middleware for gzip

  app.use(compression_1["default"]()); // Logging middleware with the common flag

  app.use(morgan_1["default"]("common"));
}

if (dev) {
  // Logging middleware with the dev flag
  app.use(morgan_1["default"]("dev"));
  console.log("\n    [ Development Mode ]\n    ");
} // parse application/json


app.use(body_parser_1["default"].json()); // handles logs

app.use("/artnetlogger", function (req, res, next) {
  console.log("req.body", req.body);
  eventEmitter.emit("logger", req.body);
  res.send(JSON.stringify(req.body, null, 2));
}); // Route any request coming in
// to be handle by the SPA. -- must use `*`
// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#serving-apps-with-client-side-routing

app.use("*", function (req, res, next) {
  res.sendFile(distFolder + "/index.html");
});
var connected = 0; // log connection

io.on("connection", function (socket) {
  connected++;
  var count = 0;
  console.log("Connected: " + connected);
  eventEmitter.on("logger", function (msg) {
    console.log("Count: " + count);
    count++;
    socket.emit("perf", msg);
  });
});
server.listen(PORT, function (err) {
  if (err) throw err;
  console.log("\n    [ server started on port: " + PORT + " ]\n  ");
});
},{}]},{},["7QCb"], null)
//# sourceMappingURL=/index.map