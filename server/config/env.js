import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ 
  path: path.resolve(__dirname, '../../.env') 
});

export const config = {
  port: process.env.PORT ?? 5000,
  mongoUri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/trip-planner',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  isDevelopment: process.env.NODE_ENV === 'development'
};