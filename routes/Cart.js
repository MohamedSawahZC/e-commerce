const express = require("express");
const router = express.Router();
const cartController = require('../controllers/CartController');


router.post("/add",cartController.addToCart );

router.get("/get",cartController.getUserCart );

router.delete('/delete',cartController.removeItem)
module.exports = router;
