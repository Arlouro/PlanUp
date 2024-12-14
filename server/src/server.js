import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import tripRoutes from './routes/tripRoutes.js';

dotenv.config();

const app = express();

// Middleware --------------<
app.use(express.json());

// Routes --------------<
app.use('/api/trips', tripRoutes);

// Start server --------------<
const PORT = process.env.PORT || 5000;
const dev_mode = process.env.NODE_ENV || 'prod';

connectDB().then(() => {
    if (dev_mode === 'dev') {
        console.log('Running in development mode. Seeding database...');
        require('./seed.js');
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.error('Failed to connect to database:', err);
});
