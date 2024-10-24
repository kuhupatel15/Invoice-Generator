"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = void 0;
const mongoose_1 = require("mongoose");
const invoiceSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "Please enter your password"]
    },
    email: {
        type: String,
        required: [true, "Please enter your password"]
    },
    products: [
        {
            product_name: { type: String },
            product_qty: { type: Number },
            product_price: { type: Number },
            total_amount: { type: Number }
        }
    ],
    total_charge: Number,
    gst: Number,
    total_amount: Number,
}, { timestamps: true });
exports.Invoice = (0, mongoose_1.model)("Invoice", invoiceSchema);
