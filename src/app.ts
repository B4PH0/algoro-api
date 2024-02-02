import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';
import { db_connection } from './db/conn';
import { loginRoute, signupRoute } from './routes/routes';
import { errHandlerMiddleware } from './middleware/errMidleware';
import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + '.env'});

const app = express();
app.use(cors());
app.use(express.json());
db_connection.on('error', (error) => console.log(`Erro: ${error}`));
db_connection.once('open', () => console.log('Conexão com o mongoDB estabilizada'));
app.use(loginRoute);
app.use(signupRoute);
app.use(errHandlerMiddleware);
app.listen(process.env.API_PORT, () => console.log(`API port: ${process.env.API_PORT}`));

