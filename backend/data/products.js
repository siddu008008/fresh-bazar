const products = [
  // FRUITS
  { name: "Apple", brand: "Fresh Bazar", description: "Crisp and juicy premium apples.", price: 180, unit: "kg", image: "/images/apple.png", category: "Fruits", stock: 100 },
  { name: "Banana", brand: "Fresh Bazar", description: "Ripe and sweet yellow bananas.", price: 60, unit: "dozen", image: "/images/banana.webp", category: "Fruits", stock: 100 },
  { name: "Mango", brand: "Fresh Bazar", description: "Sweet and aromatic Alphonso mangoes.", price: 250, unit: "kg", image: "/images/mango.png", category: "Fruits", stock: 100 },
  { name: "Orange", brand: "Fresh Bazar", description: "Fresh and citrusy oranges.", price: 120, unit: "kg", image: "/images/orange.png", category: "Fruits", stock: 100 },
  { name: "Papaya", brand: "Fresh Bazar", description: "Nutritious and ripe papaya.", price: 50, unit: "kg", image: "/images/papaya.webp", category: "Fruits", stock: 100 },
  { name: "Watermelon", brand: "Fresh Bazar", description: "Refreshing and sweet watermelon.", price: 40, unit: "kg", image: "/images/watermelon.webp", category: "Fruits", stock: 100 },
  { name: "Pineapple", brand: "Fresh Bazar", description: "Tropical and sweet pineapple.", price: 90, unit: "piece", image: "/images/pineapple.webp", category: "Fruits", stock: 100 },
  { name: "Pomegranate", brand: "Fresh Bazar", description: "Juicy and vibrant red pomegranate.", price: 160, unit: "kg", image: "/images/pomegranate.png", category: "Fruits", stock: 100 },
  { name: "Grapes Green", brand: "Fresh Bazar", description: "Sweet and seedless green grapes.", price: 100, unit: "kg", image: "/images/grapes_green.webp", category: "Fruits", stock: 100 },
  { name: "Grapes Black", brand: "Fresh Bazar", description: "Succulent black grapes.", price: 140, unit: "kg", image: "/images/grapes_black.webp", category: "Fruits", stock: 100 },
  { name: "Strawberry", brand: "Fresh Bazar", description: "Fresh and tangy red strawberries.", price: 220, unit: "box", image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=800&auto=format&fit=crop", category: "Fruits", stock: 100 },
  { name: "Blueberry", brand: "Fresh Bazar", description: "Antioxidant-rich fresh blueberries.", price: 350, unit: "box", image: "/images/Blueberry.jpg", category: "Fruits", stock: 100 },
  { name: "Guava", brand: "Fresh Bazar", description: "Hard and sweet fresh guava.", price: 70, unit: "kg", image: "/images/guava.webp", category: "Fruits", stock: 100 },
  { name: "Kiwi", brand: "Fresh Bazar", description: "Tangy and fiber-rich kiwi fruit.", price: 300, unit: "kg", image: "/images/kiwi.png", category: "Fruits", stock: 100 },
  { name: "Dragon Fruit", brand: "Fresh Bazar", description: "Exotic and vibrant dragon fruit.", price: 150, unit: "piece", image: "/images/dragon_fruit.webp", category: "Fruits", stock: 100 },
  { name: "Custard Apple", brand: "Fresh Bazar", description: "Creamy and sweet custard apple.", price: 120, unit: "kg", image: "/images/Custard_Apple.webp", category: "Fruits", stock: 100 },
  { name: "Sapota (Chikoo)", brand: "Fresh Bazar", description: "Sweet and malty sapota.", price: 80, unit: "kg", image: "/images/sapota.webp", category: "Fruits", stock: 100 },
  { name: "Jackfruit", brand: "Fresh Bazar", description: "Large and meaty fresh jackfruit.", price: 100, unit: "kg", image: "/images/Jackfruit.jpg", category: "Fruits", stock: 100 },
  { name: "Lychee", brand: "Fresh Bazar", description: "Floral and juicy lychees.", price: 200, unit: "kg", image: "/images/Lychee.jpg", category: "Fruits", stock: 100 },
  { name: "Pear", brand: "Fresh Bazar", description: "Smooth and sweet premium pears.", price: 160, unit: "kg", image: "/images/Pear.jpg", category: "Fruits", stock: 100 },
  { name: "Plum", brand: "Fresh Bazar", description: "Dark and juicy red plums.", price: 180, unit: "kg", image: "/images/Plum.jpg", category: "Fruits", stock: 100 },
  { name: "Peach", brand: "Fresh Bazar", description: "Fuzzy and sweet fresh peaches.", price: 220, unit: "kg", image: "/images/Peach.jpg", category: "Fruits", stock: 100 },
  { name: "Apricot", brand: "Fresh Bazar", description: "Soft and sweet orange apricots.", price: 250, unit: "kg", image: "/images/Apricot.jpg", category: "Fruits", stock: 100 },
  { name: "Sweet Lime (Mosambi)", brand: "Fresh Bazar", description: "Refreshing sweet lime.", price: 100, unit: "kg", image: "/images/sweet_lime.webp", category: "Fruits", stock: 100 },
  { name: "Fig Fresh", brand: "Fresh Bazar", description: "Soft and pulpy fresh figs.", price: 300, unit: "kg", image: "/images/Fig_Fresh.jpg", category: "Fruits", stock: 100 },
  { name: "Muskmelon", brand: "Fresh Bazar", description: "Sweet and refreshing muskmelon.", price: 60, unit: "kg", image: "/images/muskmelon.webp", category: "Fruits", stock: 100 },

  // VEGETABLES
  { name: "Tomato", brand: "Fresh Bazar", description: "Farm fresh red tomatoes.", price: 40, unit: "kg", image: "/images/tomato.jpg", category: "Vegetables", stock: 100 },
  { name: "Potato", brand: "Fresh Bazar", description: "Universal multipurpose potatoes.", price: 30, unit: "kg", image: "/images/potato.jpg", category: "Vegetables", stock: 100 },
  { name: "Onion", brand: "Fresh Bazar", description: "Essential red onions.", price: 35, unit: "kg", image: "/images/onion.jpg", category: "Vegetables", stock: 100 },
  { name: "Carrot", brand: "Fresh Bazar", description: "Crunchy orange carrots.", price: 50, unit: "kg", image: "/images/carrot.jpg", category: "Vegetables", stock: 100 },
  { name: "Cabbage", brand: "Fresh Bazar", description: "Fresh green cabbage.", price: 40, unit: "kg", image: "/images/cabbage.jpg", category: "Vegetables", stock: 100 },
  { name: "Cauliflower", brand: "Fresh Bazar", description: "Vibrant white cauliflower.", price: 45, unit: "piece", image: "/images/cauliflower.jpg", category: "Vegetables", stock: 100 },
  { name: "Brinjal", brand: "Fresh Bazar", description: "Purple and fresh brinjals.", price: 50, unit: "kg", image: "/images/brinjal.jpg", category: "Vegetables", stock: 100 },
  { name: "Lady Finger", brand: "Fresh Bazar", description: "Tender and green okra.", price: 60, unit: "kg", image: "/images/Lady_Finger.webp", category: "Vegetables", stock: 100 },
  { name: "Green Chilli", brand: "Fresh Bazar", description: "Spicy and fresh green chillies.", price: 80, unit: "kg", image: "/images/green_chilli.jpg", category: "Vegetables", stock: 100 },
  { name: "Capsicum", brand: "Fresh Bazar", description: "Bell peppers from the farm.", price: 60, unit: "kg", image: "/images/capsicum.jpg", category: "Vegetables", stock: 100 },
  { name: "Broccoli", brand: "Fresh Bazar", description: "Nutrient-dense green broccoli.", price: 90, unit: "piece", image: "/images/broccoli.jpg", category: "Vegetables", stock: 100 },
  { name: "Beetroot", brand: "Fresh Bazar", description: "Earthy and red beetroot.", price: 45, unit: "kg", image: "/images/Beetroot.webp", category: "Vegetables", stock: 100 },
  { name: "Radish", brand: "Fresh Bazar", description: "Sharp and crunchy radishes.", price: 25, unit: "kg", image: "/images/radish.webp", category: "Vegetables", stock: 100 },
  { name: "Bottle Gourd", brand: "Fresh Bazar", description: "Fresh long bottle gourd.", price: 40, unit: "kg", image: "/images/Bottle_Gourd.webp", category: "Vegetables", stock: 100 },
  { name: "Bitter Gourd", brand: "Fresh Bazar", description: "Nutritious bitter gourd.", price: 60, unit: "kg", image: "/images/bitter-gourd.webp", category: "Vegetables", stock: 100 },
  { name: "Ridge Gourd", brand: "Fresh Bazar", description: "Fibrous and fresh ridge gourd.", price: 50, unit: "kg", image: "/images/Ridge_Gourd.webp", category: "Vegetables", stock: 100 },
  { name: "Cucumber", brand: "Fresh Bazar", description: "Cool and crisp cucumbers.", price: 30, unit: "kg", image: "/images/cucumber.jpg", category: "Vegetables", stock: 100 },
  { name: "Green Peas", brand: "Fresh Bazar", description: "Freshly shelled green peas.", price: 80, unit: "kg", image: "/images/green_peas.jpg", category: "Vegetables", stock: 100 },
  { name: "Lemon", brand: "Fresh Bazar", description: "Tangy and juicy yellow lemons.", price: 5, unit: "piece", image: "/images/lemon.jpg", category: "Vegetables", stock: 100 },
  { name: "Spring Onion", brand: "Fresh Bazar", description: "Fresh green spring onions.", price: 20, unit: "bunch", image: "/images/spring_onion.jpg", category: "Vegetables", stock: 100 },
  { name: "Ginger", brand: "Fresh Bazar", description: "Spicy and aromatic fresh ginger.", price: 100, unit: "kg", image: "/images/ginger.jpg", category: "Vegetables", stock: 100 },

  // LEAFY GREENS
  { name: "Spinach", brand: "Fresh Bazar", description: "Iron-rich fresh spinach leaves.", price: 25, unit: "bunch", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800&auto=format&fit=crop", category: "Leafy Greens", stock: 0 },
  { name: "Coriander Leaves", brand: "Fresh Bazar", description: "Aromatic coriander bunch.", price: 15, unit: "bunch", image: "/images/coriander.jpg", category: "Leafy Greens", stock: 100 },
  { name: "Mint Leaves", brand: "Fresh Bazar", description: "Refreshing mint sprigs.", price: 20, unit: "bunch", image: "/images/mint.jpg", category: "Leafy Greens", stock: 100 },
  { name: "Fenugreeks Leaves", brand: "Fresh Bazar", description: "Traditional methi leaves.", price: 30, unit: "bunch", image: "/images/Fenugreek_Leaves.jpg", category: "Leafy Greens", stock: 100 },
  { name: "Curry Leaves", brand: "Fresh Bazar", description: "Essential tempering curry leaves.", price: 20, unit: "bunch", image: "/images/curry_leaves.jpg", category: "Leafy Greens", stock: 100 },

  // DRY FRUITS
  { name: "Almonds", brand: "Fresh Bazar", description: "California premium almonds.", price: 800, unit: "kg", image: "/images/Almonds.jpg", category: "Dry Fruits", stock: 100 },
  { name: "Cashew Nuts", brand: "Fresh Bazar", description: "W240 premium cashews.", price: 900, unit: "kg", image: "/images/Cashew.webp", category: "Dry Fruits", stock: 100 },
  { name: "Raisins", brand: "Fresh Bazar", description: "Sweet golden raisins.", price: 400, unit: "kg", image: "/images/Raisins.jpg", category: "Dry Fruits", stock: 100 },
  { name: "Pistachios", brand: "Fresh Bazar", description: "Roasted and salted pistachios.", price: 1100, unit: "kg", image: "/images/Pistachios.webp", category: "Dry Fruits", stock: 100 },
  { name: "Dates", brand: "Fresh Bazar", description: "Kimia premium dates.", price: 500, unit: "kg", image: "/images/Dates.jpg", category: "Dry Fruits", stock: 100 },
  { name: "Walnuts", brand: "Fresh Bazar", description: "Shell-less premium walnuts.", price: 1200, unit: "kg", image: "/images/Walnuts.jpg", category: "Dry Fruits", stock: 100 },
  { name: "Hazelnuts", brand: "Fresh Bazar", description: "Rich and nutty hazelnuts.", price: 1500, unit: "kg", image: "/images/Hazelnuts.jpg", category: "Dry Fruits", stock: 100 },
  { name: "Dry Fig", brand: "Fresh Bazar", description: "Premium dried figs.", price: 1300, unit: "kg", image: "/images/Dry_Fig.jpg", category: "Dry Fruits", stock: 100 },

  // DAIRY PRODUCTS
  // Milk
  { name: "Amul Milk", brand: "Amul", description: "Fresh and pure Amul gold milk.", price: 30, unit: "500ml", image: "/images/Amul_Milk.webp", category: "Dairy", stock: 100 },
  { name: "Nandini Milk", brand: "Nandini", description: "High quality Nandini pasteurized milk.", price: 28, unit: "500ml", image: "/images/Nandini_Milk.webp", category: "Dairy", stock: 100 },
  { name: "Aavin Milk", brand: "Aavin", description: "Pure Aavin milk from Tamil Nadu.", price: 25, unit: "500ml", image: "/images/Aavin_Milk.webp", category: "Dairy", stock: 0 },
  { name: "Mother Dairy Milk", brand: "Mother Dairy", description: "Mother Dairy full cream milk.", price: 32, unit: "500ml", image: "/images/Mother.webp", category: "Dairy", stock: 100 },
  // Curd
  { name: "Amul Curd", brand: "Amul", description: "Thick and creamy Amul curd.", price: 35, unit: "400g", image: "/images/Amul_Curd.webp", category: "Dairy", stock: 100 },
  { name: "Nandini Curd", brand: "Nandini", description: "Fresh Nandini curd.", price: 30, unit: "500g", image: "/images/nandini_curd.webp", category: "Dairy", stock: 100 },
  { name: "Mother Dairy Curd", brand: "Mother Dairy", description: "Mother Dairy fresh dahi.", price: 35, unit: "400g", image: "/images/Mother_Dairy_Curd.webp", category: "Dairy", stock: 100 },
  // Butter
  { name: "Amul Butter", brand: "Amul", description: "Utterly butterly delicious Amul butter.", price: 56, unit: "100g", image: "/images/Amul_Butter.jpg", category: "Dairy", stock: 100 },
  { name: "Nandini Butter", brand: "Nandini", description: "Fresh and salted Nandini butter.", price: 50, unit: "100g", image: "/images/Nandini_Butter.jpg", category: "Dairy", stock: 100 },
  // Paneer
  { name: "Amul Paneer", brand: "Amul", description: "Soft and fresh Amul malai paneer.", price: 90, unit: "200g", image: "/images/Amul_Paneer.webp", category: "Dairy", stock: 100 },
  { name: "Nandini Paneer", brand: "Nandini", description: "Fresh Nandini paneer block.", price: 85, unit: "200g", image: "/images/Amul_Paneer1.jpg", category: "Dairy", stock: 100 },
  // Cheese
  { name: "Amul Cheese Slices", brand: "Amul", description: "Amul processed cheese slices.", price: 140, unit: "200g", image: "/images/Amul_Cheese.jpg", category: "Dairy", stock: 100 },
  { name: "Britannia Cheese", brand: "Britannia", description: "Britannia creamy cheese slices.", price: 135, unit: "200g", image: "/images/Britannia_Cheese.webp", category: "Dairy", stock: 100 },
  // Ghee
  { name: "Amul Ghee", brand: "Amul", description: "Pure cow ghee from Amul.", price: 580, unit: "1kg", image: "/images/Amul_Ghee.webp", category: "Dairy", stock: 100 },
  { name: "Nandini Ghee", brand: "Nandini", description: "Rich and aromatic Nandini ghee.", price: 600, unit: "1kg", image: "/images/Nandini_Ghee.jpg", category: "Dairy", stock: 100 }
];

export default products;
