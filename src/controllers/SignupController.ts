import { Request, Response, NextFunction } from 'express';
import { LoginAndSignupModel } from '../db/login_and_signup_model';
import bcrypt from 'bcrypt';

export async function SignupController(req: Request, res: Response, next: NextFunction) {
    const { name, email, password_hash } = req.body;

    if (!name) return res.status(422).json({ status: 422, message: 'Undefined name, please provide one.'});
    if (!email) return res.status(422).json({ status: 422, message: 'Undefined email, please provide one'});
    if (!password_hash) return res.status(422).json({ status: 422, message: 'Undefined password, please provide one.'});

    const verifyIfUserEmailExists = await LoginAndSignupModel.findOne({ email: email });
    if (!verifyIfUserEmailExists) {
        const passwordEncripted: string = await bcrypt.hash(password_hash, 12);
        const createUser = await LoginAndSignupModel.create({
            name: name,
            email: email,
            password_hash: passwordEncripted
        })
        if (createUser) {
            return res.status(201).json({ status: 201, message: "User created." });
            next();
        };
    } else return res.status(409).json({ status: 409, error: 'User already exists, please try another email.'});
};
