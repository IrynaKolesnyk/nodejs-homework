const currentUser = async (req, res, next) => {
  const { email, subscription } = req.user;
  try {
    res.json({
      status: "success",
      code: 200,
      data: { email, subscription },
    });
  } catch (error) {
    res.status(401).json({
      status: "error",
      code: 401,
      message: "Not authorized",
    });
  }
};

module.exports = currentUser;
