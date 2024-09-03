import express from 'express';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import connectMongoDB from './db/connect.MongoDB.js'
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3030;

dotenv.config();

app.use(express.urlencoded({ extended: true })); // to parse form data (urlencoded)
app.use(express.json()); // to parse req.body

app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`)
    connectMongoDB()
});