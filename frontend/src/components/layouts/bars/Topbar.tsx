import Image from "next/image";
import s from "./TopBar.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PATHS } from "@/constants/appRoutes";
import ConnectWalletButton from "@/containers/connectWallet/ConnectWalletButton";

// 상수 정의
const SEARCH_BUTTON = "/images/searchIcon.svg";
const LOGO = "/images/GroupingLogo.png";
const BACK_BUTTON = "/images/backButton.svg";

export default function TopBar() {
  // TODO GET userId from web3auth tokenId
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);
  const userId = pathSegments[2];

  // 페이지 상태를 확인하는 함수
  const isPage = (page: string) =>
    pathSegments.length > 2 && pathSegments[2] === page;

  const isHome = pathname === PATHS.home;
  const isDetailPage = isPage("detail") && !isNaN(Number(userId));
  const isShoppingCart = isPage("carts");
  const isMyPage = isPage("mypage");
  const isPayment = isPage("payments");

  // 백 링크 결정
  const backLink =
    isDetailPage || isShoppingCart || isMyPage
      ? PATHS.home
      : isPayment
      ? PATHS.shoppingCart.replace(":userId", userId)
      : null;

  return (
    <div className={s.topBar}>
      {isHome && <ConnectWalletButton />}
      {backLink && (
        <Link href={backLink}>
          <Image
            src={BACK_BUTTON}
            alt="Prev"
            width={24}
            height={24}
            className={s.icon1}
          />
        </Link>
      )}
      <Link href={PATHS.home}>
        <Image
          src={LOGO}
          alt="Grouping"
          width={40}
          height={40}
          className={`${s.icon1} ${s.homeLogo}`}
          priority={true}
        />
      </Link>
      {(isDetailPage || isShoppingCart || isPayment || isMyPage) && (
        <div className={s.spacer} />
      )}
      {isHome && (
        <Image
          src={SEARCH_BUTTON}
          alt="Search"
          width={36}
          height={36}
          className={s.icon1}
        />
      )}
    </div>
  );
}
