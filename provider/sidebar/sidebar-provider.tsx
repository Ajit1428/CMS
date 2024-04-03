"use client";

import { useEffect, useState } from "react";

import RightNavbar from "@/components/custom/navbar/right-navbar";
import MobileSidebar from "@/components/custom/sidebar/mobile-sidebar";
import SideBar from "@/components/custom/sidebar/sidebar";

export const SiderbarProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="hidden md:flex h-full flex-col fixed inset-y-0 z-50">
        <SideBar />
      </div>
      <div className="flex flex-col fixed z-50 m-4">
        <MobileSidebar />
      </div>
      <div className="mb-3 border-b-2 shadow-sm rounded-md">
        <RightNavbar />
      </div>
    </>
  );
};
