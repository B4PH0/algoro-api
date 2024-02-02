import { Request, Response, NextFunction } from 'express';
import { LoginAndSignupModel } from '../db/login_and_signup_model';

export async function SignupController(req: Request, res: Response, next: NextFunction) {
    const { name, email, password_hash } = req.body;
    const User = {
        name: name, 
        email: email,
        password_hash: password_hash
    };
    if (!name) return res.status(404).json({ msg: 'Undefined name, please provide one.'});
    if (!email) return res.status(404).json({ msg: 'Undefined email, please provide one'});
    if (!password_hash) return res.status(404).json({ msg: 'Undefined password, please provide one.'});
    const verifyIfUserEmailExists = await LoginAndSignupModel.findOne({ email: User.email });
    if (!verifyIfUserEmailExists) {
        const verifyIfUserNameExists = await LoginAndSignupModel.findOne({ name: User.name });
        if (!verifyIfUserNameExists) {
            return res.status(201).json({ msg: 'User created' });
        } else res.status(409).json({ error: 'User already exists, please try another name.'});
    } else return res.status(409).json({ error: 'User already exists, please try another email.'});
};
