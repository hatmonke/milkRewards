import { classNames } from "@/utils/styling";

type GradientBorderProps = {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
};

export default function GradientBorder({
  children,
  className,
  noPadding,
}: GradientBorderProps) {
  return (
    <div
      className={classNames(
        noPadding ? "" : "p-1",
        className +
          " flex flex-col justify-center w-full bg-gradient-to-tl from-primary via-secondary to-contrast rounded-xl animate-gradient-xy"
      )}
    >
      <div className="w-full h-full rounded-xl">{children}</div>
    </div>
  );
}
