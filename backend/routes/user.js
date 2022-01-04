const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const passwordValidatorSchema = require("../controllers/password");

router.post("/signup", passwordValidatorSchema, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
