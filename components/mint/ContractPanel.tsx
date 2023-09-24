"use client";

import { HighlighterItem } from "../highlighter";
import { useContractReads } from "wagmi";
import ABI from "./abi";
import { nftAddress1, chainId, maxSupply1, gasCoin } from "@/utils/config";
import GradientSpan from "../GradientSpan";
import MintButton from "./MintButton";
import AmountPicker from "./AmountPicker";
import { useEffect, useState } from "react";
import Image from "next/image";
import GradientBorder from "../GradientBorder";

export default function ContractPanel() {
  const [mintAmount, setMintAmount] = useState(1);
  const [isClient, setIsClient] = useState(false);

  const { data, isError, isLoading, refetch } = useContractReads({
    contracts: [
      {
        address: nftAddress1,
        abi: ABI,
        functionName: "totalSupply",
        chainId: chainId,
      },
      {
        address: nftAddress1,
        abi: ABI,
        functionName: "maxSupply",
        chainId: chainId,
      },
      {
        address: nftAddress1,
        abi: ABI,
        functionName: "cost",

        chainId: chainId,
      },
    ],
    staleTime: 2_000,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative z-20 flex flex-col w-full h-full gap-3 p-2 overflow-hidden rounded-xl">
      <div className="mt-6 space-y-5">
        {isClient ? (
          <div className="flex items-center justify-center pb-1 text-3xl font-bold text-center md:text-4xl text-text ">
            <GradientSpan>
              <p className="">{data ? Number(data[0].result) ?? 0 : 0}</p>
            </GradientSpan>{" "}
            / <span>{data ? Number(data[1].result) ?? maxSupply1 : 0}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center pb-1 text-3xl font-bold text-center md:text-4xl text-text ">
            <GradientSpan>
              <p className="">0</p>
            </GradientSpan>{" "}
            / <span>{maxSupply1}</span>
          </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <span className="text-base font-medium ">Amount:</span>
          <AmountPicker value={mintAmount} setValue={setMintAmount} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base font-medium ">Mint Cost:</span>
          <GradientBorder>
            <div className="flex items-center justify-center gap-4 p-1 px-2 rounded-xl bg-basebg">
              <p className="text-3xl font-bold text-center text-primary ">
                {isClient
                  ? Intl.NumberFormat("en-US", {
                      notation: "compact",
                    }).format(
                      data
                        ? ((Number(data[2].result) ?? 0) * mintAmount) /
                            10 ** 18
                        : 0
                    )
                  : Intl.NumberFormat("en-US", {
                      notation: "compact",
                    }).format(0)}
              </p>
              <Image
                src="/images/BONE.webp"
                width={32}
                height={32}
                alt="bone"
              />
            </div>
          </GradientBorder>
        </div>
        <MintButton
          refetch={refetch}
          amount={mintAmount}
          cost={data ? Number(data[2].result) ?? 0 : 0}
        />
      </div>
    </div>
  );
}
