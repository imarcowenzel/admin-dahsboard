import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  if (userId) redirect(`/${userId}`);

  return null;
};

export default Page;
