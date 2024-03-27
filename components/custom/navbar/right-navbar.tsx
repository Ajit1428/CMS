"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../modeToggle";

const NavBar = () => {
  const currentUrl = usePathname() === "/";
  return (
    <div
      className={cn(
        "flex p-2 space-x-4 items-center",
        currentUrl && "shadow-yellow-400"
      )}
    >
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  );
};

export default NavBar;
