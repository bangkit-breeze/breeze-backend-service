import { Router } from 'express';
import { createErrorResponse, createSuccessResponse } from '../utils/helper';
import { findAllProject, findProjectById } from '../services/projectService';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const projects = await findAllProject();
    res.status(200).json(createSuccessResponse(projects, ''));
  } catch (err) {
    res.status(400).json(createErrorResponse(err.message));
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await findProjectById(Number(req.params.id));
    res.status(200).json(createSuccessResponse(project, ''));
  } catch (err) {
    res.status(400).json(createErrorResponse(err.message));
  }
} );

export default router;
