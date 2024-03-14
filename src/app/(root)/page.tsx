import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  if (user) redirect(`/${user.id}`);

  return null;
};

export default Page;
