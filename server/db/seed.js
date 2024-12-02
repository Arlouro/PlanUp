const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config();

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:6000/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3";
const environment = process.env.NODE_ENV || 'prod';
const client = new MongoClient(uri);

const seedDatabase = async () => {
    if (environment !== 'dev') {
        console.log(`Seeding skipped. Current environment: ${environment}`);
        return;
    }

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('planup-webapp');

        // Clear existing data
        await db.collection('trips').deleteMany({});
        console.log('Cleared trips collection');

        // Seed trips
        const trips = JSON.parse(fs.readFileSync('./db/data-dev/trips.json', 'utf8'));
        await db.collection('trips').insertMany(trips);
        console.log('Seeded trips collection');

        // Seed users (if applicable)
        const users = JSON.parse(fs.readFileSync('./db/data-dev/users.json', 'utf8'));
        await db.collection('users').deleteMany({});
        await db.collection('users').insertMany(users);
        console.log('Seeded users collection');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        await client.close();
        console.log('Database connection closed');
    }
};

seedDatabase();
