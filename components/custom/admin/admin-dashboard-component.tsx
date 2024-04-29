import { redirect } from "next/navigation";

import TMSUserModel from "@/model/admin/tms-user/tms-user-create-model";
import UserModel from "@/model/user/user-model";
import BranchModel from "@/model/admin/branch/branch-model";
import { auth } from "@clerk/nextjs";
import { DashboardPieChart } from "./dashboard/admin-dashboard-pie-chart";
import { LineChart } from "./dashboard/admin-dashboard-line";
import { BarChart } from "./dashboard/admin-dashboard-bar";

export const AdminDashboardComponent = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const branch = await BranchModel.find();
  const user = await UserModel.find();
  const tms = await TMSUserModel.find();

  const branchData = branch.length;

  const userData = user.map((a) => a.role);

  const tmsData = tms.map((a) => a.status);

  return (
    <div className="grid md:grid-cols-4 gap-4 grid-cols-1">
      <div className="md:col-span-2 border-2 p-2 shadow-md">
        <span className="text-3xl font-extrabold">Branch</span>
        <DashboardPieChart dataF={branchData} />
      </div>
      <div className="md:col-span-2 border-2 p-2 shadow-md">
        <span className="text-3xl font-extrabold">User</span>
        <BarChart dataF={userData} />
      </div>
      <div className="md:col-span-4 border-2 p-2 shadow-md">
        <span className="text-3xl font-extrabold">TMS User</span>
        <LineChart dataF={tmsData} />
      </div>
    </div>
  );
};
