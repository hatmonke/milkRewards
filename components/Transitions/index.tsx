import React from "react";

type SidesToCenterProps = {
  children?: React.ReactNode;
  className?: string;
  reverse?: boolean;
};

export function SideToSide({ children, className, reverse }: SidesToCenterProps) {
  return (
    <div
      className={`${className} w-full h-full bg-gradient-to-l from-text to-text bg-no-repeat duration-300 bg-[length:0%] hover:bg-[length:100%] active:bg-[length:100%] ${reverse ? 'bg-right' : 'bg-left'}`}
    >
      {children}
    </div>
  );
}

export function BottomUp({ children, className }: SidesToCenterProps) {
  return (
    <div
      className={`${className} bg-gradient-to-l from-neutral to-neutral bg-[length:0%] bg-left bg-no-repeat duration-300 hover:bg-[length:100%] active:bg-[length:100%]`}
    >
      <div className="flex flex-col justify-center">{children}</div>
    </div>
  );
}

export function TopAndBottomToCenter({
  children,
  className,
}: SidesToCenterProps) {
  return (
    <a
      href="#_"
      className={`${className} group relative overflow-hidden rounded-lg border border-secondary/20 bg-secondary/20 px-5 py-3 font-medium text-gray-600 shadow-inner`}
    >
      <span className="ease absolute top-0 left-0 h-0 w-0 border-t-2 border-secondary transition-all duration-200 group-hover:w-full"></span>
      <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-secondary transition-all duration-200 group-hover:w-full"></span>
      <span className="ease absolute top-0 left-0 h-0 w-full bg-secondary transition-all delay-200 duration-300 group-hover:h-full"></span>
      <span className="ease absolute bottom-0 left-0 h-0 w-full bg-secondary transition-all delay-200 duration-300 group-hover:h-full"></span>
      <span className="absolute inset-0 h-full w-full bg-primary opacity-0 delay-300 duration-300 group-hover:opacity-100"></span>
      <span className="ease relative transition-colors delay-200 duration-300 group-hover:text-contrast">
        {children}
      </span>
    </a>
  );
}
