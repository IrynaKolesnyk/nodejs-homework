const express = require("express");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
const authRouter = require("./routes/api/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ status: "error", code: status, message });
});

module.exports = app;
