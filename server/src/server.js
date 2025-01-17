import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import './passport.js';
import { connectDB } from './config/db.js';
import config from './config/env.js';
import tripRoutes from './routes/tripRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// CORS ---------<
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware ---------<
app.use(express.json());
app.use(
    session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        }
    })
);

app.use((req, res, next) => {
    console.log('Current session:', req.session);
    console.log('Current user:', req.user);
    next();
});

app.use(passport.initialize());
app.use(passport.session());

// Routes ---------<
app.use('/', authRoutes);
app.use('/api/trips', tripRoutes);


// Start server ---------<
const startServer = async () => {
    try {
        await connectDB(config.mongoURI);
        app.listen(config.port, () => {
            console.log(`✅ Server is running on http://localhost:${config.port}`);
        });
    } catch (error) {
        console.error('❌ Error starting the server:', error.message);
    }
};

startServer();

