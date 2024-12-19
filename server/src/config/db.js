import { MongoClient } from 'mongodb';

let db;

export const connectDB = async (mongoURI) => {
    if (!mongoURI) {
        throw new Error('❌ MongoDB connection string is undefined. Check your environment variables.');
    }

    try {
        const client = new MongoClient(mongoURI);
        await client.connect();
        db = client.db();
        console.log('✅ MongoDB connected successfully!');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        throw error;
    }
};

export const getDB = () => {
    if (!db) {
        throw new Error('❌ Database not connected. Please call connectDB first.');
    }
    return db; 
};
