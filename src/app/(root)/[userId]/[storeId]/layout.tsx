import { redirect } from "next/navigation";
import React from "react";

import prismadb from "@/lib/prismadb";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) => {
  const stores = await prismadb.store.findMany({
    where: {
      userId: params?.userId,
    },
  });

  if (!stores) redirect("/");

  return (
    <div className="flex">
      <aside className="flex-[1] hidden md:block p-5 min-h-svh dark:bg-dark-secondary bg-secondary">
        <Sidebar />
      </aside>
      <main className="md:flex-[5] p-5 w-full">
        <Navbar stores={stores} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
