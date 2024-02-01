import mongoose, { Connection, mongo } from 'mongoose';
import {db_key} from './config/db.json'

mongoose.connect(db_key);
const db_connection: Connection = mongoose.connection;
export {
    db_connection
};

