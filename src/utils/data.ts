import {
  LayoutDashboardIcon,
  LucideIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon
} from "lucide-react";

export const menuItems: { title: string; path: string; icon: LucideIcon }[] = [
  {
    title: "Dashboard",
    path: "dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Products",
    path: "products",
    icon: ShoppingBagIcon,
  },
  {
    title: "Orders",
    path: "orders",
    icon: ShoppingCartIcon,
  },
  {
    title: "Settings",
    path: "settings",
    icon: SettingsIcon,
  },
];
