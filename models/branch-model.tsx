import mongoose, { Document, model } from "mongoose";

interface IBranch extends Document {
  id: string;
  name: string;
  userId: string;
}

const branchSchema = new mongoose.Schema<IBranch>(
  {
    id: String,
    name: {
      type: String,
      required: [true, "Please enter the name"],
    },
    userId: String,
  },
  { timestamps: true }
);

const branchModel = model<IBranch>("Branch", branchSchema);
export default branchModel;
