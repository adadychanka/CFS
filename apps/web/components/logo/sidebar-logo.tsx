import Link from "next/link";
import { Brain } from "lucide-react";

const SidebarLogo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 p-2"
      aria-label="Go to homepage"
    >
      <div className="bg-neutral-800 text-neutral-200 dark:bg-neutral-200 dark:text-neutral-800 flex aspect-square size-8 items-center justify-center rounded-lg">
        <Brain className="size-4" />
      </div>
      <div className="text-left text-sm leading-tight">
        <span className=" font-medium">CFS AI</span>
      </div>
    </Link>
  );
};

export default SidebarLogo;
