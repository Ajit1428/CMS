"use client";

import KumariLogo from "../logo/kumariLogo";
import SideBarRoutes from "./sidebar-routes";
import SidebarBranchCreate from "./siderbar-branch-create";

function SideBar() {
  return (
    <div className="flex flex-col md:w-56 sm:w-full items-center pb-6 h-full border-r shadow-md bg-white dark:bg-[#1e1e2e] dark:shadow-blue-400">
      <KumariLogo />
      <SideBarRoutes />
      <SidebarBranchCreate />
    </div>
  );
}

export default SideBar;
