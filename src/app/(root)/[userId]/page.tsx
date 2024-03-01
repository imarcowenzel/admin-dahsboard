import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";

import MainTabs from "./components/tabs";

const HomePage = async () => {
  
  const user = await currentUser();
  const stores = await prismadb.store.findMany({
    where: {
      userId: user?.id,
    },
  });

  return (
    <main className="flex flex-col h-screen items-center justify-center gap-y-5 bg-gray-200 dark:bg-gray-800">
      <h1 className="font-bold">
        Welcome, {user?.username || user?.firstName}!
      </h1>
      <MainTabs stores={stores} />
    </main>
  );
};

export default HomePage;
