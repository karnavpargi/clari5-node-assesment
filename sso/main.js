const User = require("../db/user.model");
const jwt = require("jsonwebtoken");
const validator = require("express-validator");
const { body } = require("express-validator");

const main = {
  decode: async (req, res, next) => {
    let token = req.headers.Authorization || req.headers.authorization;
    token = token.replace("Bearer ", "");
    req.decoded = jwt.decode(token);
    next();
  },

  //   innerValidation: (validations) => {
  //     return async (req, res, next) => {
  //       for (let validation of validations) {
  //         const result = await validation.run(req);
  //         if (result.errors.length) break;
  //       }

  //       const errors = validationResult(req);
  //       if (errors.isEmpty()) {
  //         return next();
  //       }

  //       res.status(400).json({ errors: errors.array() });
  //     };
  //   },
  //   validate: () =>
  //     main.innerValidation([, body("name").isEmail(), body("email_verified").isBoolean()]),

  sign: ({ email }) => {
    return jwt.sign(
      {
        email,
        nbf: Math.floor(Date.now() / 1000) + 60 * 2 /*2 mins*/,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 /* 60 mins*/,
      },
      process.env.JWT_SECRET
    );
  },

  create: async (req, res) => {
    const payload = req.decoded;
    try {
      const data = new User(payload);
      const response = await data.save();
      return res.send({
        status: 200,
        message: main.sign(payload),
        data: response,
      });
    } catch (error) {
      if (error.message.includes("E11000") > -1) {
        res.send({ status: 200, message: main.sign(payload) });
      } else {
        res.send({ status: 500, message: "something went wrong." });
      }
    }
  },
};

module.exports = main;
