import { OctagonAlert } from "lucide-react";
import ErrorContainer from "@/features/error-messages/error-container";

type Props = {
  iconSize?: "sm" | "lg";
  description?: string;
  onRetry?: () => void;
};

export const ErrorUnexpected = ({ description, onRetry, iconSize }: Props) => (
  <ErrorContainer
    Icon={OctagonAlert}
    title="Something went wrong"
    description={
      description || "An unexpected error occurred. Please try again later."
    }
    onRetry={onRetry}
    retryLabel="Retry"
    iconSize={iconSize}
  />
);

export default ErrorUnexpected;
