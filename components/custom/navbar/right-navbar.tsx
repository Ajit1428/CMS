"use client";

import { UserButton } from "@clerk/nextjs";

import { ModeToggle } from "@/components/custom/theme/modeToggle";

const RightNavbar = () => {
  return (
    <div className="w-full flex justify-end p-4 space-x-4">
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  );
};

export default RightNavbar;
