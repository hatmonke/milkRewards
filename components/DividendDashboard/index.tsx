import React from "react";
import DividendUserPanel from "./DividendUserPanel";
import GradientSpan from "../GradientSpan";
import { ProjectName } from "@/utils/config";

export default function DividendDashboard() {
  return (
    <>
      <div className="flex flex-col justify-center space-y-4 w-[95vw] sm:w-fit my-[5vh] lg:my-0">
        <h1 className="font-black text-center text-6xl xl:text-8xl max-w-[95vw]">
          <GradientSpan>{ProjectName}</GradientSpan>
        </h1>
        <h2 className="font-mono text-2xl text-center uppercase text-text/80 xl:text-5xl">
          Rewards
        </h2>
        <div className="w-full pb-4 mx-auto sm:w-fit">
          <DividendUserPanel />
        </div>
      </div> 
    </>
  );
}
