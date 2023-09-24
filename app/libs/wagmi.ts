import { configureChains } from "@wagmi/core";
import { Chain, createConfig } from "wagmi";
import { mainnet, polygon, optimism, bsc } from "wagmi/chains";
import { publicProvider } from "@wagmi/core/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { getDefaultConfig } from "connectkit";

export const milkomeda = {
  id: 2001,
  name: "Milkomeda",
  network: "Milkomeda",
  nativeCurrency: {
    decimals: 18,
    name: "Cardano",
    symbol: "ADA",
  },
  rpcUrls: {
    public: { http: ["https://rpc-mainnet-cardano-evm.c1.milkomeda.com"] },
    default: { http: ["https://rpc-mainnet-cardano-evm.c1.milkomeda.com"] },
  },
  blockExplorers: {
    etherscan: {
      name: "Blockscout",
      url: "https://explorer-mainnet-cardano-evm.c1.milkomeda.com",
    },
    default: {
      name: "Blockscout",
      url: "https://explorer-mainnet-cardano-evm.c1.milkomeda.com",
    },
  },
  contracts: {
    multicall3: {
      address: "0x6fc0A9A23147D8e38570BDbC7A078Ec7ea36633A",
      blockCreated: 13951521,
    },
  },
} as const satisfies Chain;

export const shibarium = {
  id: 109,
  name: "Shibarium",
  network: "Shibarium",
  nativeCurrency: {
    decimals: 18,
    name: "Bone",
    symbol: "BONE",
  },
  rpcUrls: {
    public: { http: ["https://www.shibrpc.com"] },
    default: { http: ["https://www.shibrpc.com"] },
  },
  blockExplorers: {
    etherscan: { name: "Blockscout", url: "https://shibariumscan.io/" },
    default: { name: "Blockscout", url: "https://shibariumscan.io/" },
  },
  contracts: {
    multicall3: {
      address: "0x39457C9934105Daf9bfA176389c49bBBDd272329",
      blockCreated: 284563,
    }
  },
} as const satisfies Chain;

const chains = [mainnet,milkomeda];
export const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.ALCHEMY_ID, // or infuraId
    walletConnectProjectId: "19c5ce25ac27e797e73401028ddb97fd",
    // Required
    appName: "Your App Name",
    chains,
  })
);
