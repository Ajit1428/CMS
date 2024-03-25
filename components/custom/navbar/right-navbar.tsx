"use client";
import { usePathname } from "next/navigation";

import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../modeToggle";

const NavBar = () => {
  const currentUrl= usePathname() === '/'
  return (
    <div className="flex space-x-4 h-12 items-center p-2 justify-end border rounded-full shadow-sm w-24 ml-auto mr-2 mt-2">
      <UserButton afterSignOutUrl="/" />
      {!currentUrl && <ModeToggle/>}
    </div>
  );
};

export default NavBar;
