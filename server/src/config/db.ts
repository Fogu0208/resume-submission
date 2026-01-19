import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    let dbUri = process.env.MONGO_URI as string;
    if (dbUri && !dbUri.includes('retryWrites')) {
      dbUri += dbUri.includes('?') ? '&retryWrites=true&w=majority' : '?retryWrites=true&w=majority';
    }
    const conn = await mongoose.connect(dbUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
