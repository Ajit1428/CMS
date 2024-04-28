import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import UserModel from "@/model/user/user-model";
import { ManageUserModal } from "@/components/modal/admin/manage-user/manage-user-update-modal";

const ManageUserEditPage = async ({
  params,
}: {
  params: { userId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const fetchedUserDetails = await UserModel.findOne({ _id: params.userId });

  const reassignedUserDetails = {
    _id: fetchedUserDetails?._id.toString(),
    name: fetchedUserDetails?.name,
    role: fetchedUserDetails?.role,
    email: fetchedUserDetails?.email,
    branchName: fetchedUserDetails?.branchName,
    contact: fetchedUserDetails?.contact,
  };

  return (
    <div className="m-4">
      <ManageUserModal userDetails={reassignedUserDetails} />
    </div>
  );
};

export default ManageUserEditPage;
