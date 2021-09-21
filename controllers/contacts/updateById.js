const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await Contact.findByIdAndUpdate(contactId, req.body);

    if (!contact) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }

    res.status(200).json({
      status: "success",
      code: "200",
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
