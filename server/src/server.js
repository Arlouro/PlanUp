import express from 'express';
import passport from 'passport';
import session from 'express-session';
import './passport.js';
import { connectDB } from './config/db.js';
import config from './config/env.js';
import tripRoutes from './routes/tripRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Middleware ---------<
app.use(express.json());
app.use(
    session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes ---------<
app.use('/api/trips', tripRoutes);
app.use('/', authRoutes);

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
