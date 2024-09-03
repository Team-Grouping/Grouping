"use client";

import s from "./DefaultLayout.module.scss";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import TopBar from "@/components/layouts/bars/Topbar";
import BottomBar from "@/components/layouts/bars/BottomBar";
import { PATHS } from "@/constants/appRoutes";
import AddProductToCartModal from "@/containers/products/detail/AddProductToCartModal";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [cartModalState, setCartModalState] = useState(false);

  const handleCartModal = () => {
    setCartModalState(!cartModalState);
  };
  const isPayment = pathname.split("/")[2] === PATHS.payment;

  return (
    <>
      {cartModalState && (
        <AddProductToCartModal setCartModalState={handleCartModal} />
      )}
      <TopBar />
      <main className={s.content}>{children}</main>
      {!isPayment && <BottomBar setCartModalState={handleCartModal} />}
    </>
  );
}
