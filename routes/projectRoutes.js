const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

router.route('/').get(projectsController.getAllProjects).post(projectsController.createNewProject);
router
    .route('/:id')
    .get(projectsController.getProject)
    .patch(projectsController.updateProject)
    .delete(projectsController.deleteProject);

module.exports = router;
