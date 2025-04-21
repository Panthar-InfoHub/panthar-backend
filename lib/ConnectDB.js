import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Database');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit if connection fails
    }
}
