import express from 'express';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import connectMongoDB from './db/connect.MongoDB.js'

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3030;

app.use('/api/auth', authRoutes);

app.use(express.json()); // to parse req.body

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`)
    connectMongoDB()
});