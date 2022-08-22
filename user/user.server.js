const { config } = require("dotenv");
config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
var http = require("http").createServer(app);
const helmet = require("helmet");
const { validate, get } = require("./main");

try {
  app.use(cors());
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan("dev"));

  app.use((req, res, next) => {
    let ip = req.ip;
    if (ip.substr(0, 7) == "::ffff:") {
      ip = ip.substr(7);
    }

    logInfo("user.server", `url: ${req.url}, ip: ${ip}, type: ${JSON.stringify(req.headers)}`);
    next();
  });

  app.get("/get", validate, get);

  require("../db/mongo").then(() => {
    var server = http.listen(3004, function () {
      var host = server.address().address;
      var port = server.address().port;
      logInfo("user.server", `User server started localhost%s:%s ${host} ${port}`);
    });
  });
} catch (error) {
  console.log(error);
  logError("user.server", error);
}
