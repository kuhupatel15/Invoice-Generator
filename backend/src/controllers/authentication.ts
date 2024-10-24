import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env_config } from '../configs/env-config';
import { User } from '../models/user';

export const Login = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;
        let user: any = await User.findOne({ email});

        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const payload = {
            user: {
                id: user._id,
                username:user.username,
                email:user.email
            },
        };

        const token = jwt.sign(
            payload,
            env_config.jwt_secret,
            { expiresIn: 360000 })
        await user.save();
        res.status(200).json({ msg: "Login Successfully", uuserData:{email:user.email,username:user.username}, token });
    } catch (err) {
        return res.status(500).json({ msg: err })
    }

}

export const SignUp = async (req: Request, res: Response) => {
    try {
        const { username, email,  password } = req.body;
        
        const existing_user = await User.exists({ email });
        if (!existing_user) {
            const user = new User({
                email,
                password,
                username
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);
            const payload = {
                user: {
                    id: user._id,
                username:user.username,
                email:user.email
                },
            };
            const token = jwt.sign(payload, env_config.jwt_secret, { expiresIn: 360000 })
            await user.save();
            return res.status(200).json({ userData:{email:user.email,username:user.username}, token });
        }

        return res.status(400).json({ msg: "User already exists" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: err })
    }
}

