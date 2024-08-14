import { Router } from 'express';
import ProjectsController from '../../src/Controllers/ProjectsController';

const projects = Router();

projects.post('/', ProjectsController.create);
projects.delete('/', ProjectsController.delete);

export default projects;