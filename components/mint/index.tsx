"use client";

import GradientBorder from "../GradientBorder";
import GradientSpan from "../GradientSpan";
import ContractPanel from "./ContractPanel";
import NFTRewardsPanel from "./NFTRewardsPanel";

export default function Buyback() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <GradientBorder>
          <section className="py-4 sm:py-6 lg:py-8 bg-basebg rounded-xl">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <div className="text-center">
                <h2 className="text-5xl font-bold">
                  <GradientSpan>The Kings Chosen</GradientSpan>
                </h2>
                <p className="mt-4 text-base font-bold text-text/80">
                  SHIBKING NFT - Shib Army
                </p>
              </div>

              <div className="max-w-xs mx-auto mt-10 overflow-hidden shadow bg-white/5 rounded-xl">
                <div className="p-6 sm:p-8">
                  <div>
                    <video
                      className="object-cover w-full h-auto rounded-xl"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src="/NFTs.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <ContractPanel />
                </div>
              </div>
            </div>
            <NFTRewardsPanel />
          </section>
        </GradientBorder>
      </div>
    </>
  );
}
