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
exports.AddProduct = void 0;
const invoice_1 = require("../models/invoice");
const path_1 = __importDefault(require("path"));
const puppeteer_1 = require("../puppeteer");
const AddProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productList, total_charge, gst, total_amount } = req.body;
        const products = yield new invoice_1.Invoice({
            products: productList,
            gst,
            total_amount,
            total_charge
        });
        const user = req.user;
        const username = user === null || user === void 0 ? void 0 : user.username;
        const email = user === null || user === void 0 ? void 0 : user.email;
        (0, puppeteer_1.generatePdf)({ productList, total_charge, gst, total_amount, username, email });
        const options = {
            root: path_1.default.join('./')
        };
        const fileName = 'invoice.pdf';
        res.status(200).sendFile(fileName, options, function (err) {
            if (err) {
                console.error('Error sending file:', err);
            }
            else {
                console.log('Sent:', fileName);
            }
        });
        // res.status(200).json(products);
    }
    catch (err) {
        console.log(err);
    }
});
exports.AddProduct = AddProduct;
