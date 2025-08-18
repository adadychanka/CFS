import {ReactNode} from "react";

const NewChartWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full aspect-[4/3] border-1 rounded-md p-2">
      {children}
    </div>
  );
};

export default NewChartWrapper;
