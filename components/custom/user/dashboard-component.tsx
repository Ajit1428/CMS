import { redirect } from "next/navigation";

import TMSUserModel from "@/model/admin/tms-user/tms-user-create-model";
import UserModel from "@/model/user/user-model";
import { auth } from "@clerk/nextjs";
import { DashboardPieChart } from "./dashboard/dashboard-pie-chart";

export const DashboardComponent = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const userData = await UserModel.findOne({ userId });

  const fetchedData = await TMSUserModel.find({
    branchName: userData?.branchName,
  });

  const totalKYC = fetchedData.length.toString();
  const approved = fetchedData
    .filter((a) => a?.status === "Approved")
    .length.toString();
  const unapproved = fetchedData
    .filter((a) => a?.status === "Approved")
    .length.toString();

  const data = {
    labels: ["Received KYC", "Approved KYC", "Uapproved KYC"],
    datasets: [
      {
        label: "Total",
        data: [totalKYC, approved, unapproved],
        backgroundColor: ["#a6e3a1", "#89dceb", "#f9e2af"],
      },
    ],
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="grid grid-rows-2 grid-flow-row gap-2 border-1 shadow-md p-2 mb-4">
        <div className="rows-span-1">
          <span className="text-3xl font-extrabold mx-auto">KYC</span>
          <DashboardPieChart data={data} />
        </div>
        <div className="row-span-1">This is the second row</div>
      </div>
      <div className="grid grid-rows-2">This is the second div</div>
      <div className="grid grid-rows-2"> This is the third and final div</div>
    </div>
  );
};
