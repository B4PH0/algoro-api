import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default function checkToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(` `)[1];

    if (!token) return res.status(401).json({ msg: 'Access denied.'});
    
    try {
        jwt.verify(token, process.env.SECRET_HASH);
        next();

    } catch (err) {
        return res.status(400).json({ msg: "Invalid token."});
    }

};
