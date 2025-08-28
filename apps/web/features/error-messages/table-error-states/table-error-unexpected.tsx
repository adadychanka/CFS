import TableErrorContainer from "@/features/error-messages/table-error-states/table-error-container";
import ErrorUnexpected from "@/features/error-messages/error-unexpected";

type Props = {
  description: string;
  colSpan: number;
  onRetry?: () => void;
};

const TableErrorUnexpected = ({ description, colSpan, onRetry }: Props) => (
  <TableErrorContainer colSpan={colSpan}>
    <ErrorUnexpected description={description} onRetry={onRetry} />
  </TableErrorContainer>
);

export default TableErrorUnexpected;
