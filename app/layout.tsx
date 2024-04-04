import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "five senses project",
  description: "an experimental glue project ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" className="m-0">
        <body className={inter.className}>{children}</body>
      </html>
  );
}
