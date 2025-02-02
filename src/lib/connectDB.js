import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('Mongodb is connected');
        });
        connection.on('error', (err) => {
            console.log('Mongodb connection error : ', err);
            process.exit();
        });
    } catch (error) {
        console.log('something went wrong is : ', error);
    }
}