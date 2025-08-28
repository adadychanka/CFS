import { type LucideIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";

type Props = {
  Icon: LucideIcon;
  title: string;
  description: string;
  onRetry?: () => void;
  retryLabel?: string;
};

const ErrorContainer = ({
  Icon,
  title,
  description,
  onRetry,
  retryLabel,
}: Props) => {
  return (
    <div className="py-16 flex flex-col items-center justify-center gap-4 text-center">
      <Icon className="h-16 w-16 text-neutral-300" />
      <p className="text-lg font-medium">{title}</p>
      <p className="text-sm text-neutral-600">{description}</p>

      {onRetry && (
        <Button
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
