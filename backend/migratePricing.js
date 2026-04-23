import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const migrate = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    const products = await Product.find({});
    console.log(`Found ${products.length} products to update`);

    for (const product of products) {
      let unit = 'piece';
      let pricingOptions = [];
      const basePrice = product.price;

      const cat = product.category.toLowerCase();
      if (cat === 'vegetables' || cat === 'fruits') {
        unit = 'kg';
        pricingOptions = [
          { label: '500g', value: 0.5, price: basePrice * 0.5 },
          { label: '1kg', value: 1, price: basePrice },
          { label: '2kg', value: 2, price: basePrice * 2 }
        ];
      } else if (cat === 'dry fruits') {
        unit = 'gram';
        pricingOptions = [
          { label: '100g', value: 100, price: basePrice },
          { label: '250g', value: 250, price: basePrice * 2.5 },
          { label: '500g', value: 500, price: basePrice * 5 }
        ];
      } else if (cat === 'dairy' || cat === 'liquids') {
        unit = 'litre';
        pricingOptions = [
          { label: '500ml', value: 0.5, price: basePrice * 0.5 },
          { label: '1L', value: 1, price: basePrice },
          { label: '2L', value: 2, price: basePrice * 2 }
        ];
      } else {
        unit = 'piece';
        pricingOptions = [
          { label: '1 Piece', value: 1, price: basePrice },
          { label: '2 Pieces', value: 2, price: basePrice * 2 }
        ];
      }

      product.unit = unit;
      product.pricingOptions = pricingOptions;
      // Convert price from $ to rupees assuming roughly 80 multiplier, wait, user says "Convert all prices from $ to ₹".
      // Let's just assume the base price number stays same, or if they want realistic ₹ price, 40$ tomato -> ₹40 tomato.
      // So no need to multiply basePrice if they just meant the symbol, except maybe if they wanted it multiplied by 80.
      // User says: "Example: Tomato (500g) -> ₹20". Tomato basePrice 40 -> 500g is ₹20. So keep the numbers.
      await product.save();
    }
    
    console.log('✅ Migration completed!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

migrate();
