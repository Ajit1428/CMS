"use client";

import { useEffect, useState } from "react";

import { TMSUserDialog } from "@/components/custom/tms-user/tms-user-dialog";
import { TMSUserModal } from "@/components/modal/admin/tms-user/tms-user-modal";
import { CirclePlus } from "lucide-react";

const TMSUserCreateProvided = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <TMSUserDialog
        title="Create TMS User"
        description="Enter the details of the TMS client"
        buttonTitle="Add TMS User"
        icon={CirclePlus}
      >
        <TMSUserModal />
      </TMSUserDialog>
    </div>
  );
};

export default TMSUserCreateProvided;
