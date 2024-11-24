import express from 'express';
import 'dotenv/config';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';
import connectToDb from "./db/index.js";

const port = process.env.PORT || 3000;

const app = express();

async function startServer() {

    try {
        await connectToDb();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

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

