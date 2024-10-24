import mongoose from "mongoose";

import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter your password"]
        },
        password: {
            type: String,
            required: [true, "Please enter your password"]
        },
        email:{
            type:String,
            required: [true, "Please enter your password"]
        },
    }
);

export const User = model(
    "User",
    userSchema
);

