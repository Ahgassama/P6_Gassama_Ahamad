module.exports = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  if (
    sauceObject.name.trim().length > 0 &&
    sauceObject.manufacturer.trim().length > 0 &&
    sauceObject.mainPepper.trim().length > 0
  ) {
    next();
  } else {
    res
      .status(400)
      .JSON({ message: "Merci de remplir les champs de caractères requis" });
  }
};
