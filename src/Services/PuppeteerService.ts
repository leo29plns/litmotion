import puppeteer, { Browser } from 'puppeteer';
import fs from 'fs';
import path from 'path';

export default class PuppeteerService {
    private duration: number;
    private fps: number;
    private id: string;
    private totalFrames: number;

    constructor(duration: number, fps: number, id: string) {
        this.duration = duration;
        this.fps = fps;
        this.id = id;
        this.totalFrames = duration * fps;
    }

    private createDirectory(): void {
        const dirPath = path.join(process.cwd(), 'frames', this.id);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    private async captureFrame(startFrame: number, endFrame: number): Promise<void> {
        const browser: Browser = await puppeteer.launch({ args: ['--use-gl=egl'] });
        const page = await browser.newPage();
        await page.goto('file://' + process.cwd() + '/compositions/animation.html');
        await page.setViewport({ width: 1920, height: 1080 });

        this.createDirectory();

        for (let i = startFrame; i < endFrame; i++) {
            const time = (i / this.fps) * 1000;

            await page.evaluate((time) => {
                document.querySelectorAll('*').forEach((el) => {
                    const htmlEl = el as HTMLElement;
                    htmlEl.style.animationPlayState = 'paused';
                    htmlEl.style.animationDelay = `-${time}ms`;
                });
            }, time);

            await page.screenshot({
                path: path.join(process.cwd(), 'frames', this.id, `${String(i).padStart(5, '0')}.png`)
            });
        }

        await browser.close();
    }

    public async processFrames(): Promise<{ totalTime: number; workers: number }> {
        const startTime = new Date().getTime();
        const maxWorkers = process.env.MAX_WORKERS || 5;

        // Calcul du nombre de workers nécessaire
        let workers = Math.ceil(this.totalFrames / 30);
        if (workers > maxWorkers) workers = maxWorkers;

        const framesPerWorker = Math.ceil(this.totalFrames / workers);

        const workerPromises = [];
        for (let i = 0; i < workers; i++) {
            const startFrame = i * framesPerWorker;
            const endFrame = Math.min(startFrame + framesPerWorker, this.totalFrames);

            workerPromises.push(this.captureFrame(startFrame, endFrame));
        }

        await Promise.all(workerPromises);

        const endTime = new Date().getTime();
        const totalTime = (endTime - startTime) / 1000;

        // Retourner les détails dans un objet
        return { totalTime, workers };
    }
}