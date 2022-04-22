const express = require('express');
const router = express.Router();
const faqController = require('../controllers/FaqController');


router.post('/add', faqController.addFaq);

router.get('/get', faqController.get);

router.delete('/:id', faqController.delete);

router.put('/:id', faqController.update);


module.exports = router;