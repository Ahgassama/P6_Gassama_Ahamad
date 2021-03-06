const passwordValidator = require("password-validator");
const passwordValidatorSchema = new passwordValidator();

passwordValidatorSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .not()
  .spaces(); // Should not have spaces
module.exports = passwordValidatorSchema;
