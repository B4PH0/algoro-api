import mongoose, { Connection} from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + '/.env'});

mongoose.connect(`${process.env.DB_CONNECTION_STRING}`);
const db_connection: Connection = mongoose.connection;
export {
    db_connection
}

