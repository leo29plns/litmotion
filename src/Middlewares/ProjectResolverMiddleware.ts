import { Request, Response, NextFunction } from 'express';
import Project from '../Services/Project';

const ProjectResolverMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.body['projectId'] || null;

    if (!projectId) {
        return next();
    }

    try {
        const project = new Project(projectId);

        if (!project.exists()) {
            const err = new Error(`Project ${projectId} not found.`);
            (err as any).statusCode = 404;
    
            return next(err);
        }

        req.project = project;

        res.setHeader('X-Project-Id', projectId);

        next();
    } catch (err) {
        next(err);
    }
};

export default ProjectResolverMiddleware;