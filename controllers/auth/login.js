const { User } = require("../../models");
const { sendResponse } = require("../../helpers");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      sendResponse({
        res,
        status: 401,
        statusMessage: "error",
        data: { message: "Email is wrong" },
      });
      return;
    }
    if (!user.comparePassword(password)) {
      sendResponse({
        res,
        status: 401,
        statusMessage: "error",
        data: { message: "Password is wrong" },
      });
      return;
    }
    if (!user.verify) {
      sendResponse({
        res,
        status: 401,
        statusMessage: "error",
        data: { message: "Email is not verify" },
      });
      return;
    }
    // или так если нет необходимости разделять на 3 if
    //  if (!user || !user.comparePassword(password) || !user.verify) {
    //    res.status(401).json({
    //      status: "error",
    //      code: 401,
    //      message: "Email or password is wrong or email is not verify",
    //    });
    //    return;
    //  }
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({ status: "success", code: 200, data: { token } });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = login;
