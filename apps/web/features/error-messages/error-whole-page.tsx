import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";
import Link from "next/link";
import { Button } from "@repo/ui/components/button";

type Props = {
  Icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
};

/**
 * Component for showing errors as a whole page.
 */
const ErrorWholePage = ({ Icon, title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen w-full text-center px-4">
      <Icon className="w-16 h-16 text-neutral-400 mb-4" />
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-neutral-600">{description}</p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/">
          <Button>Go back home</Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorWholePage;
