const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getAllProject);
router.get('/:id', projectController.getProjectById); 
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);
//router.get('/projects-and-tasks-by-client/:clientId', projectController.getProjectsAndTasksByClient);
router.get('/projects-and-tasks-by-client/:clientId', projectController.getProjectsAndTotalHoursByClient);

module.exports = router