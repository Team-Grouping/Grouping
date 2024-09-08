"use client";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import s from "@/containers/connectWallet/ConnectWalletButton.module.scss";
import { MouseEvent } from "react";

const ConnectWalletButton = () => {
  const { isConnected, connect, logout, web3Auth } = useWeb3Auth();

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>) => {
    if (web3Auth) {
      if (isConnected) {
        await logout(); // logout 함수는 인자를 필요로 하지 않도록 호출
      } else {
        await connect();
      }
    }
  };

  const content = isConnected ? "Disconnect" : "Connect";

  return (
    <button className={s.button} onClick={handleButtonClick}>
      {content}
    </button>
  );
};

export default ConnectWalletButton;
