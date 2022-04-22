const express = require('express');
const router = express.Router();
const supportController = require('../controllers/supportController');

router.post('/add', supportController.addProblem);

router.get('/get', supportController.getChat);
module.exports = router;