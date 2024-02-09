import express, { Router, Express } from "express";
import cors from 'cors';
import morgan from 'morgan';
import { db_connection } from "../db/conn";
import { LoginUsersController } from "../controllers/LoginController";
import { SignupController } from "../controllers/SignupController";
import dotenv from 'dotenv';
dotenv.config();    

export default new class AlgoroAPI {
    private app: express.Application

    constructor() {
        this.app = express();
        this.setup();
    };

    private setup(): void {
        this.app.use(express.json());
        this.app.use(cors());

        this.DBConnection();

        this.app.use(morgan('dev'));

        this.setupRoutes();
    }

    private DBConnection(): void {
        db_connection.on('error', (erro) => console.error(`New error: ${erro}`));
        db_connection.once('open', () => console.log('MongoDB connection estabilished'));
    };

    private setupRoutes(): void {
        this.app.post('/api/users/login', LoginUsersController);
        this.app.post('/api/users/signup', SignupController);
    };

    public start(): void {
        this.app.listen(process.env.API_PORT, () => console.log(`API running in: http://localhost:${process.env.API_PORT}/api/users`));
    }
}