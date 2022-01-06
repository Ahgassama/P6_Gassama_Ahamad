const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const passwordValidatorSchema = require("../middleware/password");
const trueEmail = require("../middleware/email");

router.post("/signup", trueEmail, passwordValidatorSchema, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
