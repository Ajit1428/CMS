"use client";

import { usePathname } from "next/navigation";

import { BranchProvider } from "@/provider/branch/branch-provider";

const SidebarBranchCreate = () => {
  const pathname = usePathname();
  const rootUrl = pathname === "/";
  const userUrl = pathname.startsWith("/user");

  return <div>{!rootUrl && !userUrl && <BranchProvider />}</div>;
};

export default SidebarBranchCreate;
