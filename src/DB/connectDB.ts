import mongoose from "mongoose";

function connectDB(url: string) {
  mongoose.connect(url);
}

export default connectDB;
