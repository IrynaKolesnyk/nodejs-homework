const { Contact } = require("../../models");
const { NotFound } = require("http-errors");
const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const findOne = { _id: contactId, owner: req.user._id };
    const contact = await await Contact.findById(findOne);
    if (!contact) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.json({ status: "success", code: 200, data: { result: contact } });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
