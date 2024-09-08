"use client";
import { web3AuthContextConfig } from "@/constants/web3auth/w3aConfig";
import {
  Web3AuthProvider,
  Web3AuthInnerContext,
} from "@web3auth/modal-react-hooks";
import { WalletServicesProvider } from "@web3auth/wallet-services-plugin-react-hooks";
import { ReactNode } from "react";
import { Web3AuthClient } from "./Web3AuthClient";

export default function Web3Auth({ children }: { children: ReactNode }) {
  return (
    <Web3AuthProvider config={web3AuthContextConfig}>
      <WalletServicesProvider context={Web3AuthInnerContext}>
        <Web3AuthClient>{children}</Web3AuthClient>
      </WalletServicesProvider>
    </Web3AuthProvider>
  );
}
