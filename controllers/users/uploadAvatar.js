const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models");

const avatarDir = path.join(process.cwd(), "public/avatars");

const uploadAvatar = async (req, res) => {
  const { path: tempStorage, originalname } = req.file;
  const id = req.user._id;

  try {
    await Jimp.read(tempStorage)
      .then((image) => {
        return image
          .cover(
            250,
            250,
            Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
          )
          .write(tempStorage);
      })
      .catch((err) => {
        console.error(err);
      });

    const [extention] = originalname.split(".").reverse();
    const newFileName = `user_avatar-image_${id}.${extention}`;
    const resultStorage = path.join(avatarDir, newFileName);
    await fs.rename(tempStorage, resultStorage);
    const avatarName = path.join("/avatars", newFileName);
    const user = await User.findByIdAndUpdate(
      id,
      { avatarURL: avatarName },
      { new: true }
    );

    res.json({
      status: "success",
      code: 200,
      data: {
        result: {
          avatarURL: user.avatarURL,
        },
      },
    });
  } catch (error) {
    await fs.unlink(tempStorage);
    throw error;
  }
};

module.exports = uploadAvatar;
