import { Request, Response, NextFunction } from 'express';

const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
        error: err.message || 'Server error.'
    });
};

export default ErrorHandler;