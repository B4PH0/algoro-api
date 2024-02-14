import { Response, Request, NextFunction} from 'express';
import { LoginAndSignupModel } from '../db/login_and_signup_model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function LoginController(req: Request, res: Response, next: NextFunction) {
    const { email, password_hash } = req.body;
    if (!email) return res.status(404).json({ error: 'Undefined email, please provide one.'});
    if (!password_hash) return res.status(404).json({ error: 'Undefined password, please provide one'});
    const userEmail = await LoginAndSignupModel.findOne({ email: email });
    if (userEmail) {
        const checkPassword: boolean = await bcrypt.compare(password_hash, userEmail.password_hash);
        if (!checkPassword) return res.status(422).json({ error: 'Invalid password, please try again.'});

        try {
            const token = jwt.sign(
                {
                    id: userEmail._id
                },
                process.env.SECRET_HASH
            )
            console.log(token);
            return res.status(200).json({ msg: 'Succesfull authorization realized'})
            next();
        } catch (err) {
            return res.status(500).json({ error: "Server internal error" });
        };
    } else return res.status(404).json({ error: 'Email not found, please try another email.'});
};
