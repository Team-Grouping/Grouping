import s from "./MypageContainer.module.scss";

import { user1 } from "@/data/user";
import { products } from "@/data/products";
import Cart from "@/containers/carts/Cart";
import ProductBox from "@/containers/mypage/MyProductBox";

import Link from "next/link";
import { PlusIcon, CopyIcon } from "lucide-react";

export default function MyPageContainer() {
  const greetings = [
    "It's Good Day to Buy Something!",
    "Join The Crowd! It's a Perfect Day To Save Big Together!",
    "It's Too Good Opportunity To Miss!",
    "Let's Shop Together! Amazing Deals Are Just a Click Away!",
    "Discover Unbeatable Group Discounts Now!",
    "Welcome To The Future Of Group Buying : Secure And Transparent!",
    "Shop Smarter Together! Blockchain-Secured Deals Just For You!",
    "Gather 'Round For Today's Hottest Offers!",
  ];

  const participatingProducts = products.filter((item) =>
    user1.participatingProductsId.includes(item.id),
  );

  const myProducts = products.filter((item) =>
    user1.myProductId.includes(item.id),
  );

  return (
    <div className={s.pageContainer}>
      <div className={s.greetingContainer}>
        <div className={s.idContainer}>
          <div className={s.title}>Hi</div>
          <div className={s.id}>{user1.Id}</div>
          <div className={s.title}>!</div>
        </div>

        <div className={s.greeting}>
          {greetings[Math.floor(Math.random() * 8)]}
        </div>
      </div>

      <div className={s.smallTitleContainer}>
        <div className={s.titleItem}>My Wallet Address</div>
        <div className={s.add}>
          <PlusIcon />
        </div>
      </div>

      {user1.walletAddresses.map((address, index) => (
        <div className={s.addressContainer} key={index}>
          <div className={s.address}>
            {address.length > 22 ? `${address.slice(0, 22)}......` : address}
          </div>
          <CopyIcon width={32} height={32} />
        </div>
      ))}

      <div className={s.smallTitleContainer}>
        <div className={s.titleItem}>Residence</div>
        <div className={s.edit}>Edit</div>
      </div>

      <div className={s.residenceContainer}>{user1.residence}</div>

      <div className={s.titleSmall}>Participating GroupBuys</div>
      {participatingProducts.map((product, index) => (
        <Link
          className={s.product}
          href={`${product.id}/productDetail`}
          key={index}
        >
          <ProductBox item={product} />
        </Link>
      ))}

      <div className={s.smallTitleContainer}>
        <div className={s.titleItem}>My Products</div>
        <div className={s.edit}>Edit</div>
      </div>
      {myProducts.map((product, index) => (
        <Link
          className={s.product}
          href={`${product.id}/productDetail`}
          key={index}
        >
          <ProductBox item={product} />
        </Link>
      ))}
    </div>
  );
}
