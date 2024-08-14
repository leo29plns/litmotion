import { Router } from 'express';
import RenderController from '../../src/Controllers/RenderController';

const render = Router();

render.post('/', RenderController.create);

export default render;