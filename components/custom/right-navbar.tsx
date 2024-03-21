"use client";
import { usePathname } from "next/navigation";

import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./modeToggle";

const NavBar = () => {
  const currentUrl= usePathname() === '/'
  return (
    <div className="flex justify-end p-4 space-x-4 items-center">
      <UserButton afterSignOutUrl="/" />
      {!currentUrl && <ModeToggle/>}
    </div>
  );
};

export default NavBar;
