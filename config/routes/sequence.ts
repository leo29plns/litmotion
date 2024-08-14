import { Router } from 'express';
import SequenceController from '../../src/Controllers/_SequenceController';

const sequence = Router();

sequence.put('/', SequenceController.create);

export default sequence;