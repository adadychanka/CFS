import ErrorContainer from "@/features/error-messages/error-container";
import { Box } from "lucide-react";

type Props = {
  title: string;
  description: string;
};

export const ErrorEmptyList = ({ title, description }: Props) => (
  <ErrorContainer Icon={Box} title={title} description={description} />
);
