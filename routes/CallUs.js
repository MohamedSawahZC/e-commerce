const express = require('express');
const router = express.Router();
const callusController = require('../controllers/CallUs');


router.post('/add', callusController.add);

router.get('/get', callusController.getAll);

router.put('/:id', callusController.update);

router.delete('/:id', callusController.delete);

module.exports = router;