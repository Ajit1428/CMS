import { redirect } from "next/navigation";

import TMSUserModel from "@/model/admin/tms-user/tms-user-create-model";
import UserModel from "@/model/user/user-model";
import { auth } from "@clerk/nextjs";
import { DashboardPieChart } from "./dashboard/dashboard-pie-chart";
import { LineChart } from "./dashboard/dashboard-line";
import { BarChart } from "./dashboard/dashboard-bar";

export const DashboardComponent = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const userData = await UserModel.findOne({ userId });

  const fetchedData = await TMSUserModel.find({
    branchName: userData?.branchName,
  });

  return (
    <div className="grid grid-cols-4 gap-4 ">
      <div className="col-span-2 border-2 p-2 shadow-md">
        <span className="text-3xl font-extrabold">PieChart KYC</span>
        <DashboardPieChart dataF={fetchedData} />
      </div>
      <div className="col-span-2 border-2 p-2 shadow-md">
        <span className="text-3xl font-extrabold">BarChart KYC</span>
        <BarChart dataF={fetchedData} />
      </div>
      <div className="col-span-4 border-2 p-2 shadow-md">
        <span className="text-3xl font-extrabold">LineChart KYC</span>
        <LineChart dataF={fetchedData} />
      </div>
    </div>
  );
};
