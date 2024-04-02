"use client";

import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/custom/theme/modeToggle";
import LeftNavbar from "./left-navbar";

const RightNavbar = () => {
  const currentUrl = usePathname() === "/";
  return (
    <div
      className={cn(
        "flex md:justify-between md:ml-56 justify-end items-center px-4 py-2 border-b-2 rounded-md shadow-md",
        currentUrl && "shadow-yellow-400"
      )}
    >
      <div className="hidden md:flex">
      <LeftNavbar />
      </div>
      <div className="flex items-center p-2 space-x-4">
        <UserButton afterSignOutUrl="/" />
        <ModeToggle />
      </div>
    </div>
  );
};

export default RightNavbar;
