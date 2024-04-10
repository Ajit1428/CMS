import mongoose, { Document } from "mongoose";

interface TMSUserCreate extends Document {
  clientName: string;
  clientCode: string;
  status: string;
  sentBy: string;
  courier: string;
  branchDetails: { value: string };
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
    courier: {
      type: String,
      enum: ["Received", "Not Received"],
      required: true,
    },
    branchDetails: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TMSUserModel = mongoose.models.TMS|| mongoose.model("TMS", TMSUserCreateSchema)
export default TMSUserModel
