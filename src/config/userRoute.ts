import express, { Router, Request, Response, NextFunction } from 'express';
import checkToken from './checkToken';

const route: Router = Router();

const userRoute: Router = route.post('/user/:id', checkToken, async (req: Request, res: Response) => {
    const id = req.params.id;
    

});

export { userRoute };
