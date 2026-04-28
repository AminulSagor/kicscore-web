import {
  LayoutDashboard,
  Shield,
  UserCircle,
  Users,
  type LucideIcon,
} from "lucide-react";

export type AdminNavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const adminNavigation: AdminNavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboards/admin/home",
    icon: LayoutDashboard,
  },
  {
    label: "General Users",
    href: "/dashboards/admin/general-users",
    icon: Users,
  },
  {
    label: "Managers",
    href: "/dashboards/admin/managers",
    icon: Shield,
  },
  {
    label: "My Profile",
    href: "/dashboards/admin/profile",
    icon: UserCircle,
  },
];