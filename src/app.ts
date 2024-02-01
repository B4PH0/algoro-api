import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';
import { db_connection } from './db/conn';
import { loginRoute } from './routes/login';

const app = express();
app.use(cors());
app.use(express.json());
db_connection.on('error', (error) => console.log(`Erro: ${error}`));
db_connection.once('open', () => console.log('Conexão estabilizada'));
app.use(loginRoute);
app.listen(3000, () => console.log('Rodando em localhost:3000'));

