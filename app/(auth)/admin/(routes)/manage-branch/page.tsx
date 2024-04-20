import { redirect } from "next/navigation";

import { columns } from "@/components/custom/admin/table/branch/admin-columns";
import { DataTable } from "@/components/custom/admin/table/branch/admin-data-table";
import BranchModel from "@/model/admin/branch/branch-model";
import { auth } from "@clerk/nextjs";

const ManageBranches = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const dataF = await BranchModel.find();

  const data = dataF.map((a) => {
    return {
      id: a._id.toString(),
      branchName: a.branchName,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    };
  });

  return (
    <div className="m-2">
      <DataTable data={data} columns={columns} />;
    </div>
  );
};

export default ManageBranches;
