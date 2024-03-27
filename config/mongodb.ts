import mongoose, { Connection } from "mongoose";

const mongoUri = process.env.MONGO_URI as string;

export const mongoDB = async () => {
  try {
    const { connection }: { connection: Connection } = await mongoose.connect(
      mongoUri
    );
    console.log(`Connection established with the Database ${connection.host}`);
  } catch (error) {
    console.log(`Error Connecting to the DB ${error}`);
    process.exit(1);
  }
};
