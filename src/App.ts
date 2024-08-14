import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import ErrorHandler from './ErrorHandler';
import DefaultHandler from './DefaultHandler';
import ProjectResolverMiddleware from './Middlewares/ProjectResolverMiddleware';
import routes from '../config/routes';

class App {
    public server;

    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
        this.final();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(ProjectResolverMiddleware);
    }

    routes() {
        this.server.use(routes);
    }

    final() {
        this.server.use(DefaultHandler);
        this.server.use(ErrorHandler);
    }
}

export default new App().server;