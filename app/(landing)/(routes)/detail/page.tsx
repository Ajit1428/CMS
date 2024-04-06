import { redirect } from "next/navigation";

import { mongoDB } from "@/config/db/mongodb";
import UserModel from "@/model/user/user-model";
import { UserProvider } from "@/provider/user/user-provider";
import { auth } from "@clerk/nextjs";

const DetailPage = async () => {
  mongoDB();
  const { userId } = auth();
  const validated = await UserModel.findOne({ userId });

  if (userId === validated?.userId) {
    redirect("/user/dashboard");
  }

  return <UserProvider />;
};

export default DetailPage;
