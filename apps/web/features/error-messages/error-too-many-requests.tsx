import { Timer } from "lucide-react";
import ErrorContainer from "@/features/error-messages/error-container";

type Props = {
  description?: string;
};

export const ErrorTooManyRequests = ({ description }: Props) => (
  <ErrorContainer
    Icon={Timer}
    title="Too Many Requests"
    description={
      description ||
      "You’ve sent too many requests. Please wait a moment before trying again."
    }
  />
);

export default ErrorTooManyRequests;
