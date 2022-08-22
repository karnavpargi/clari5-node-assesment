const { config } = require("dotenv");
config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
var http = require("http").createServer(app);
const helmet = require("helmet");
const { create, decode, validate } = require("./main");
const { body, check } = require("express-validator");
try {
  app.use(cors());
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan("dev"));

  app.use((req, res, next) => {
    if (req.headers.referer === "http://localhost:3001/") {
      next();
    } else {
      return res.send({ status: 401, message: "Unauthorized entry" });
    }
  });

  app.get("/", decode, create);

  require("../db/mongo").then(() => {
    var server = http.listen(3003, function () {
      var host = server.address().address;
      var port = server.address().port;
      logInfo(
        "sso.server",
        `User server started localhost%s:%s ${host} ${port}`
      );
    });
  });
} catch (error) {
  console.log(error);
}
