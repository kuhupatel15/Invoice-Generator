import mongoose from "mongoose";

import { Schema, model } from "mongoose";

const invoiceSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter your password"]
        },
        email:{
            type:String,
            required: [true, "Please enter your password"]
        },
        products:[
            {
                product_name:{type:String},
                product_qty:{type:Number},
                product_price:{type:Number},
                total_amount:{type:Number}
            }
        ],
        total_charge:Number,
        gst:Number,
        total_amount:Number,
    },        {timestamps:true}

);

export const Invoice = model(
    "Invoice",
    invoiceSchema
);

