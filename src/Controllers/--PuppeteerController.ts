import { Request, Response } from 'express';
import PuppeteerService from '../Services/PuppeteerService';

class PuppeteerController {
    public async generateFrames(req: Request, res: Response): Promise<Response> {
        // const { duration, fps } = req.body;
        // const id = req.transactionId;

        // try {
        //     const puppeteerService = new PuppeteerService(duration, fps, id);
        //     const { totalTime, workers } = await puppeteerService.processFrames();
            
        //     // Retourner les détails dans la réponse API
        //     return res.status(200).json({
        //         message: `Composition generated successfully in ${totalTime} seconds with ${workers} worker(s).`,
        //         transactionId: id
        //     });
        // } catch (error) {
        //     return res.status(500).json({
        //         error: 'An error occurred during frame generation',
        //         transactionId: id
        //     });
        // }
        return res.status(500).json({
            message: `Empty controller`
        });
    }
}

export default new PuppeteerController();
