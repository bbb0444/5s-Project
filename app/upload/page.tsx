"use server";
import { verify } from "@/app/lib/Auth";
import Main from "./Main";

const Page = async () => {
  const isVerified = await verify(undefined);

  return <Main isVerified={isVerified} />;
};

export default Page;
