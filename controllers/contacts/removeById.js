const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const findOne = { _id: contactId, owner: req.user._id };
    const contact = await Contact.findByIdAndDelete(findOne);

    if (!contact) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.status(204).json({
      status: "success",
      code: 204,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
