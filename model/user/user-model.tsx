import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  userId: string;
  name: string;
  role: string;
  email: string;
  branchName: string;
  contact: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    role: {
      type: String,
      enum: ["kbl", "kbsl", "admin"],
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your official mail"],
      unique: true,
    },
    branchName: {
      type: String,
      required: [true, "Please select the branch in order to proceed"],
    },
    contact: {
      type: String,
      required: [true, "Please enter your contact details"],
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default UserModel;
