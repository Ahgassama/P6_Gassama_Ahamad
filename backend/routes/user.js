const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const passwordValidatorSchema = require("../controllers/password");
const trueEmail = require("../controllers/email");

router.post("/signup", trueEmail, passwordValidatorSchema, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
