import Link from "next/link";
import { Brain } from "lucide-react";

const SidebarLogo = () => {
  return (
    <Link href="/apps/web/public" className="flex items-center gap-2 p-2">
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <Brain className="size-4" />
      </div>
      <div className="text-left text-sm leading-tight">
        <span className=" font-medium">CFS AI</span>
      </div>
    </Link>
  );
};

export default SidebarLogo;
