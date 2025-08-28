import TableErrorContainer from "@/features/error-messages/table-error-states/table-error-container";
import { ErrorEmptyList } from "@/features/error-messages/error-empty-list";

type Props = { title: string; description: string; colSpan: number };

export const TableErrorEmptyList = ({ title, description, colSpan }: Props) => {
  return (
    <TableErrorContainer colSpan={colSpan}>
      <ErrorEmptyList title={title} description={description} />
    </TableErrorContainer>
  );
};

export default TableErrorEmptyList;
