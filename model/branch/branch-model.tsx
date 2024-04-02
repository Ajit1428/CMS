import mongoose, { Document, model } from "mongoose";

interface IBranch extends Document {
  userId: string;
  branchName: string;
}

const branchSchema = new mongoose.Schema<IBranch>(
  {
    userId: String,
    branchName: String, 
  },
  { timestamps: true }
);

const branchModel = model<IBranch>("Branch", branchSchema);
export default branchModel;
