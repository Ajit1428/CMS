import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import TMSUserModel from "@/model/admin/tms-user/tms-user-create-model";
import { ManageTMSUserModal } from "@/components/modal/admin/tms-user/tms-user-update-modal";

const ManageUserEditPage = async ({
  params,
}: {
  params: { tmsUserId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const fetchedTMSUserDetails = await TMSUserModel.findOne({
    _id: params.tmsUserId,
  });

  const reassignedTMSUserDetails = {
    _id: fetchedTMSUserDetails?._id.toString(),
    clientName: fetchedTMSUserDetails?.clientName,
    clientCode: fetchedTMSUserDetails?.clientCode,
    status: fetchedTMSUserDetails?.status,
    sentBy: fetchedTMSUserDetails?.sentBy,
    branchName: fetchedTMSUserDetails?.branchName,
    remarks: fetchedTMSUserDetails?.remarks,
    courier: fetchedTMSUserDetails?.courier,
  };

  return (
    <div className="m-4">
      <ManageTMSUserModal userDetails={reassignedTMSUserDetails} />
    </div>
  );
};

export default ManageUserEditPage;
