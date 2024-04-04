"use server";
import { verify } from "@/app/lib/Auth";
import Main from "./Main";
import Layout from "@/app/components/Layout";

const Page = async () => {
  const isVerified = await verify(undefined);

  return (
    <Layout>
      <Main isVerified={isVerified} />
    </Layout>
  );
};

export default Page;
