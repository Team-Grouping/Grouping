import Image from "next/image";
import s from "@/components/layouts/bars/Topbar.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PATHS } from "@/constants/appRoutes";
import ConnectWalletButton from "@/containers/connectWallet/ConnectWalletButton";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";

// 상수 정의
const SEARCH_BUTTON = "/images/searchIcon.svg";
const LOGO = "/images/GroupingLogo.png";
const BACK_BUTTON = "/images/backButton.svg";

export default function TopBar() {
  // TODO GET userId from web3auth tokenId
  let userId = "1";
  const { userInfo } = useWeb3Auth();
  if (userInfo) {
    userId = userInfo.idToken || "1";
  }

  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  // 페이지 상태를 확인하는 함수
  const isPage = (page: string) =>
    pathSegments.length > 2 && pathSegments[2] === page;

  const isHome = pathname === PATHS.home;
  const isDetailPage = isPage("detail");
  const isShoppingCart = isPage("carts");
  const isMyPage = isPage("mypage");
  const isPayment = isPage("payments");
  const isNewPage = pathname === PATHS.productNew;
  const isSearch = pathname === PATHS.search;

  // 백 링크 결정
  const backLink =
    isDetailPage || isShoppingCart || isMyPage || isNewPage || isSearch
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
      {(isDetailPage ||
        isShoppingCart ||
        isPayment ||
        isMyPage ||
        isNewPage ||
        isSearch) && <div className={s.spacer} />}
      {isHome && (
        <Link href={PATHS.search}>
          <Image
            src={SEARCH_BUTTON}
            alt="Search"
            width={36}
            height={36}
            className={s.searchIcon}
          />
        </Link>
      )}
    </div>
  );
}
