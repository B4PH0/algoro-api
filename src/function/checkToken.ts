import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default function checkToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ status: 403, message: 'Access denied'});
    const verifyToken = jwt.verify(token, process.env.SECRET_HASH);
    if (!verifyToken) return res.status(500).json({ status: 500, error: "Bad authentication"});
    next();
};
