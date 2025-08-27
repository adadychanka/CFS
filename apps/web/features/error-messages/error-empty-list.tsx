import { Box } from "lucide-react";

type Props = {
  title: string;
  description: string;
};

const ErrorEmptyList = ({ title, description }: Props) => {
  return (
    <div className="py-16 flex flex-col items-center justify-center gap-4 text-center text-neutral-800">
      <Box className="h-16 w-16 text-neutral-300" />
      <p className="text-lg font-medium">{title}</p>
      <p className="text-sm text-neutral-600">{description}</p>
    </div>
  );
};

export default ErrorEmptyList;
