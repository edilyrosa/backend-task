import express from "express";
const router = express.Router();
import taskentryController from '../controllers/taskentryController'


router.get('/', taskentryController.getAllTaskentry);
router.get('/clientsWithtask', taskentryController.getClientsWithTaskentries);
router.get('/:id', taskentryController.getTaskentryById);
router.post('/', taskentryController.createTaskentry); 
router.put('/:id', taskentryController.updateTaskentry);
router.delete('/:id', taskentryController.deleteTaskentry);

module.exports = router