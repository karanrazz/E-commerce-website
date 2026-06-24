const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');

const users = [
  {
    name: 'Admin User',
    email: 'admin@shopeasy.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john123',
    role: 'user',
  },
];

const products = [
  {
    name: 'Apple iPhone 15',
    description: 'Latest iPhone with A16 Bionic chip, 48MP camera, and Dynamic Island. Available in multiple colors.',
    price: 79999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500',
    stock: 25,
    rating: 4.8,
    numReviews: 120,
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise canceling headphones with 30-hour battery life and crystal clear audio.',
    price: 24999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 40,
    rating: 4.7,
    numReviews: 85,
  },
  {
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with Air Max technology. Lightweight and stylish design.',
    price: 8999,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    stock: 60,
    rating: 4.5,
    numReviews: 200,
  },
  {
    name: 'Levi\'s 511 Slim Fit Jeans',
    description: 'Classic slim fit jeans made from premium denim. Perfect for everyday wear.',
    price: 3499,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    stock: 80,
    rating: 4.3,
    numReviews: 150,
  },
  {
    name: 'The Alchemist - Paulo Coelho',
    description: 'A magical story about following your dreams. One of the best-selling books of all time.',
    price: 299,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    stock: 100,
    rating: 4.9,
    numReviews: 500,
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    description: 'Multi-use pressure cooker, slow cooker, rice cooker, steamer, and more in one appliance.',
    price: 6999,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500',
    stock: 35,
    rating: 4.6,
    numReviews: 300,
  },
  {
    name: 'MacBook Air M2',
    description: 'The most powerful MacBook Air ever with M2 chip, 13.6" Liquid Retina display.',
    price: 114900,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    stock: 15,
    rating: 4.9,
    numReviews: 75,
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Non-slip, eco-friendly yoga mat with alignment lines. 6mm thick for joint protection.',
    price: 1299,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=500',
    stock: 90,
    rating: 4.4,
    numReviews: 180,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await User.deleteMany();
    await Product.deleteMany();

    // Use create() so the pre-save bcrypt hook runs for each user
    for (const u of users) {
      await User.create(u);
    }
    console.log(`✅ ${users.length} users seeded (passwords hashed)`);

    await Product.insertMany(products);
    console.log(`✅ ${products.length} products seeded`);

    console.log('🌱 Database seeded successfully!');
    console.log('👤 Admin: admin@shopeasy.com / admin123');
    console.log('👤 User:  john@example.com / john123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
