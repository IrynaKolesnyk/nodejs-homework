const { Contact } = require("../../models");

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    const contact = await Contact.findByIdAndUpdate(contactId, { favorite });

    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 400,
        message: "missing field favorite",
      });
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

module.exports = updateStatus;
