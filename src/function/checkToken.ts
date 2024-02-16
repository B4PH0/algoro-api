import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default function checkToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ msg: 'Access denied'});
    const sla = jwt.verify(token, process.env.SECRET_HASH);
    if (!sla) return res.status(500).json({ error: "Bad authentication"});
    next();
};
