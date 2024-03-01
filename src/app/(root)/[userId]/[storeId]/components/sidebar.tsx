"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import {
  LayoutDashboardIcon,
  LucideIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const { user } = useUser();
  const { userId, storeId } = useParams();
  const pathname = usePathname();

  const menuItems: { title: string; path: string; icon: LucideIcon }[] = [
    {
      title: "Dashboard",
      path: `/${userId}/${storeId}/dashboard`,
      icon: LayoutDashboardIcon,
    },
    {
      title: "Products",
      path: `/${userId}/${storeId}/products`,
      icon: ShoppingBagIcon,
    },
    {
      title: "Orders",
      path: `/${userId}/${storeId}/orders`,
      icon: ShoppingCartIcon,
    },
    {
      title: "Settings",
      path: `/${userId}/${storeId}/settings`,
      icon: SettingsIcon,
    },
  ];

  return (
    <div className="flex fixed top-5 flex-col gap-5 overflow-hidden">

      <div className="gap-5 flex items-center justify-between">
        <div className="gap-3 flex items-center justify-start">
          <UserButton afterSignOutUrl="/sign-in" />
          <span className="text-sm font-medium">
            {user?.username || user?.firstName || "User"}
          </span>
        </div>
        <ModeToggle />
      </div>

      <ul className="flex flex-col gap-y-2">
        {menuItems.map((item) => (
          <li key={item.title}>
            <Link
              href={item.path}
              className={cn(
                `py-5 pl-3 flex items-center gap-3 rounded-md dark:hover:bg-slate-800 hover:bg-gray-300`,
                pathname === item.path &&
                  "dark:bg-slate-800 bg-gray-300 font-semibold"
              )}
            >
              <item.icon />
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Sidebar;
