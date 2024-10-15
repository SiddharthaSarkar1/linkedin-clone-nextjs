import mongoose from "mongoose";

const connectionString = process.env.MONGODB_URI;

if (!connectionString) {
  throw new Error("Please provide a valid connection string.");
}

const connectDB = async () => {
  if (mongoose.connection?.readyState) {
    // console.log("---------- Already connected to MongoDB ----------");
    return;
  }

  try {
    const conn = await mongoose.connect(connectionString);
    console.log(`MongoDB Conected ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to mongoDB", error);
  }
};

export default connectDB;
