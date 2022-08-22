const mongoose = require("mongoose");
const options = {};

module.exports = mongoose.connect(process.env.MONGO_URL, options);
