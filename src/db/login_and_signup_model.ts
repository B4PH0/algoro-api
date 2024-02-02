import mongoose from 'mongoose';

const modelLoginAndSignup = new mongoose.Schema({
    name: String,
    email: String,
    password_hash: String,
});

const LoginAndSignupModel = mongoose.model('users', modelLoginAndSignup);
export { LoginAndSignupModel };