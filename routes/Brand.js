const express = require('express');
const router = express.Router();
const brandController = require('../controllers/BrandController');


router.post('/add', brandController.addBrand);


router.get('/get', brandController.getAll);

router.delete('/:id', brandController.deleteBrand);

router.put('/:id', brandController.updateBrand);
module.exports = router;