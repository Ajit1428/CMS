"use client";

import { usePathname } from "next/navigation";

import TMSUserCreateProvided from "@/provider/admin/tms-user/tms-user-create-provider";

const SidebarTMSUserCreate = () => {
  const pathname = usePathname();
  const rootUrl = pathname === "/";
  const userUrl = pathname.startsWith("/user");

  return <div>{!rootUrl && !userUrl && <TMSUserCreateProvided />}</div>;
};

export default SidebarTMSUserCreate;
