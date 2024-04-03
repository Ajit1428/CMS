"use client"

import KumariLogo from "../logo/kumariLogo";
import SideBarRoutes from "./sidebar-routes";
import LeftNavbar from "@/components/custom/navbar/left-navbar";

function SideBar() {
  return (
    <div className="flex flex-col items-center pb-6 h-full border-r w-full shadow-md bg-white dark:bg-[#1e1e2e] dark:shadow-blue-400">
      <KumariLogo />
      <SideBarRoutes />
      <div className="md:hidden">
        <LeftNavbar />
      </div>
    </div>
  );
}

export default SideBar;
