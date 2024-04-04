"use client";

import { UserDetailDialog } from "@/components/custom/user/user-dialog";
import { UserModal } from "@/components/modal/user-modal";

const DetailPage = () => {
  return (
    <UserDetailDialog
      title="Additional Details"
      description="Please fill out the form in order to continue"
    >
      <UserModal />
    </UserDetailDialog>
  );
};

export default DetailPage;
