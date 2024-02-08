import express, { Router } from "express";
import cors from 'cors';
import { db_connection } from "../db/conn";
import { LoginUsersController } from "../controllers/LoginController";
import { SignupController } from "../controllers/SignupController";
import dotenv from 'dotenv';
dotenv.config();

export class Argoroapi {
    private connectingDB(): void {
        db_connection.on('error', (error) => console.log(`New Error: ${error}`));
        db_connection.once('open', () => console.log('MongoDB connection estabilished.'));
    }; 

    private loginroute(): Router {
        const router: Router = Router();
        return router.post('/api/users/login', LoginUsersController);
    };
    
    private signupRoute(): Router {
        const router: Router = Router();
        return router.post('/api/users/signup', SignupController);
    };

    public start() {
        const app = express();

        app.use(cors());
        app.use(express.json());

        this.connectingDB();

        app.use(this.loginroute);
        app.use(this.signupRoute);

        app.listen(process.env.API_PORT, () => console.log(`API running in: http://localhost:${process.env.API_PORT}`));
    };
};