const { MongoClient } = require('mongodb');

async function run() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('grocery_app');
    const collection = db.collection('products');

    const verified = {
      'Apple': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?q=80&w=800&auto=format&fit=crop',
      'Banana': 'https://images.unsplash.com/photo-1571771894821-ad990241ec7a?q=80&w=800&auto=format&fit=crop',
      'Mango': 'https://images.unsplash.com/photo-1553334820-1372ef4b0f33?q=80&w=800&auto=format&fit=crop',
      'Orange': 'https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=800&auto=format&fit=crop',
      'Papaya': 'https://images.unsplash.com/photo-1621973215918-62043f1190bc?q=80&w=800&auto=format&fit=crop',
      'Pineapple': 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=800&auto=format&fit=crop',
      'Grapes': 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=800&auto=format&fit=crop',
      'Watermelon': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800&auto=format&fit=crop',
      'Potato': 'https://images.unsplash.com/photo-1518977676601-b53f02bad675?q=80&w=800&auto=format&fit=crop',
      'Carrot': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=800&auto=format&fit=crop',
      'Onion': 'https://images.unsplash.com/photo-1508747703725-719777637510?q=80&w=800&auto=format&fit=crop',
      'Tomato': 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?q=80&w=800&auto=format&fit=crop',
      'Garlic': 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=800&auto=format&fit=crop',
      'Ginger': 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=800&auto=format&fit=crop',
      'Spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800&auto=format&fit=crop',
      'Broccoli': 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?q=80&w=800&auto=format&fit=crop',
      'Cauliflower': 'https://images.unsplash.com/photo-1568584711075-3d021a7c3fb3?q=80&w=800&auto=format&fit=crop',
      'Cabbage': 'https://images.unsplash.com/photo-1592393302758-c92257252086?q=80&w=800&auto=format&fit=crop',
      'Cucumber': 'https://images.unsplash.com/photo-1449339854873-750e6913301b?q=80&w=800&auto=format&fit=crop',
      'Green Chili': 'https://images.unsplash.com/photo-1588253518671-53644fcfc21a?q=80&w=800&auto=format&fit=crop',
      'Strawberry': 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=800&auto=format&fit=crop',
      'Kiwi': 'https://images.unsplash.com/photo-1585059895524-72359e061381?q=80&w=800&auto=format&fit=crop',
      'Pomegranate': 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=800&auto=format&fit=crop',
      'Guava': 'https://images.unsplash.com/photo-1608985161044-67258a18374d?q=80&w=800&auto=format&fit=crop',
      'Almonds': 'https://images.unsplash.com/photo-1508815121300-4b4137d0240d?q=80&w=800&auto=format&fit=crop',
      'Cashews': 'https://images.unsplash.com/photo-1504192010706-90f77e48710b?q=80&w=800&auto=format&fit=crop',
      'Pistachios': 'https://images.unsplash.com/photo-1615485240384-552e4c16cab8?q=80&w=800&auto=format&fit=crop',
      'Dates': 'https://images.unsplash.com/photo-1596701124268-96105f6bc185?q=80&w=800&auto=format&fit=crop',
      'Walnuts': 'https://images.unsplash.com/photo-1589733901241-5e5da4bbefbb?q=80&w=800&auto=format&fit=crop'
    };

    const products = await collection.find({}).toArray();
    console.log(`Updating ${products.length} products...`);
    
    for (const p of products) {
      let finalImage = null;
      for (const key in verified) {
        if (p.name.toLowerCase().includes(key.toLowerCase())) {
          finalImage = verified[key];
          break;
        }
      }
      
      if (!finalImage) {
        finalImage = 'https://placehold.co/800x800/faf9f6/154212?text=' + encodeURIComponent(p.name.split(' (')[0]);
      }
      
      await collection.updateOne({ _id: p._id }, { $set: { image: finalImage } });
    }
    console.log('Image strict mapping completed successfully.');
  } finally {
    await client.close();
  }
}

run().catch(console.error);
