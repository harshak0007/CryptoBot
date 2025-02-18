const express = require("express");
const authController = require("../Controllers/authController");

const router = express.Router();

router.post("/", authController.home);
router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.patch("/buyMembership", authController.buyMembership);

module.exports = router;
