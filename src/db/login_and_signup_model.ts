import mongoose from 'mongoose';

const modelLoginAndSignup = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password_hash: {
        type: String,
        required: true
    },
}, { timestamps: true });

const LoginAndSignupModel = mongoose.model('users', modelLoginAndSignup);
export { LoginAndSignupModel };