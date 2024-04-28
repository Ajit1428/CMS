import { redirect } from "next/navigation";

import { columns } from "@/components/custom/admin/table/tms-user/admin-tms-user-columns";
import { DataTable } from "@/components/custom/admin/table/tms-user/admin-tms-user-data-table";
import { auth } from "@clerk/nextjs";
import TMSUserModel from "@/model/admin/tms-user/tms-user-create-model";
import UserModel from "@/model/user/user-model";

const TmsUserPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const dataF = await TMSUserModel.find();

  const isAdminDetails = await UserModel.findOne({ userId });

  const data = dataF.map((a) => {
    return {
      id: a._id.toString(),
      clientName: a.clientName,
      clientCode: a.clientCode,
      status: a.status,
      sentBy: a.sentBy,
      branchName: a.branchName,
      remarks: a.remarks,
      courier: a.courier,
      isAdmin: isAdminDetails.role,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    };
  });
  return (
    <div className="m-2">
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default TmsUserPage;
