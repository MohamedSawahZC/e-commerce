const express = require("express");
const router = express.Router();
const favoriteController = require('../controllers/FavoriteController');


router.post("/add",favoriteController.addToCart );

router.get("/get",favoriteController.getUserCart );

router.delete('/delete',favoriteController.removeItem)
module.exports = router;
