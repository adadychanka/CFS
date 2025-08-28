import { OctagonAlert } from "lucide-react";
import ErrorContainer from "@/features/error-messages/error-container";

type Props = {
  description?: string;
  onRetry?: () => void;
};

export const ErrorUnexpected = ({ description, onRetry }: Props) => (
  <ErrorContainer
    Icon={OctagonAlert}
    title="Something went wrong"
    description={
      description || "An unexpected error occurred. Please try again later."
    }
    onRetry={onRetry}
    retryLabel="Try again"
  />
);

export default ErrorUnexpected;
