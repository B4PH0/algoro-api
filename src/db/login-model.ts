import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    name: String,
    email: String,
    password_hash: String
});

const LoginModel = mongoose.model('Usuario', loginSchema);
export {
    LoginModel
};

