import express, { Router } from "express";
import cors from 'cors';
import morgan from 'morgan';
import { db_connection } from "../db/conn";
import { LoginController } from "../controllers/LoginController";
import { SignupController } from "../controllers/SignupController";
import checkToken from './checkToken'
import dotenv from 'dotenv';
dotenv.config();

export class AlgoroApi {
    private app: express.Application

    constructor() {
        this.app = express();
        this.setup();
    };

    private setup(): void {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.setupRoutes();
    };

    private DBConnection(): void {
        db_connection.on('error', (error) => console.error(`New error: ${error}`));
        db_connection.once('open', () => console.log('MongoDB connection estabilished.'));
    };

    private setupRoutes(): void {
        this.app.post('/api/users/login', LoginController);
        this.app.post('/api/users/signup', SignupController);
        
    };

    public start(): void {
        this.DBConnection();
        this.app.listen(process.env.API_PORT, () => console.log(`API running in: http://localhost:${process.env.API_PORT}/api/users`));
    };
};  