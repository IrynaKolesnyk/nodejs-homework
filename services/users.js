const { User } = require("../models");

const getAwatar = async (id) => {
  const { avatarURL } = await User.findOne({ _id: id });
  return avatarURL;
};

module.exports = {
  getAwatar,
};
