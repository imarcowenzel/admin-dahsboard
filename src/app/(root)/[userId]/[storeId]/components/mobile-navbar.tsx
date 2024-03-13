"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Store } from "@prisma/client";
import { MenuIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

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
import { menuItems } from "@/utils/data";

const MobileNavbar = ({ stores }: { stores: Store[] }) => {
  const { user } = useUser();
  const { userId, storeId } = useParams();
  const pathname = usePathname();
  const router = useRouter();

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
            <SheetClose key={item.title} asChild>
              <li>
                <SheetClose className="w-full">
                  <button
                    onClick={() =>
                      router.push(`/${userId}/${storeId}/${item.path}`)
                    }
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
