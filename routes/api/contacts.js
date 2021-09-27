const express = require("express");
const router = express.Router();
const { validation, authenticate } = require("../../middlewares");
const { joiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", authenticate, validation(joiSchema), ctrl.add);

router.put("/:contactId", validation(joiSchema), ctrl.updateById);

router.patch("/:contactId", ctrl.updateStatus);

router.delete("/:contactId", ctrl.removeById);

module.exports = router;
