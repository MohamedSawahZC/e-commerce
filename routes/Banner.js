const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/BannersController');


router.post("/add", bannerController.addBanner);

router.get('/get', bannerController.getAllBanners);

router.delete('/delete', bannerController.deleteBanner);


module.exports = router;



