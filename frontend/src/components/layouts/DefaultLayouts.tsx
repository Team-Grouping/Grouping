"use client";

import s from "@/components/layouts/DefaultLayout.module.scss";
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
  const hideBottomBar =
    pathname.split("/")[2] === PATHS.payment || pathname === "/";

  return (
    <>
      {cartModalState && (
        <AddProductToCartModal setCartModalState={handleCartModal} />
      )}
      <TopBar />
      <main className={s.content}>{children}</main>
      {!hideBottomBar && <BottomBar setCartModalState={handleCartModal} />}
    </>
  );
}
