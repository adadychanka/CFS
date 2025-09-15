import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";

type Props = {
  Icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
};

/**
 * Component for showing errors as a whole page. Pass more components as children below the content
 */
const ErrorWholePage = ({ Icon, title, description, children }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen w-full text-center px-4">
      <Icon className="w-16 h-16 text-neutral-400 mb-4" />
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-neutral-600">{description}</p>
      {children}
    </div>
  );
};

export default ErrorWholePage;
