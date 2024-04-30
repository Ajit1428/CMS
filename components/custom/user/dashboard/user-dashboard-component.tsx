import { redirect } from "next/navigation";

import TMSUserModel from "@/model/admin/tms-user/tms-user-create-model";
import UserModel from "@/model/user/user-model";
import { auth } from "@clerk/nextjs";
import { DashboardPieChart } from "./user-dashboard-pie-chart";
import { LineChart } from "./user-dashboard-line";
import { BarChart } from "./user-dashboard-bar";

export const DashboardComponent = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const userData = await UserModel.findOne({ userId });

  const fetchedData = await TMSUserModel.find({
    branchName: userData?.branchName,
  });

  const kycData = fetchedData.map((a) => a.status);
  const courierData = fetchedData.map((a) => a.courier);

  return (
    <div className="grid md:grid-cols-4 gap-2 ">
      <div className="md:col-span-2 border-2 p-2 shadow-md">
        <span className="text-3xl font-extrabold">PieChart KYC</span>
        <DashboardPieChart dataF={kycData} />
      </div>
      <div className="md:col-span-2 border-2 p-2 shadow-md">
        <span className="text-3xl font-extrabold">BarChart KYC</span>
        <BarChart dataF={courierData} />
      </div>
      <div className="md:col-span-4 border-2 p-2 shadow-md">
        <span className="text-3xl font-extrabold">LineChart KYC</span>
        <LineChart dataF={kycData} />
      </div>
    </div>
  );
};
