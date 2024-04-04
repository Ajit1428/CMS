import mongoose, { Document, models, model } from "mongoose";

export interface IBranch extends Document {
  userId: string;
  branchName: string;
}

const branchSchema = new mongoose.Schema<IBranch>(
  {
    userId: {
      type: String,
      required: true,
    },
    branchName: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const branchModel = models.Branch || model<IBranch>("Branch", branchSchema);
export default branchModel;
