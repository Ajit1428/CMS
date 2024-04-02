"use client";

import { BranchProvider } from "@/provider/branch/branch-provider";

const LeftNavbar = () => {
  return (
    <div className="md:flex">
      <BranchProvider />
    </div>
  );
};

export default LeftNavbar;
