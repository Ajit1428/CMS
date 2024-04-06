import mongoose, { Document, models, model } from "mongoose";

interface IBranch extends Document {
  userId: string;
  branchName: string;
}

const BranchSchema = new mongoose.Schema<IBranch>(
  {
    userId: {
      type: String,
      required: true,
    },
    branchName: {
      type: String,
      unique: true,
      required: [true, "Please enter the branch name to proceed"],
    },
  },
  { timestamps: true },
);

const BranchModel = models.Branch || model<IBranch>("Branch", BranchSchema);
export default BranchModel;
