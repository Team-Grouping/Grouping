import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import DefaultLayout from "@/components/layouts/DefaultLayouts";
import Web3Auth from "@/providers/Web3Auth";

const inter = Inter({ subsets: ["latin"] });
const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: "Grouping",
  description: "Web 3.0 group buying platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.className} ${inter.className}`}>
        <Web3Auth>
          <DefaultLayout>{children} </DefaultLayout>
        </Web3Auth>
      </body>
    </html>
  );
}
