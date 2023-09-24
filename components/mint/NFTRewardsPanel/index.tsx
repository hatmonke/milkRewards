"use client";

import { useAccount, useContractReads } from "wagmi";
import ABI from "../abi";
import RouterABI from "@/utils/ABIs/Router";
import {
  nftAddress1,
  chainId,
  maxSupply1,
  gasCoin,
  rewardsInTokens,
  rewardAddress,
  routerAddress,
  wbnbAddress,
  rewardSymbol,
  rewardsDecimals,
  LogoPath,
} from "@/utils/config";
import ClaimButton from "./ClaimButton";
import { useEffect, useState } from "react";

export default function NFTRewardsPanel() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [ethRewardsBalance, setEthRewardsBalance] = useState(0n);
  const [tokenRewardsBalance, setTokenRewardsBalance] = useState<any>(0);

  const { data, isError, isLoading, refetch } = useContractReads({
    contracts: [
      {
        address: nftAddress1,
        abi: ABI,
        functionName: "getReflectionBalances",
        chainId: chainId,
        args: [address ?? "0x000000000000000000000000000000000000dEaD"],
      },
    ],
    staleTime: 2_000,
  });

  useEffect(() => {
    if (!data) return;
    setEthRewardsBalance(data[0].result as bigint);
    console.log(data);
  }, [data]);

  const {
    data: tokenRewardsData,
    isError: tokenRewardsIsError,
    isLoading: tokenRewardsIsLoading,
    refetch: tokenRewardsRefetch,
  } = useContractReads({
    contracts: [
      {
        address: routerAddress,
        abi: RouterABI,
        functionName: "getAmountsOut",
        chainId: chainId,
        args: [ethRewardsBalance, [wbnbAddress, rewardAddress]],
      },
    ],
    staleTime: 2_000,
  });

  useEffect(() => {
    if (ethRewardsBalance === 0n) {
      setTokenRewardsBalance(0n);
      return;
    }
    tokenRewardsRefetch();
    if (
      tokenRewardsData &&
      tokenRewardsData[0] &&
      tokenRewardsData[0].result &&
      Array.isArray(tokenRewardsData[0].result)
    ) {
      const result: bigint[] = tokenRewardsData[0].result;
      setTokenRewardsBalance(result[1]);
      console.log("tokenRewardsData", result[1]);
    }
  }, [tokenRewardsData, data]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-w-xs gap-4 p-3 mx-auto mt-10 overflow-hidden text-center bg-text/5 rounded-xl">
      <h3 className="text-3xl font-bold">Rewards:</h3>
      <div className="flex flex-col items-center justify-center gap-2 text-6xl font-bold text-text ">
        {Intl.NumberFormat("en-US", {
          notation: "compact",
        }).format(
          rewardsInTokens
            ? Number(tokenRewardsBalance) / 10 ** rewardsDecimals
            : Number(ethRewardsBalance) / 10 ** 18
        )}
        <img
          src={rewardsInTokens ? LogoPath : "/images/eth.svg"}
          className="h-8"
        />
      </div>
      <ClaimButton refetch={refetch} />
    </div>
  );
}
