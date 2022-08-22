const User = require("../db/user.model");
const jwt = require("jsonwebtoken");
const user = {
  validate: (req, res, next) => {
    try {
      let token = req.headers.authorization || req.headers.authorization;
      token = token.replace("Bearer ", "");
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decodedToken", decodedToken);

      req.decoded = decodedToken;
      next();
    } catch (error) {
      logError("user/main", error);
      res.send({ status: 401, message: error.message });
    }
  },
  
  get: async (req, res) => {
    const { email } = req.decoded;
    const data = await User.findOne({ email }, { email: 1, picture: 1 });
    return res.send({ status: 200, data: data });
  },
};

module.exports = user;
