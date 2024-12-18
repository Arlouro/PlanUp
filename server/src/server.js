import express from 'express';
import { connectDB } from './config/db.js';
import config from './config/env.js';
import tripRoutes from './routes/tripRoutes.js';

const app = express();

// Middleware ---------<
app.use(express.json());

// Routes ---------<
app.get('/', (request, response) => {
    response.send('✈️ PlanUP is running...');
});

app.use('/api/trips', tripRoutes);

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
