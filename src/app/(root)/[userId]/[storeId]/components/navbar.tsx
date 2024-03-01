import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/store-swticher";
import prismadb from "@/lib/prismadb";

const Navbar = async ({ params }: { params?: { userId: string } }) => {

  const stores = await prismadb.store.findMany({
    where: {
      userId: params?.userId,
    },
  });

  if (!stores) redirect("/");

  return (
    <nav className="rounded-md flex items-center justify-end dark:bg-slate-900 bg-gray-200 p-5">
      <StoreSwitcher stores={stores} />
    </nav>
  );
};

export default Navbar;
