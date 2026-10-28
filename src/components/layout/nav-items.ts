import { LayoutDashboard, Users, type LucideIcon } from "lucide-react";
import type { Route } from "next";

export type NavItem = { label: string; href: Route; icon: LucideIcon };

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/users", icon: Users },
];
