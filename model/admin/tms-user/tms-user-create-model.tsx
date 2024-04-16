import mongoose, { Document } from "mongoose";

interface TMSUserCreate extends Document {
  clientName: string;
  clientCode: string;
  status: string;
  sentBy: string;
  branchName: string;
  remarks: string;
  courier: string;
}

const TMSUserCreateSchema = new mongoose.Schema<TMSUserCreate>(
  {
    clientName: {
      type: String,
      required: true,
    },
    clientCode: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: String,
      enum: ["Approved", "Unapproved", "In-progress"],
      required: true,
    },
    sentBy: {
      type: String,
      required: true,
    },
    branchName: {
      type: String,
      required: true,
    },
    remarks: {
      type: String
    },
    courier: {
      type: String,
      enum: ["Received", "Not Received"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const TMSUserModel =
  mongoose.models.TMS || mongoose.model("TMS", TMSUserCreateSchema);
export default TMSUserModel;
