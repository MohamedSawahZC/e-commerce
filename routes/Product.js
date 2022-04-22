const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
//Routes


router.post('/add', productController.addProduct);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

router.get('/:id', productController.getProduct);

router.get('/', productController.getAllProduct);


router.post('/comment/add', productController.addComment);

router.delete('/comment/delete', productController.deleteComment);

router.get('/comment/get', productController.getAllComments);


router.get('/search/:key', productController.search);



module.exports = router;
