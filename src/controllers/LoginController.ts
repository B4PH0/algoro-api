import { Response, Request, NextFunction} from 'express';
import cookieparser from 'cookie-parser';
import { LoginAndSignupModel } from '../db/login_and_signup_model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function LoginController(req: Request, res: Response, next: NextFunction) {
    const { email, password_hash } = req.body;
    if (!email) return res.status(422).json({ error: 'Undefined email, please provide one.'});
    if (!password_hash) return res.status(422).json({ error: 'Undefined password, please provide one'});

    const userEmail = await LoginAndSignupModel.findOne({ email: email });

    if (userEmail) {
        const checkPassword: boolean = await bcrypt.compare(password_hash, userEmail.password_hash);
        
        if (!checkPassword) return res.status(422).json({ error: 'Invalid password, please try again.'});

        try {
            const token = jwt.sign({ id: userEmail._id, name: userEmail.name }, process.env.SECRET_HASH, { expiresIn: '1h'});
            res.cookie('token', token, { httpOnly: true });
            return res.status(200).json({ status: 200, message: 'Authorization made'});
            next();
        } catch (err) {
            return res.status(500).json({ status: 500, error: "Server internal error" });
        };
    } else return res.status(404).json({ status: 500, error: 'Email not found, please try another email.'});
};
