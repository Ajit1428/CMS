"use client";

import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

import { ModeToggle } from "@/components/custom/theme/modeToggle";
import LeftNavbar from "./left-navbar";

const RightNavbar = () => {
  const currentUrl = usePathname() ===  '/'
  const userUrl = usePathname().startsWith('/user')
  return (
    <div className="flex md:justify-between md:ml-56 justify-end items-center px-4 py-2">
      {(!currentUrl && !userUrl) && (
        <div className="hidden md:flex">
          <LeftNavbar />
        </div>
      )}
      <div className="flex ml-auto items-center p-2 space-x-4">
        <UserButton afterSignOutUrl="/" />
        <ModeToggle />
      </div>
    </div>
  );
};

export default RightNavbar;
