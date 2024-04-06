"use client";

import { useEffect, useState } from "react";

import { UserDetailDialog } from "@/components/custom/user/user-dialog";
import { UserModal } from "@/components/modal/user/user-modal";

export const UserProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <UserDetailDialog
        title="Additional Details"
        description="Please fill out the form in order to continue"
      >
        <UserModal />
      </UserDetailDialog>
    </>
  );
};
