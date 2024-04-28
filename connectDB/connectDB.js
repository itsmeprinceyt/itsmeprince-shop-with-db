import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log(`Database has been connected successfully and ready to use.`)
    } catch (error) {
        console.lop(error)
    }
}

export default connectDB;