import { Router } from 'express';
import FilesController from '../../../src/Controllers/Compositions/_FilesController';

const files = Router();

files.post('/', FilesController.create);
files.delete('/', FilesController.delete);
files.get('/', FilesController.read);

export default files;