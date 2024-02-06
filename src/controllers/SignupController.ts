import { Request, Response, NextFunction } from 'express';
import { LoginAndSignupModel } from '../db/login_and_signup_model';
import bcrypt from 'bcrypt';

export async function SignupController(req: Request, res: Response, next: NextFunction) {
    const { name, email, password_hash } = req.body;
    if (!name) return res.status(404).json({ msg: 'Undefined name, please provide one.'});
    if (!email) return res.status(404).json({ msg: 'Undefined email, please provide one'});
    if (!password_hash) return res.status(404).json({ msg: 'Undefined password, please provide one.'});
    const verifyIfUserEmailExists = await LoginAndSignupModel.findOne({ email: email });
    if (!verifyIfUserEmailExists) {
        const passwordEncripted: string = await bcrypt.hash(password_hash, 12);
        await LoginAndSignupModel.create({
            name: name,
            email: email,
            password_hash: passwordEncripted
        }).then(() => { return res.status(201).json({ msg: 'User created'})});
    } else return res.status(409).json({ error: 'User already exists, please try another email.'});
    next();
};
