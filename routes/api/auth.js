const express = require("express");
const { validation, authenticate } = require("../../middlewares");
const { joiSchema } = require("../../models/user");
const { auth: ctrl } = require("../../controllers");
const router = express.Router();

router.post("/register", validation(joiSchema), ctrl.register);
// router.post("/signup", validation(joiSchema), ctrl.signup);
router.post("/login", validation(joiSchema), ctrl.login);
// router.post("/signin", validation(joiSchema), ctrl.signin);
router.post("/logout", authenticate, ctrl.logout);
// router.post("/signout", ctrl.signout);
router.get("/verify/:verifyToken", ctrl.verify);
module.exports = router;
