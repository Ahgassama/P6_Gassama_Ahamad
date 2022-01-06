const passwordValidatorSchema = require("../models/password");

module.exports = (req, res, next) => {
  if (!passwordValidatorSchema.validate(req.body.password)) {
    res.status(400).json({
      message:
        "Le mot de passe doit faire 8 caractère au moins, avec une majuscule et une minuscule.",
    });
  } else {
    next();
  }
};
