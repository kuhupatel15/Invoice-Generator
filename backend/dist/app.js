"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_config_1 = require("./configs/db-config");
const app = (0, express_1.default)();
const port = 5000;
app.get('/', (req, res) => {
    res.send('Hello, TypeScript Node Express!');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// generatePdf();
//cors
const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));
// bodyparser
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: false, limit: '50mb' }));
const route_1 = require("./routes/route");
app.use('/levitation', route_1.lev_route);
(0, db_config_1.connectDB)();
