import { Request, Response, NextFunction } from 'express';
import Project from '../Services/Project';

class ProjectController {
    public async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        if (req.project) {
            const err = new Error('Cannot overwrite existing project (no projectId expected).');
            (err as any).statusCode = 403;
    
            return next(err);
        }

        const project = new Project();
        project.create(req.ip);

        return res.status(201).json({
            message: `Project created successfully!`,
            projectId: project.id
        });
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
        if (!req.project) {
            const err = new Error('You must specify a project to delete.');
            (err as any).statusCode = 404;
    
            return next(err);
        }

        req.project.delete();

        return res.status(200).json({
            message: 'Successfully deleted!'
        });
    }
}

export default new ProjectController();