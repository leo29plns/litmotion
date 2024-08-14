import { Router } from 'express';
import files from './compositions/files';
import CompositionsController from '../../src/Controllers/_CompositionsController';

const compositions = Router();

compositions.use('/files', files);

compositions.post('/', CompositionsController.create);
compositions.delete('/', CompositionsController.delete);
compositions.get('/', CompositionsController.read);

export default compositions;