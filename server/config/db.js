const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI; 
const client = new MongoClient(uri);

let db;

const connectDB = async () => {
    try {
        await client.connect();
        db = client.db('data');
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
