"use client";

import { usePathname } from "next/navigation";

import { userRoutes, adminRoutes } from "@/utils/sidebar-static-routes";
import SideBarItems from "./sidebar-items";

const SideBarRoutes = () => {
  const userPage = usePathname().startsWith("/user");

  return (
    <div className="w-full h-full mt-10">
      {!userPage && adminRoutes.map((route) => (
        <SideBarItems
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SideBarRoutes;
