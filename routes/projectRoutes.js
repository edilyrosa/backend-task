
import express from "express";
const router = express.Router();
import projectController from '../controllers/projectController'

router.get('/', projectController.getAllProject);
router.get('/:id', projectController.getProjectById); 
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);
//router.get('/projects-and-tasks-by-client/:clientId', projectController.getProjectsAndTasksByClient);
router.get('/projects-and-tasks-by-client/:clientId', projectController.getProjectsAndTotalHoursByClient);

module.exports = router