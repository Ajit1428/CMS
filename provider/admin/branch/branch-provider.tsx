"use client";

import { useEffect, useState } from "react";

import { BranchDialog } from "@/components/custom/branch/branch-dialog";
import BranchModal from "@/components/modal/admin/branch/branch-modal";

export const BranchProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <BranchDialog title="Kumari Bank Branches" description="Add a new branch">
      <BranchModal />
    </BranchDialog>
  );
};
