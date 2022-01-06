const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const sauceCtrl = require("../controllers/sauces");
const checkSauce = require("../middleware/check-sauce");

router.post("/", auth, multer, checkSauce, sauceCtrl.createSauce);
router.put("/:id", auth, multer, checkSauce, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.get("/", auth, sauceCtrl.getAllSauce);
router.post("/:id/like", auth, sauceCtrl.likeDislike);

module.exports = router;
