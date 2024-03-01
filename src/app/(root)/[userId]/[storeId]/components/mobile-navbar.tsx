"use client";

import StoreSwitcher from "@/components/store-swticher";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import { Store } from "@prisma/client";
import {
  LayoutDashboardIcon,
  LucideIcon,
  MenuIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

const MobileNavbar = ({ stores }: { stores: Store[] }) => {
  const { user } = useUser();
  const { userId, storeId } = useParams();
  const pathname = usePathname();
  const router = useRouter();

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
          <div className="gap-5 py-5 flex items-center justify-between">
            <div className="gap-3 flex items-center justify-start">
              <UserButton afterSignOutUrl="/sign-in" />
              <span className="text-sm font-medium">
                {user?.username || user?.firstName || "User"}
              </span>
            </div>
            <ModeToggle />
          </div>
        </SheetHeader>

        <ul className="flex flex-col gap-y-2 py-5">
          {menuItems.map((item) => (
            <SheetClose asChild>
              <li key={item.title}>
                <SheetClose className="w-full">
                  <button
                    onClick={() => router.push(item.path)}
                    className={cn(
                      `py-5 pl-3 w-full flex items-center gap-3 rounded-md dark:hover:bg-slate-800 hover:bg-gray-300`,
                      pathname === item.path &&
                        "dark:bg-slate-800 bg-gray-300 font-semibold"
                    )}
                  >
                    <item.icon />
                    {item.title}
                  </button>
                </SheetClose>
              </li>
            </SheetClose>
          ))}
        </ul>

        <SheetFooter>
          <StoreSwitcher stores={stores} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
