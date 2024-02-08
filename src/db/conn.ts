import mongoose, { Connection} from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(`${process.env.DB_CONNECTION_STRING}`);
const db_connection: Connection = mongoose.connection;
export {
    db_connection
}

