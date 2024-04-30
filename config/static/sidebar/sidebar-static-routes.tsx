"use client";

import { LayoutDashboard, Truck, Users, Cog, UserCog2 } from "lucide-react";

export const userRoutes = [
  {
    label: "Dashboard",
    href: "/user/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "TMS Users",
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
    href: "/admin/manage-branch",
    icon: Cog,
  },
  {
    label: "Manage Users",
    href: "/admin/manage-user",
    icon: UserCog2,
  },
  {
    label: "TMS Users",
    href: "/admin/tms",
    icon: Users,
  },
];
