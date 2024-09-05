import { UX_MODE } from "@toruslabs/openlogin-utils";
import { chain } from "./chainConfig";
import { WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";

const clientId =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_CLIENT_ID_PRODUCTION
    : process.env.NEXT_PUBLIC_CLIENT_ID_DEVELOPMENT;

const network =
  process.env.NODE_ENV === "production"
    ? WEB3AUTH_NETWORK.SAPPHIRE_MAINNET
    : WEB3AUTH_NETWORK.SAPPHIRE_DEVNET;
if (typeof clientId !== "string") {
  throw new Error("Client ID must be a string");
}

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig: chain.sepolia,
  },
});

export const web3AuthOptions: Web3AuthOptions = {
  clientId,
  web3AuthNetwork: network,
  privateKeyProvider,
};

export const openloginAdapter = new OpenloginAdapter({
  loginSettings: {
    mfaLevel: "none",
  },
  adapterSettings: {
    uxMode: UX_MODE.POPUP, // "redirect" | "popup"
  },
  privateKeyProvider,
});

export const walletServicesPlugin = new WalletServicesPlugin();

export const web3AuthContextConfig = {
  web3AuthOptions,
  adapters: [openloginAdapter],
  plugins: [walletServicesPlugin],
};
