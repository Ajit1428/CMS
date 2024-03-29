"use client";

import { BranchDialog } from "@/components/custom/branch/branch-dialog";
import BranchDropDownMenu from "@/modal/branch-modal";

const LeftNavbar = () => {
  return (
    <div>
      <BranchDialog title="Kumari Bank Branches" description="Add a new branch">
        <BranchDropDownMenu />
      </BranchDialog>
    </div>
  );
};

export default LeftNavbar;
