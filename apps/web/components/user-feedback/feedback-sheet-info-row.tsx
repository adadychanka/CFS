import { ReactNode } from "react";

type Props = {
  label: string;
  children: ReactNode;
};

const FeedbackSheetInfoRow = ({ label, children }: Props) => {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      {children}
    </div>
  );
};

export default FeedbackSheetInfoRow;
