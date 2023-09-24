import { useContractReads, useAccount } from "wagmi";

import abi from "../abi";
import distributorABI from "../distributorABI";
import {
  dividendTokenAddress,
  dividendRewardAddress,
  distributorAddress,
  chainId,
  dividendTokenSymbol,
  dividendRewardsSymbol,
  dividendTokenDecimals,
  dividendRewardsDecimals,
} from "@/utils/config";
import DividendClaimButton from "./DividendClaimButton";
import GradientBorder from "@/components/GradientBorder";
import { useEffect } from "react";

export default function DividendUserPanel() {
  const { address, isConnecting, isDisconnected } = useAccount();

  const { data, isError, isLoading, refetch } = useContractReads({
    contracts: [
      {
        address: dividendTokenAddress,
        abi: abi,
        functionName: "balanceOf",
        args: [address ?? "0x000000000000000000000000000000000000dEaD"],
        chainId,
      },
      {
        address: dividendRewardAddress,
        abi: abi,
        functionName: "balanceOf",
        args: [address ?? "0x000000000000000000000000000000000000dEaD"],
        chainId,
      },
      {
        address: distributorAddress,
        abi: distributorABI,
        functionName: "dividendOf",
        args: [
          address ?? "0x000000000000000000000000000000000000dEaD",
          dividendRewardAddress,
        ],
        chainId,
      },
      {
        address: distributorAddress,
        abi: distributorABI,
        functionName: "accumulativeDividendOf",
        args: [
          address ?? "0x000000000000000000000000000000000000dEaD",
          dividendRewardAddress,
        ],
        chainId,
      },
    ],
    staleTime: 2_000,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className="flex w-full gap-2 text-center sm:w-96">
        <div className="flex flex-col justify-between w-full h-full gap-4 p-4 bg-white/20 backdrop-blur rounded-xl ">
          <div className="text-4xl font-black text-slate-200">Balances:</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between p-2">
              <div>
                <p>{dividendTokenSymbol}</p>
              </div>
              <div className="">
                <div className="text-xl font-black text-primary">
                  <>
                    {Intl.NumberFormat("en-US", {
                      notation: "compact",
                    }).format(
                      data && data[0]
                        ? Number(data[0].result) / 10 ** dividendTokenDecimals
                        : 0
                    )}
                  </>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-2">
              <div>
                <p>{dividendRewardsSymbol}</p>
              </div>
              <div className="">
                <div className="text-xl font-black text-primary">
                  <>
                    {Intl.NumberFormat("en-US", {
                      notation: "compact",
                    }).format(
                      data && data[1]
                        ? Number(data[1].result) / 10 ** dividendRewardsDecimals
                        : 0
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>
          <div className="text-4xl font-black text-slate-200">Rewards:</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between p-2">
              <div>
                <p>Pending</p>
              </div>
              <div className="">
                <div className="text-xl font-black text-primary">
                  <>
                    {Intl.NumberFormat("en-US", {
                      notation: "compact",
                    }).format(
                      data && data[2]
                        ? Number(data[2].result) / 10 ** dividendRewardsDecimals
                        : 0
                    )}
                  </>
                </div>
                <div className="font-light text-text/70 ">
                  {dividendRewardsSymbol}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-2">
              <div>
                <p>Total</p>
              </div>
              <div className="">
                <div className="text-xl font-black text-primary">
                  <>
                    {Intl.NumberFormat("en-US", {
                      notation: "compact",
                    }).format(
                      data && data[3]
                        ? Number(data[3].result) / 10 ** dividendRewardsDecimals
                        : 0
                    )}
                  </>
                </div>
                <div className="font-light text-text/70 ">
                  {dividendRewardsSymbol}
                </div>
              </div>
            </div>
          </div>
          <DividendClaimButton refetch={refetch} />
        </div>
      </div>
    </>
  );
}
