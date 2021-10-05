const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { authenticate, upload } = require("../../middlewares");

router.get("/current", authenticate, ctrl.currentUser);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.uploadAvatar
);

module.exports = router;
