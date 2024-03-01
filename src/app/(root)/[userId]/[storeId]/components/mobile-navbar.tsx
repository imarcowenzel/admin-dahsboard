"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  LayoutDashboardIcon,
  LucideIcon,
  MenuIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const MobileNavbar = () => {
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
    <Sheet>
      <SheetTrigger
        asChild
        className="md:hidden bg-transparent border-none p-0"
      >
        <Button variant="outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <ul className="flex flex-col gap-y-2 py-5">
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
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
