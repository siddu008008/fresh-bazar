import mongoose from 'mongoose';
import dotenv from 'dotenv';
import products from './data/products.js';
import Product from './models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/grocery_app';

const importData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        await Product.deleteMany();
        await Product.insertMany(products);

        console.log('✅ Catalog Expanded & Images Updated!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        await Product.deleteMany();
        console.log('🗑️ Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
