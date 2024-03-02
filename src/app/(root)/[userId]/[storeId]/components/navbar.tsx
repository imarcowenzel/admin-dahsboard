"use client";

import { usePathname } from "next/navigation";

import StoreSwitcher from "@/components/store-swticher";
import { Store } from "@prisma/client";
import MobileNavbar from "./mobile-navbar";

const Navbar = ({ stores}: { stores: Store[] }) => {
  
  const pathname = usePathname();
  const title = pathname.split("/").pop();

  return (
    <nav className="rounded-md flex items-center justify-between dark:bg-dark-secondary bg-secondary p-5 gap-5">
      <div className="flex items-center justify-between w-full gap-2">
        <MobileNavbar stores={stores} />
        <h1 className="md:text-lg font-medium capitalize">{title}</h1>
      </div>
      <StoreSwitcher stores={stores} className="hidden md:block" />
    </nav>
  );
};

export default Navbar;
