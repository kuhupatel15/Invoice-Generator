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
exports.generatePdf = void 0;
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const generatePdf = (_a) => __awaiter(void 0, [_a], void 0, function* ({ productList, gst, total_amount, total_charge, username, email, date }) {
    try {
        const browser = yield puppeteer_core_1.default.launch({
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            headless: true
        });
        const page = yield browser.newPage();
        const content = `
            <html>
<head>
    <title>Invoice Generator</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
    </style>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-2xl mx-auto bg-white shadow-lg p-6 mb-6">
        <div class="flex justify-between mb-4">
            <h1 class="text-2xl font-semibold">INVOICE GENERATOR</h1>
            <div class="text-xs uppercase font-semibold">levitation</div>
        </div>
        <div class="bg-black relative text-white p-4 rounded-lg mb-6">
            <div class="mb-2">
                <span class="block text-sm text-gray-300">Traveller Name</span>
                <span class="block text-lg">${username}</span>
            </div>
            <div>
                <span class="block text-sm text-gray-300">${email}</span>
            </div>
            <div class="text-sm text-gray-300 absolute top-4 right-4">
                Date: ${date}
            </div>
        </div>
        <table class="w-full text-left mb-6">
            <thead class="rounded-lg">
                <tr>
                    <th class="pb-2">Product</th>
                    <th class="pb-2">Qty</th>
                    <th class="pb-2">Rate</th>
                    <th class="pb-2">Total Amount</th>
                </tr>
            </thead>
            <tbody>
            ${productList === null || productList === void 0 ? void 0 : productList.map((p) => {
            return (`
                <tr>
                    <td>${p.product_name}</td>
                    <td>${p.product_qty}</td>
                    <td>${p.product_price}</td>
                    <td>${p.total_amount}</td>
                </tr>
                
            `);
        })}</tbody>
        </table>
        <div class="bg-gray-200 w-30 p-4 rounded-lg">
            <div class="flex justify-between mb-2">
                <span>Total Charges</span>
                <span>${total_amount}</span>
            </div>
            <div class="flex justify-between mb-2">
                <span>GST (18%)</span>
                <span>${gst}</span>
            </div>
            <div class="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>${total_charge}</span>
            </div>
        </div>
        <div class="text-xs text-center mt-6">
            <span class="block">Date: ${date}</span>
        </div>
    </div>
    <div class="max-w-2xl mx-auto text-center p-2 bg-white text-xs">
        <p>We are pleased to provide any further information you may require and look forward to assisting with your next order. Rest assured, it will receive our prompt and dedicated attention.</p>
    </div>
</body>
</html>
        `;
        yield page.setContent(content);
        yield page.emulateMediaType('screen');
        yield page.pdf({
            path: 'invoice.pdf',
            format: 'A4',
        });
        yield browser.close();
    }
    catch (err) {
        console.log(err);
    }
});
exports.generatePdf = generatePdf;
