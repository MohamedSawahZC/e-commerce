const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventsController');

router.post('/add', eventController.addEvent);

router.get('/get', eventController.getAll);

router.delete('/delete', eventController.deleteEvent);

router.put('/:id', eventController.updateEvent);




module.exports = router;