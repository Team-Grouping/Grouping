import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import s from "./BottomBar.module.scss";
import { PATHS, replaceUserId } from "@/constants/appRoutes";

// 상수 정의
const ICONS = {
  home: "/images/homeButton.svg",
  selectedHome: "/images/selectedHomeButton.svg",
  shoppingCart: "/images/shoppingCart.svg",
  selectedShoppingCart: "/images/selectedShoppingCart.svg",
  myPage: "/images/personButton.svg",
  selectedMyPage: "/images/selectedPersonButton.svg",
};

export default function BottomBar() {
  const pathname = usePathname();
  const userId = pathname.split("/")[1];

  const pathMyPageUserId = replaceUserId(PATHS.myPage, userId);
  const pathCartUserId = replaceUserId(PATHS.shoppingCart, userId);

  return (
    <div className={s.bottomBar}>
      <>
        <Link href={pathMyPageUserId}>
          <Image
            src={
              pathname === pathMyPageUserId
                ? ICONS.selectedMyPage
                : ICONS.myPage
            }
            alt="마이페이지"
            width={36}
            height={36}
            className={s.icon2}
          />
        </Link>

        <Link href={PATHS.home}>
          <Image
            src={pathname === PATHS.home ? ICONS.selectedHome : ICONS.home}
            alt="홈"
            width={40}
            height={40}
            className={s.icon2}
          />
        </Link>

        <Link href={pathCartUserId}>
          <Image
            src={
              pathname === pathCartUserId
                ? ICONS.selectedShoppingCart
                : ICONS.shoppingCart
            }
            alt="카트"
            width={36}
            height={36}
            className={s.icon2}
          />
        </Link>
      </>
    </div>
  );
}
