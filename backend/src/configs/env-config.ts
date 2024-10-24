import dotenv from "dotenv";
dotenv.config();

export const env_config = {
    jwt_secret : process.env.JWT_SECRET || "",
    jwt_token_expire : process.env.JWT_TOKEN_EXPIRE || "",
    mongodb_url : process.env.MONGO_URL || "",
    
}