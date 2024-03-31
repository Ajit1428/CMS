"use client";

import { useEffect, useState } from "react";

import { BranchDialog } from "@/components/custom/branch/branch-dialog";
import BranchDropDownMenu from "@/components/modal/branch/branch-modal";

export const BranchProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return(
     <BranchDialog title="Kumari Bank Branches" description="Add a new branch">
        <BranchDropDownMenu />
      </BranchDialog>
  )
};
