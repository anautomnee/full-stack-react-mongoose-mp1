import express from 'express';
import 'dotenv/config';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';
import connectToDb from "./db/index.js";
import cors from "cors";

const port = process.env.PORT || 3000;

const app = express();

const corsOptions = {
    origin: function (origin, callback) {
        // Разрешаем запросы с этих двух источников
        if (origin === `http://${process.env.HOST_IP}` || origin === `http://${process.env.HOST_IP}:3001` || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },  // Use the public IP in production, localhost in development
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    preflightContinue: false,
};

async function startServer() {

    try {
        await connectToDb();
        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use('/auth', authRouter);
        app.use('/posts', postsRouter);

        app.listen(port, '0.0.0.0', () => {
            console.log('Server is running on port http://localhost:' + port);
        });

    } catch (error) {
        console.error('Error starting server: ', error);
    }
}

startServer();

