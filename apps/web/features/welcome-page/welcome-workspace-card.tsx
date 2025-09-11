import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Props = {
  workspace: { id: string; name: string };
};

const WelcomeWorkspaceCard = ({ workspace }: Props) => {
  return (
    <Link
      href={`/workspace/${workspace.id}`}
      className="group py-6 px-4 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border hover:shadow-sm transition-shadow"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-base font-medium truncate">{workspace.name}</span>
        <ArrowUpRight
          className="size-4 shrink-0  text-muted-foreground transition-colors group-hover:text-foreground"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
};

export default WelcomeWorkspaceCard;
