const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find(
      {},
      "_id name description price isActive status code"
    );
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
