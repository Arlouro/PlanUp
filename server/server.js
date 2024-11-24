require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware ----------------<
app.use(express.json());
app.use(cors());

// MongoDB Connection ----------------<
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes ----------------<
app.use('/api/trips', require('./routes/tripRoutes'));

// Start Server ----------------<
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
