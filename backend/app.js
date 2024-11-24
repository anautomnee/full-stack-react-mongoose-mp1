import express from 'express';
import 'dotenv/config';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';
import connectToDb from "./db/index.js";
import cors from "cors";

const port = process.env.PORT || 3000;

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',  // Allow requests from this origin
    methods: ['GET', 'POST'],         // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};

async function startServer() {

    try {
        await connectToDb();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors(corsOptions));

        app.use('/auth', authRouter);
        app.use('/posts', postsRouter);

        app.get('/', (req, res) => {
            res.send('Hello World!');
        });

        app.listen(port, () => {
            console.log('Server is running on port http://localhost:' + port);
        });

    } catch (error) {
        console.error('Error starting server: ', error);
    }
}

startServer();

