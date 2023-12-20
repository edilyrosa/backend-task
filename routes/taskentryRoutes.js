const express = require('express');
const router = express.Router();
const taskentryController = require('../controllers/taskentryController');

router.get('/', taskentryController.getAllTaskentry);
router.get('/clientsWithtask', taskentryController.getClientsWithTaskentries);
router.get('/:id', taskentryController.getTaskentryById);
router.post('/', taskentryController.createTaskentry); 
router.put('/:id', taskentryController.updateTaskentry);
router.delete('/:id', taskentryController.deleteTaskentry);

module.exports = router