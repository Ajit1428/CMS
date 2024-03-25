"use client"

import { routes } from "@/utils/sidebar-static-routes";
import SideBarItems from "./sidebar-items";

const SideBarRoutes = () => {
  return (
    <div className="w-full h-full mt-10">
      {routes.map((route) => (
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
