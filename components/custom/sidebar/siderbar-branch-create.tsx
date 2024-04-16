"use client"

import { usePathname } from "next/navigation";

import { BranchProvider } from "@/provider/admin/branch/branch-provider";

const SidebarBranchCreate = () => {
  const pathname = usePathname();
  const rootUrl = pathname === "/";
  const userUrl = pathname.startsWith("/user");

  return <div className="mb-4">{!rootUrl && !userUrl && <BranchProvider />}</div>;
};

export default SidebarBranchCreate;
