import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/grocery_app';

const makeAdmins = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        // Reset everyone to 'user'
        await User.updateMany({}, { role: 'user' });
        // Set guru@gamil.com to 'admin'
        await User.updateOne({ email: 'guru@gamil.com' }, { role: 'admin' });
        console.log('✅ Only guru@gamil.com is admin now!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

makeAdmins();
