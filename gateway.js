const { config } = require("dotenv");
config();
require("./_logger");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
var http = require("http").createServer(app);
const helmet = require("helmet");
const proxy = require("express-http-proxy");

try {
  app.use(cors());
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan("dev"));

  app.use((req, res, next) => {
    if (req.headers.referer === "http://localhost:3000/") {
      req.headers.referer = "http://localhost:3001/";
      let ip = req.ip;
      if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7);
      }

      logInfo(
        "gateway",
        `url: ${req.url}, ip: ${ip}, type: ${JSON.stringify(req.headers)}`
      );
      next();
    } else {
      return res.send({ status: 401, message: "Unauthorized entry" });
    }
  });

  app.use("/authorize", proxy("http://localhost:3002"));

  app.use("/sso", proxy("http://localhost:3003"));

  app.use("/user", proxy("http://localhost:3004"));

  require("./db/mongo").then(() => {
    var server = http.listen(3001, function () {
      var host = server.address().address;
      var port = server.address().port;
      console.log("Main server started localhost%s:%s", host, port);
    });
  });
} catch (error) {
  console.log("error", error.message);
  logError("gateway", error);
}
