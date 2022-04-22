const express = require('express');
const router = express.Router();
const whoUsController = require('../controllers/WhoUsController');

router.post('/add', whoUsController.add);

router.get('/get', whoUsController.get);

router.put('/:id', whoUsController.update);

module.exports = router;