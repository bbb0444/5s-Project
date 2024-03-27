import Header from "./components/Header";
import About from "./components/About";
import Copyright from "./components/Copyright";
import "./globals.scss";

export default function Home() {
  return (
    <main className="">
      <Header />
      <About />
      <Copyright />
    </main>
  );
}
