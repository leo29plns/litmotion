import { Request, Response, NextFunction } from 'express';

const DefaultHandler = (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Ressource ${req.path} (method ${req.method}) not found.`);
    (err as any).statusCode = 404;

    return next(err);
};

export default DefaultHandler;