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
    await mongoose.connect(connectionString);
  } catch (error) {
    console.log("Error connecting to mongoDB", error);
  }
};

export default connectDB;
