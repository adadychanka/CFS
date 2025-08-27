import { Timer } from "lucide-react";

type Props = {
  description?: string;
};

const ErrorTooManyRequests = ({ description }: Props) => {
  return (
    <div className="py-16 flex flex-col items-center justify-center gap-4 text-center">
      <Timer className="h-16 w-16 text-neutral-300" />
      <p className="text-lg font-medium">Too Many Requests</p>
      <p className="text-sm text-neutral-600">
        {description ||
          "You’ve sent too many requests. Please wait a moment before trying again."}
      </p>
    </div>
  );
};

export default ErrorTooManyRequests;
