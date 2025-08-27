import { OctagonAlert } from "lucide-react";

type Props = {
  description?: string;
};

const ErrorUnexpected = ({ description }: Props) => {
  return (
    <div className="py-16 flex flex-col items-center justify-center gap-4 text-center text-neutral-800">
      <OctagonAlert className="h-16 w-16 text-neutral-300" />
      <p className="text-lg font-medium">Something went wrong</p>
      <p className="text-sm text-neutral-600">
        {description || "An unexpected error occurred. Please try again later."}
      </p>
    </div>
  );
};

// Retry if we ever need it
// {onRetry && (
//   <Button
//     variant="outline"
//     onClick={onRetry}
//     className="flex items-center gap-2"
//     aria-label="Retry loading sentiment analysis"
//   >
//     <RefreshCcw className="h-4 w-4" />
//     Try again
//   </Button>
// )}

export default ErrorUnexpected;
