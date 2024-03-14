import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import MainTabs from "./components/tabs";

const HomePage = async () => {
  
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const stores = await prismadb.store.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <main className="flex flex-col h-svh items-center justify-center gap-5 p-5 bg-secondary dark:bg-dark-primary">
      <h1 className="font-medium text-xl md:text-2xl">
        Welcome, {user?.username || user?.firstName || "User"}!
      </h1>
      <MainTabs stores={stores} />
    </main>
  );
};

export default HomePage;
