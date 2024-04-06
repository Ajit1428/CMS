import { redirect } from "next/navigation";

import UserModel from "@/model/user/user-model";
import { UserProvider } from "@/provider/user/user-provider";
import { auth } from "@clerk/nextjs";

const DetailPage = async () => {
  const { userId } = auth();
  const validatedUser = await UserModel.findOne({ userId });

  if (userId === validatedUser?.userId && validatedUser?.role === "admin") {
    redirect("/admin/dashboard");
  } else if (userId === validatedUser?.userId) {
    redirect("/user/dashboard");
  } else {
    return <UserProvider />;
  }
};

export default DetailPage;
