import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import SettingsForm from "./components/settings-form";

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {

  const store = await prismadb.store.findUnique({
    where: {
      id: params.storeId,
    },
  });

  if (!store) redirect("/");

  return (
    <article className="mt-5">
      <SettingsForm initialData={store} />
    </article>
  );
};

export default SettingsPage;
