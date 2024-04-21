import { columns } from "@/components/custom/tms-user/table/tms-user-columns";
import { DataTable } from "@/components/custom/tms-user/table/tms-user-data-table";
import TMSUserModel from "@/model/admin/tms-user/tms-user-create-model";
import UserModel from "@/model/user/user-model";
import { auth } from "@clerk/nextjs";

const TmsPage = async () => {
  const { userId } = auth();

  const userData = await UserModel.findOne({ userId });

  const dataF = await TMSUserModel.find({ branchName: userData.branchName });

  const data = dataF.map((a) => {
    return {
      clientCode: a.clientCode,
      clientName: a.clientName,
      status: a.status,
      sentBy: a.sentBy,
      courier: a.courier,
      remarks: a.remarks,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    };
  });
  return (
    <div className="m-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TmsPage;
