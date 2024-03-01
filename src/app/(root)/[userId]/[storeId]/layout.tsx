import React from "react";

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="flex-[1] p-5 min-h-svh dark:bg-slate-900 bg-gray-200">
        <Sidebar />
      </div>
      <div className="flex-[4] p-5">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
