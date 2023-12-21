// import express from "express";
// const router = express.Router();
// //import taskentryController from '../controllers/taskentryController.js'
// import * as taskentryController from '../controllers/taskentryController.js';


// router.get('/', taskentryController.getAllTaskentry);
// router.get('/clientsWithtask', taskentryController.getClientsWithTaskentries);
// router.get('/:id', taskentryController.getTaskentryById);
// router.post('/', taskentryController.createTaskentry); 
// router.put('/:id', taskentryController.updateTaskentry);
// router.delete('/:id', taskentryController.deleteTaskentry);

// module.exports = router

// taskentryRoutes.js
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
