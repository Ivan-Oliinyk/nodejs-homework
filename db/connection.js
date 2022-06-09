const mongoose = require("mongoose");
const { MONGODB_URL } = require("../src/config");

const connectMongo = async () => {
  return mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connection successful");
    })
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = { connectMongo };
