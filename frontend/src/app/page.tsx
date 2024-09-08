"use client";
import { MouseEvent, useEffect } from "react";
import styles from "@/app/page.module.scss";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const { isConnected, connect, web3Auth } = useWeb3Auth();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push("/products");
    }
  }, [isConnected]);

  const handleLogin = async (event: MouseEvent<HTMLButtonElement>) => {
    if (web3Auth) {
      if (isConnected) {
        router.push("/products");
      } else {
        await connect();
      }
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1 className={styles.title}>Grouping</h1>
        <div className={styles.description}>
          <h2>A decentralized Web 3.0 social commerce platform</h2>
        </div>
        <Image
          className={styles.logo}
          src="/images/GroupingLogo.png"
          alt="Grouping"
          width={200}
          height={200}
        />
        <div className={styles.description}>
          <p>enables safe and transparent group purchasing</p>
        </div>
      </div>
      <button className={styles.button} onClick={handleLogin}>
        Try Grouping!
      </button>
    </main>
  );
}
