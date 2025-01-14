const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = require("../app");
// require("dotenv").config(); сокращенный импорт dotenv

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log("Database connect");
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
