import jwt from "jsonwebtoken";
import { Request, Response ,NextFunction} from 'express';
import { env_config } from './configs/env-config';

import { User } from "./models/user";
export interface UserType {
    _id: string;
    username: string;
    email: string;
    password ?:string; 
}

declare global {
    namespace Express {
        interface Request {
            user?: UserType; 
        }
    }
}
export const isAuthenticated = async (req:Request, res:Response, next:NextFunction) => {
    let token;
    if (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            // console.log(token)
            const decoded :any= jwt.verify(token, env_config.jwt_secret);
            const user: UserType | null = await User.findById(decoded.user.id).select('-password');
            if (!user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }
            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({msg:"Not authorized, token failed",error});
        }
    }
 
    if (!token) {
        res.status(401).json("Not authorized, no token");
    }
};