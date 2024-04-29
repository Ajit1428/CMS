import UserModel from "@/model/user/user-model";
import BranchModel from "@/model/admin/branch/branch-model";
import { SiderbarProvider } from "@/provider/sidebar/sidebar-provider";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const StaffLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  const validatedUser = await UserModel.findOne({ userId });

  if (!validatedUser?.email) {
    redirect("/");
  }

  const existBranch = await BranchModel.findOne({
    branchName: validatedUser?.branchName,
  });

  if (!existBranch) {
    redirect("/");
  }

  return (
    <div className="h-full">
      <SiderbarProvider branchName={validatedUser.branchName} />
      <div className="md:ml-56">{children}</div>
    </div>
  );
};

export default StaffLayout;
