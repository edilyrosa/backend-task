import express from 'express';
import * as taskentryController from '../controllers/taskentryController.js';

const router = express.Router();

router.get('/', taskentryController.getAllTaskentries);
router.get('/clientsWithtask', taskentryController.getClientsWithTaskentries);
router.get('/:id', taskentryController.getTaskentryById);
router.post('/', taskentryController.createTaskentry);
router.put('/:id', taskentryController.updateTaskentry);
router.delete('/:id', taskentryController.deleteTaskentry);

export default router;
