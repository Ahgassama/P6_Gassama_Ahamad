const Sauce = require("../models/sauce");
const fs = require("fs");
//Créer une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};
//Chercher une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
//Modifier une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};
//Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
//Chercher toute les sauces
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
//like et dislike des sauces

exports.createLike = (req, res) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      if (req.body.like == -1) {
        sauce.dislikes++;
        sauce.userDisliked.push(req.body.userId);
        sauce.save();
      }

      if (req.body.like == 1) {
        sauce.likes++;
        sauce.userLiked.push(req.body.userId);
        sauce.save();
      }

      if (req.body.like == 0) {
        if (sauce.userLiked.indexOf(req.body.userId) != -1) {
          sauce.likes--;
          sauce.userLiked.splice(sauce.userLiked.indexOf(req.body.userId), 1);
        } else {
          sauce.dislikes--;
          sauce.userDisliked.splice(
            sauce.userDisliked.indexOf(req.body.userId),
            1
          );
        }
        sauce.save();
      }

      res.status(200).json({ message: "like pris en compte" });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
