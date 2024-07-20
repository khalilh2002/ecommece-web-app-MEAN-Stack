const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async (url=process.env.MONGO_URI) => {
    try {
      console.log(url);
      await mongoose.connect(url);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
      process.exit(1);
    }
  };

  
module.exports = connectDB;