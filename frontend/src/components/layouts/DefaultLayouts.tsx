"use client";

import s from "./DefaultLayout.module.scss";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import TopBar from "@/components/layouts/bars/Topbar";
import BottomBar from "@/components/layouts/bars/BottomBar";
import { PATHS } from "@/constants/appRoutes";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPayment = pathname.split("/")[2] === PATHS.payment;

  return (
    <>
      <TopBar />
      <main className={s.content}>{children}</main>
      {!isPayment && <BottomBar />}
    </>
  );
}
