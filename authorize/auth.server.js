const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
var http = require("http").createServer(app);
const { createNbfToken, verify } = require("./main");

try {
  app.use(cors());
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

  // User is going to authorize here
  app.get("/", verify, createNbfToken);

  require("../db/mongo").then(() => {
    var server = http.listen(3002, function () {
      var host = server.address().address;
      var port = server.address().port;
      console.log("Authorization server started localhost%s:%s", host, port);
    });
  });
} catch (error) {
  console.log(error);
}
