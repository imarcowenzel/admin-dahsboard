import { redirect } from "next/navigation";
import React from "react";

import prismadb from "@/lib/prismadb";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
  params: { userId: string };
}

const AdminLayout: React.FC<AdminLayoutProps> = async ({
  children,
  params,
}) => {

  const stores = await prismadb.store.findMany({
    where: {
      userId: params?.userId,
    },
  });

  if (!stores) redirect("/");

  return (
    <div className="flex">
      <aside className="flex-[1] md:w-64 hidden fixed top-0 md:block p-5 min-h-svh dark:bg-dark-secondary bg-secondary">
        <Sidebar />
      </aside>
      <main className="md:flex-[4] md:ml-64 p-5 w-full">
        <Navbar stores={stores} />
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;