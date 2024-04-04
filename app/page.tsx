import Copyright from "./components/Copyright";
import "./globals.scss";
import LandingPage from "./components/LandingPage";
import { verify } from "./lib/Auth";

export default async function Home() {
  const isVerified = await verify(undefined);

  return (
    <main>
      <LandingPage isVerified={isVerified} />
      <Copyright />
    </main>
  );
}
