import { type LucideIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";

type Props = {
  Icon: LucideIcon;
  title: string;
  description: string;
  iconSize?: "sm" | "lg";
  onRetry?: () => void;
  retryLabel?: string;
};

const ErrorContainer = ({
  Icon,
  title,
  description,
  iconSize = "lg",
  onRetry,
  retryLabel,
}: Props) => {
  return (
    <div className="py-16 flex flex-col items-center justify-center gap-4 text-center">
      <Icon
        className={cn(
          "text-neutral-300",
          iconSize === "sm" ? "h-8 w-8" : "h-16 w-16",
        )}
      />
      <p className="text-lg font-medium">{title}</p>
      <p className="text-sm text-neutral-600">{description}</p>

      {onRetry && (
        <Button
          size="sm"
          variant="outline"
          onClick={onRetry}
          className="flex items-center gap-2"
          aria-label={retryLabel}
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );
};

export default ErrorContainer;
