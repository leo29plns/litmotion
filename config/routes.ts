import { Router } from 'express';

import projects from './routes/projects';
import compositions from './routes/compositions';
import sequence from './routes/sequence';
import versions from './routes/versions';
import render from './routes/render';

const routes = Router();

routes.use('/projects', projects);
routes.use('/compositions', compositions);
routes.use('/sequence', sequence);
routes.use('/versions', versions);
routes.use('/render', render);

export default routes;
