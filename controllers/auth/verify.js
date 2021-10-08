const { User } = require("../../models");

const verify = async (req, res) => {
  const { verifyToken } = req.params;
  const user = await User.findOne({ verifyToken });
  if (!user) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
    return;
  }
  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true });
  res.json({
    status: "success",
    code: 200,
    message: "Succuss verify email",
  });
};

module.exports = verify;
