const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:6000/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3";
const client = new MongoClient(uri);

let db;

const connectDB = async () => {
    try {
        await client.connect();
        db = client.db('trip-planner');
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

const getDB = () => {
    if (!db) throw new Error('Database not connected');
    return db;
};

module.exports = { connectDB, getDB };
