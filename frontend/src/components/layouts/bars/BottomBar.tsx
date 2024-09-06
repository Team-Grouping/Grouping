import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import s from "./BottomBar.module.scss";
import { PATHS, replaceId } from "@/constants/appRoutes";
import MoveToCartButton from "@/containers/products/detail/MoveToCartButton";
import { useProductItems } from "@/data/store/useProductStore";
import { Product } from "@/type/types";

// 상수 정의
const ICONS = {
  home: "/images/homeButton.svg",
  selectedHome: "/images/selectedHomeButton.svg",
  shoppingCart: "/images/shoppingCart.svg",
  selectedShoppingCart: "/images/selectedShoppingCart.svg",
  myPage: "/images/personButton.svg",
  selectedMyPage: "/images/selectedPersonButton.svg",
};

interface bottomBarProps {
  setCartModalState: () => void;
}

export default function BottomBar({ setCartModalState }: bottomBarProps) {
  const pathname = usePathname();

  // TODO GET userID from web3auth tokenId
  const userId = "1";

  const pathMyPageUserId = replaceId(PATHS.myPage, userId);
  const pathCartUserId = replaceId(PATHS.shoppingCart, userId);

  const isDetailPage = pathname.split("/")[3] === "detail";

  const productId = parseInt(pathname.split("/")[2]);
  const products = useProductItems();
  const product = products.find((p: Product) => p.id === productId);
  return (
    <div className={s.bottomBar}>
      {isDetailPage && product ? (
        <MoveToCartButton
          item={product}
          setCartModalState={setCartModalState}
        />
      ) : (
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
      )}
    </div>
  );
}
