const app = require("./app");
const { connectMongo } = require("./db/connection");
const { PORT } = require("./src/config");

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.error(err.message);
  }
};

start();
