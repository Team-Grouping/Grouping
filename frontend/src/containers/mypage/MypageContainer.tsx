"use client";

import s from "./MypageContainer.module.scss";
import { user1 } from "@/data/user";
import { products } from "@/data/products";
import Cart from "@/containers/carts/Cart";
import ProductBox from "@/containers/mypage/MyProductBox";
import Link from "next/link";
import { PlusIcon, CopyIcon } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import {
  useWeb3AuthContext,
  Web3AuthContext,
} from "@/providers/Web3AuthClient";
import {
  editResidence,
  getUserAccount,
  setUserAccount,
  userAccount,
} from "@/firebase/getUserAccount";

export default function MyPageContainer() {
  const [user, setUser] = useState<userAccount>();
  const [editState, setEditState] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
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

  const handleEditState = () => {
    setEditState(!editState);
  };

  const commitEdit = () => {
    if (inputRef.current && user) {
      const newResidence = inputRef.current.value;
      const updatedUser = {
        ...user,
        Residence: newResidence,
      };

      setUser(updatedUser);

      editResidence(
        user.userName,
        user.walletAddress,
        user.IDToken,
        user.userNumber,
        newResidence,
      );

      setEditState(false);
    }
  };

  const { getIdToken, getAddress, getUserInfo } = useWeb3AuthContext();
  useEffect(() => {
    const fetchIdToken = async () => {
      try {
        const address = await getAddress();
        const userInfo = await getUserInfo();
        setUserAccount(userInfo.name, address!, userInfo.idToken);
        const userAccount = (await getUserAccount(
          userInfo.idToken,
        )) as userAccount;
        setUser(userAccount);
      } catch (error) {
        console.error("Failed to get ID Token:", error);
      }
    };
    fetchIdToken();
  }, [getAddress, getUserInfo]);

  const participatingProducts = products.filter((item) =>
    user1.participatingProductsId.includes(item.id),
  );
  console.log(user);
  const myProducts = products.filter((item) =>
    user1.myProductId.includes(item.id),
  );

  return (
    <div className={s.pageContainer}>
      <div className={s.greetingContainer}>
        <div className={s.idContainer}>
          <div className={s.title}>Hi</div>
          <div className={s.id}>{user?.userName}</div>
          <div className={s.title}>!</div>
        </div>

        <div className={s.greeting}>
          {greetings[Math.floor(Math.random() * 8)]}
        </div>
      </div>

      <div className={s.smallTitleContainer}>
        <div className={s.titleItem}>My Wallet Address</div>
      </div>

      <div className={s.addressContainer}>
        <div className={s.address}>
          {user === undefined
            ? "No Address Available"
            : user.walletAddress.length > 22
            ? `${user.walletAddress.slice(0, 22)}......`
            : user.walletAddress}
        </div>
        <CopyIcon width={32} height={32} />
      </div>

      <div className={s.smallTitleContainer}>
        <div className={s.titleItem}>Residence</div>
        {editState ? (
          <div className={s.edit} onClick={commitEdit}>
            Commit
          </div>
        ) : (
          <div className={s.edit} onClick={handleEditState}>
            Edit
          </div>
        )}
      </div>
      {editState ? (
        <input
          className={s.residenceContainer}
          placeholder="Enter Your Address"
          ref={inputRef}
        />
      ) : (
        <div className={s.residenceContainer}>{user?.Residence}</div>
      )}

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
