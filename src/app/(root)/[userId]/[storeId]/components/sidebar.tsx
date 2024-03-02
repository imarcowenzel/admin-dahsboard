"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";
import { menuItems } from "@/utils/data";

const Sidebar = () => {

  const { user } = useUser();
  const { userId, storeId } = useParams();
  const pathname = usePathname();

  return (

    <div className="flex flex-col gap-5 overflow-hidden">

      {/* MENU TOP */}
      <div className="gap-5 flex items-center justify-between">
        <div className="gap-3 flex items-center justify-start">
          <UserButton afterSignOutUrl="/sign-in" />
          <span className="text-sm font-medium">
            {user?.username || user?.firstName || "User"}
          </span>
        </div>
        <ModeToggle />
      </div>

      {/* MENU LIST */}
      <ul className="flex flex-col gap-y-2">
        {menuItems.map((item) => (
          <li key={item.title}>
            <Link
              href={`/${userId}/${storeId}/${item.path}`}
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
