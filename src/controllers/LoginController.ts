import { Response, Request, NextFunction} from 'express';
import { LoginAndSignupModel } from '../db/login_and_signup_model';

export async function LoginUsersController(req: Request, res: Response, next: NextFunction) {
    const { email, password_hash } = req.body;
    if (!email) return res.status(404).json({ error: 'Undefined email, please provide one.'});
    if (!password_hash) return res.status(404).json({ error: 'Undefined email, please provide one'})
    if (email && password_hash) {
        const User = {
            email: email,
            password_hash: password_hash
        };
        await LoginAndSignupModel.findOne({ email: User.email }).then((sucess) => {
            console.log(sucess);
        });

        // Authentication user
    };
    
};
