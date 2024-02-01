import { Response, Request, NextFunction} from 'express';
import { LoginModel } from '../db/login-model';

export async function LoginUsersConstrollers(req: Request, res: Response<{statusCode: number}>, next: NextFunction) {
    const { name, email, password_hash } = req.body;
    if (name && email && password_hash) {
        const User = {
            name: name,
            email: email,
            password_hash: password_hash
        };
        await LoginModel.findOne(User).then(() => {
            res.json({ msg: ``})
        })
    };
};
