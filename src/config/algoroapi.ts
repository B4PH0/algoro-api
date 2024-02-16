import express, { Request, Response } from "express";
import cors from 'cors';
import cookieparser from 'cookie-parser';
import morgan from 'morgan';
import { db_connection } from "../db/conn";
import { LoginController } from "../controllers/LoginController";
import { SignupController } from "../controllers/SignupController";
import checkToken from '../function/checkToken'
import { config } from 'dotenv';
config();

export default new class AlgoroApi {
    private app: express.Application

    constructor() {
        this.app = express();
        this.setup();
    };

    private setup(): void {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(cookieparser());
        this.app.use(express.urlencoded({ extended: true }));
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
        this.app.get('/private', checkToken, (req: Request, res: Response) => {
            return res.json({ message: `Welcome ${req.body.name} to your private route!!` });
        });
    };

    public start(): void {
        this.DBConnection();
        this.app.listen(process.env.API_PORT, () => console.log(`API running in: http://localhost:${process.env.API_PORT}/api/users`));
    };
};  