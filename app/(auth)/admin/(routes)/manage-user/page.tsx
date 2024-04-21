import { redirect } from "next/navigation";

import { columns } from "@/components/custom/admin/table/user/admin-user-columns";
import { DataTable } from "@/components/custom/admin/table/user/admin-user-data-table";
import { auth } from "@clerk/nextjs";
import UserModel from "@/model/user/user-model";

const ManageUsers = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const dataF = await UserModel.find();

  const data = dataF.map((a) => {
    return {
      id: a._id.toString(),
      name: a.name,
      role: a.role,
      email: a.email,
      branchName: a.branchName,
      contact: a.contact,
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

export default ManageUsers;
