"use client";

import { useEffect, useState } from "react";

import RightNavbar from "@/components/custom/navbar/right-navbar";
import MobileSidebar from "@/components/custom/sidebar/mobile-sidebar";
import SideBar from "@/components/custom/sidebar/sidebar";
import LeftNavbar from "@/components/custom/navbar/left-navbar";

interface NavbarProps {
  branchName: string;
}

export const SiderbarProvider: React.FC<NavbarProps> = ({ branchName }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="overflow-hidden">
      <div className="hidden md:flex">
        <SideBar />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col m-4">
          <MobileSidebar />
        </div>
        <div className="w-full flex items-center gap-4 mb-3">
          <LeftNavbar branchName={branchName} />
          <RightNavbar />
        </div>
      </div>
    </div>
  );
};
