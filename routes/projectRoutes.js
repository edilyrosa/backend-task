
// import express from "express";
// const router = express.Router();
// //import projectController from '../controllers/projectController.js'
// import * as projectController from '../controllers/projectController.js';

// router.get('/', projectController.getAllProject);
// router.get('/:id', projectController.getProjectById); 
// router.post('/', projectController.createProject);
// router.put('/:id', projectController.updateProject);
// router.delete('/:id', projectController.deleteProject);
// //router.get('/projects-and-tasks-by-client/:clientId', projectController.getProjectsAndTasksByClient);
// router.get('/projects-and-tasks-by-client/:clientId', projectController.getProjectsAndTotalHoursByClient);

// module.exports = router

// projectRoutes.js


// projectRoutes.js
import express from 'express';
import * as projectController from '../controllers/projectController.js';

const router = express.Router();

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById); 
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);
router.get('/projects-and-tasks-by-client/:clientId', projectController.getProjectsAndTotalHoursByClient);

export default router;

