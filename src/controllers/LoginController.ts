import { Response, Request, NextFunction} from 'express';
import { LoginAndSignupModel } from '../db/login_and_signup_model';

export async function LoginUsersController(req: Request, res: Response, next: NextFunction) {
    const { email, password_hash } = req.body;
    if (!email) return res.status(404).json({ error: 'Undefined email, please provide one.'});
    if (!password_hash) return res.status(404).json({ error: 'Undefined email, please provide one'});
    const verifyIfEmailsExists = await LoginAndSignupModel.findOne({ email: email })
    if (verifyIfEmailsExists) {
        
    } else return res.status(404).json({ error: 'Email not found, please try another email.'});
    next();
};
