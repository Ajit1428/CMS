import { LayoutDashboard, Truck, Users } from "lucide-react";

export const routes = [
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
    icon: Truck
  }
]