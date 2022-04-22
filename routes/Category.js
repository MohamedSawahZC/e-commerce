const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');


router.post('/add', categoryController.addCategory);


router.get('/get', categoryController.getAll);

router.delete('/:id', categoryController.deleteCategory);

router.put('/:id', categoryController.updateCategory);
module.exports = router;