"use client";

import { useEffect, useState } from "react";

import RightNavbar from "@/components/custom/navbar/right-navbar";
import MobileSidebar from "@/components/custom/sidebar/mobile-sidebar";
import SideBar from "@/components/custom/sidebar/sidebar";
import LeftNavbar from "@/components/custom/navbar/left-navbar";



export const SiderbarProvider = () => {
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
      <div className="flex flex-col fixed z-50 m-4">
        <MobileSidebar />
      </div>
      <div className="mb-3 border-b-2 shadow-sm rounded-md">
        {/* <LeftNavbar /> */}
        <RightNavbar />
      </div>
    </div>
  );
};
