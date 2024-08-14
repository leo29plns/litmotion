import { Router } from 'express';
import VersionsController from '../../src/Controllers/_VersionsController';

const versions = Router();

versions.put('/', VersionsController.create);

export default versions;