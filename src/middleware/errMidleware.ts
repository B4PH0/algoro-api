import { Response, Request, NextFunction } from 'express';

export function errHandlerMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    if (!res.headersSent) {
        res.status(500).json({ error: 'Internal server error'});
    };
    next();
};
