const mongoose = require("mongoose");

const dbconnect = async () => {
  try {
    const atlasURI = 'mongodb+srv://mernimishas_db_user:HLII2TeKX3n4JnQv@cluster0.c5dburn.mongodb.net/moviehub?retryWrites=true&w=majority';
    
    const conn = await mongoose.connect(atlasURI, {
      serverSelectionTimeoutMS: 5000, 
      bufferCommands: false,
      bufferMaxEntries: 0 
    });
    
    console.log(`Database connected to Atlas: ${conn.connection.host}`);
    return conn;
    
  } catch (atlasError) {
    console.log('Atlas connection failed, trying local MongoDB...');
    
    try {
      const localURI = 'mongodb://localhost:27017/moviehub';
      const conn = await mongoose.connect(localURI);
      
      console.log(`Database connected to Local: ${conn.connection.host}`);
      return conn;
      
    } catch (localError) {
      console.log('Local MongoDB connection failed');
      console.log('Running without database connection...');
            process.env.NO_DB = 'true';
            return Promise.resolve(null);
    }
  }
};



mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

module.exports = dbconnect;