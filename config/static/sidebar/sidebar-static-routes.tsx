import { LayoutDashboard, Truck, Users, Cog, UserCog2 } from "lucide-react";

export const userRoutes = [
  {
    label: "Dashboard",
    href: "/users/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "TMS",
    href: "/users/tms",
    icon: Users,
  },
  {
    label: "Courier",
    href: "/users/courier",
    icon: Truck,
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
  {
    label: "Courier",
    href: "/admin/courier",
    icon: Truck,
  },
];
