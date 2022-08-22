const jwt = require("jsonwebtoken");
const User = require("../db/user.model");

module.exports = {
  createNbfToken: (req, res) => {
    const expiredIn = Math.floor(Date.now() / 1000) + 60 * 60; // 60 minutes
    const notBefore = Math.floor(Date.now() / 1000) + 60 * 2; // 2 mins

    const { email } = req.decoded;

    // payload has exp, nbf, aud, sub and iss;
    const data = {
      exp: expiredIn, // expiresIn
      nbf: notBefore, // notBefore
      aud: "", // audience
      sub: req.ip, // subject
      iss: email, // issuer
    };
    return res.send({
      status: 200,
      message: jwt.sign(data, process.env.JWT_SECRET),
    });
  },

  verify: (req, res, next) => {
    try {
      let token = req.headers.Authorization || req.headers.authorization;
      token = token.replace("Bearer ", "");
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("verifiedToken ", verifiedToken);
      req.decoded = verifiedToken;
      next();
    } catch (error) {
      res.send({ status: 401, message: error.message });
    }
  },
};
