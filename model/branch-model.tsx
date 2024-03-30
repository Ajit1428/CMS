import mongoose, { Document, model } from "mongoose";

interface IBranch extends Document {
  id: string;
  userId: string;
  province: string;
  branchName: string;
}

const branchSchema = new mongoose.Schema<IBranch>(
  {
    id: String,
    userId: String,
    province: String,
    branchName: String, 
  },
  { timestamps: true }
);

const branchModel = model<IBranch>("Branch", branchSchema);
export default branchModel;
