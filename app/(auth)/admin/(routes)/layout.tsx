import UserModel from "@/model/user/user-model";
import { SiderbarProvider } from "@/provider/sidebar/sidebar-provider";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  const validatedUser = await UserModel.findOne({ userId });

  if (userId && validatedUser?.role !== "admin") {
    redirect("/user/dashboard");
  }

  return (
    <>
      <div className="h-full overflow-hidden">
        <SiderbarProvider />
        <div className="ml-60 mt-2">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
