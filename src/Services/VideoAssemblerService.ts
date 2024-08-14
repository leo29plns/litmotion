import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

class VideoAssemblerService {
    private imageDir: string;
    private outputFilePath: string;
    private fps: number;

    constructor(imageDir: string, outputFilePath: string, fps: number = 30) {
        this.imageDir = imageDir;
        this.outputFilePath = outputFilePath;
        this.fps = fps;
    }

    private getImages(): string[] {
        return fs.readdirSync(this.imageDir)
            .filter(file => file.endsWith('.png'))
            .sort()
            .map(file => path.join(this.imageDir, file));
    }

    public async assemble(): Promise<void> {
        const images = this.getImages();

        if (images.length === 0) {
            throw new Error('No images found in the specified directory.');
        }

        return new Promise((resolve, reject) => {
            const command = ffmpeg();

            images.forEach(image => {
                command.input(image);
            });

            command
                .inputFPS(this.fps)
                .videoCodec('libvpx-vp9')  // VP9 codec supports transparency
                .noAudio()
                .outputOptions([
                    '-pix_fmt yuva420p',   // Required to support alpha channel
                    '-crf 0',              // Constant rate factor for lossless compression
                    '-b:v 0'               // Bitrate set to 0 for no quality loss
                ])
                .save(this.outputFilePath)
                .on('end', () => {
                    console.log('Video assembly complete');
                    resolve();
                })
                .on('error', (err) => {
                    console.error('Error during video assembly:', err);
                    reject(err);
                });
        });
    }
}

export default VideoAssemblerService;