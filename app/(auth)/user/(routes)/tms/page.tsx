import { columns } from "@/components/custom/tms-user/table/tms-user-columns";
import { DataTable } from "@/components/custom/tms-user/table/tms-user-data-table";
import TMSUserModel from "@/model/admin/tms-user/tms-user-create-model";

const TmsPage = async () => {
  const data = await TMSUserModel.find();
  return (
    <div className="m-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TmsPage;
