import LeftNavbar from "@/components/custom/navbar/left-navbar";
import UserModel from "@/model/user/user-model";
import { SiderbarProvider } from "@/provider/sidebar/sidebar-provider";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const StaffLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  const validatedUser = await UserModel.findOne({ userId });

  if (!validatedUser?.email) {
    redirect("/detail");
  }

  return (
    <div className="h-full overflow-hidden">
      <SiderbarProvider branchName={validatedUser.branchName} />
      <div className="ml-60">{children}</div>
    </div>
  );
};

export default StaffLayout;
