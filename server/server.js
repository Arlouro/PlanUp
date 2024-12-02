require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const tripRoutes = require('./routes/tripRoutes');

const app = express();

// Middleware --------------<
app.use(express.json());
app.use(cors());

// Routes --------------<
app.use('/api/trips', tripRoutes);

// Start server --------------<
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.error('Failed to connect to DB:', err);
    process.exit(1);
});
