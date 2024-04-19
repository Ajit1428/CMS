"use client";

import { LayoutDashboard, Truck, Users, Cog, UserCog2 } from "lucide-react";

export const userRoutes = [
  {
    label: "Dashboard",
    href: "/user/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "TMS",
    href: "/user/tms",
    icon: Users,
  },
];

export const adminRoutes = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Manage Branches",
    href: "/admin/manage-branches",
    icon: Cog,
  },
  {
    label: "Manage Users",
    href: "/admin/manage-users",
    icon: UserCog2,
  },
  {
    label: "TMS",
    href: "/admin/tms",
    icon: Users,
  },
];
