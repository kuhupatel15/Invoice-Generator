import express from 'express';
import { connectDB } from './configs/db-config';
import { generatePdf } from './puppeteer';
const app = express();
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
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

import { lev_route } from './routes/route';
app.use('/levitation',lev_route)

connectDB();