import {Request, Response, NextFunction } from 'express';

class VersionsController {
    public async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        // const { duration, fps } = req.body;
        // const projectId = req.projectId;

        // try {
        //     const puppeteerService = new PuppeteerService(duration, fps, id);
        //     const { totalTime, workers } = await puppeteerService.processFrames();
            
        //     return res.status(200).json({
        //         message: `Ok`
        //     });
        // } catch (error) {
        //     next();
        // }
        return res.status(500).json({
            message: `Empty controller`
        });
    }
}

export default new VersionsController();