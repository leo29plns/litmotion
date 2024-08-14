import { Request, Response } from 'express';
import VideoAssemblerService from '../Services/VideoAssemblerService';

class VideoController {
    public async assembleVideo(req: Request, res: Response): Promise<Response> {
        // const { imageDir, outputFilePath, fps = 30 } = req.body;

        // try {
        //     const videoAssembler = new VideoAssemblerService(imageDir, outputFilePath, fps);
        //     await videoAssembler.assemble();
            
        //     return res.status(200).json({
        //         message: 'Video assembled successfully',
        //         outputFilePath
        //     });
        // } catch (error) {
        //     console.error('Error during video assembly:', error);
        //     return res.status(500).json({
        //         error: 'An error occurred during video assembly',
        //         details: error.message
        //     });
        // }
        return res.status(500).json({
            message: `Empty controller`
        });
    }
}

export default new VideoController();