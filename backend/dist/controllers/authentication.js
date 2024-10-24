"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUp = exports.Login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../configs/env-config");
const user_1 = require("../models/user");
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let user = yield user_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const payload = {
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
        };
        const token = jsonwebtoken_1.default.sign(payload, env_config_1.env_config.jwt_secret, { expiresIn: 360000 });
        yield user.save();
        res.status(200).json({ msg: "Login Successfully", uuserData: { email: user.email, username: user.username }, token });
    }
    catch (err) {
        return res.status(500).json({ msg: err });
    }
});
exports.Login = Login;
const SignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const existing_user = yield user_1.User.exists({ email });
        if (!existing_user) {
            const user = new user_1.User({
                email,
                password,
                username
            });
            const salt = yield bcrypt_1.default.genSalt(10);
            user.password = yield bcrypt_1.default.hash(password, salt);
            const payload = {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                },
            };
            const token = jsonwebtoken_1.default.sign(payload, env_config_1.env_config.jwt_secret, { expiresIn: 360000 });
            yield user.save();
            return res.status(200).json({ userData: { email: user.email, username: user.username }, token });
        }
        return res.status(400).json({ msg: "User already exists" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: err });
    }
});
exports.SignUp = SignUp;
