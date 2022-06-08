require("dotenv").config();
const routes = require("./routes");

module.exports = {
  PORT: process.env.PORT || 8081,
  routes,
};
