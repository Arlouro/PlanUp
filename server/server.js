require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const tripRoutes = require('./routes/tripRoutes');

const app = express();

// Middleware --------------<
app.use(express.json());

// Routes --------------<
app.use('/api/trips', tripRoutes);

// Start server --------------<
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    if (process.env.NODE_ENV === 'development') {
        console.log('Running in development mode. Seeding database...');
        require('./db/seed');
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.error('Failed to connect to database:', err);
});
