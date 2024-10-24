"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env_config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env_config = {
    jwt_secret: process.env.JWT_SECRET || "",
    jwt_token_expire: process.env.JWT_TOKEN_EXPIRE || "",
    mongodb_url: process.env.MONGO_URL || "",
};
