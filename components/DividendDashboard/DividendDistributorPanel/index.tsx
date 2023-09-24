"use client";
import { useContractReads } from "wagmi";

import distributorABI from "../distributorABI";
import {
  distributorAddress,
  chainId,
  dividendRewardsDecimals,
  dividendRewardsSymbol,
} from "@/utils/config";
import GradientBorder from "@/components/GradientBorder";
import { useState, useEffect } from "react";

export default function DividendDistributorPanel() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isError, isLoading, refetch } = useContractReads({
    contracts: [
      {
        address: distributorAddress,
        abi: distributorABI,
        functionName: "totalDistributed",
        chainId,
      },
      {
        address: distributorAddress,
        abi: distributorABI,
        functionName: "totalDividends",
        chainId,
      },
    ],
    staleTime: 2_000,
  });

  return (
    <>
      <div className="flex w-full gap-2 text-center sm:w-96">
        <GradientBorder>
          <div className="flex flex-col justify-between h-full gap-2 p-4 bg-basebg rounded-xl">
            <div className="flex flex-row justify-between h-full divide-x divide-text/30">
              <div className="flex flex-col items-center justify-center w-full p-2 text-center">
                <div className="font-light text-text/70 whitespace-nowrap">
                  Total Distributed
                </div>
                <div className="text-6xl font-black text-yellow-200">
                  <>
                    {isClient
                      ? Intl.NumberFormat("en-US", {
                          notation: "compact",
                        }).format(
                          data && data[0]
                            ? Number(data[0].result) /
                                10 ** dividendRewardsDecimals
                            : 0
                        )
                      : 0}
                  </>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center w-full p-2 text-center">
                <div className="font-light text-text/70 whitespace-nowrap">
                  Total Dividends
                </div>
                <div className="text-6xl font-black text-yellow-200">
                  <>
                  {isClient
                      ? Intl.NumberFormat("en-US", {
                      notation: "compact",
                    }).format(
                      data && data[1]
                        ? Number(data[1].result) / 10 ** dividendRewardsDecimals
                        : 0
                    ) : 0
                    }
                  </>
                </div>
              </div>
            </div>
          </div>
        </GradientBorder>
      </div>
    </>
  );
}
