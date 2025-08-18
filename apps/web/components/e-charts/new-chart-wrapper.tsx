import {ReactNode} from "react";
import {cn} from "@repo/ui/lib/utils";

const NewChartWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-full border-1 rounded-md p-2  aspect-square @xs:aspect-[4/3] @lg:aspect-video @2xl:aspect-[4/3] @4xl:aspect-video @5xl:col-span-1 @5xl:aspect-[4/3]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default NewChartWrapper;
