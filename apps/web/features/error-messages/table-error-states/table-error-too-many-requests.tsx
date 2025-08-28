import React from "react";
import TableErrorContainer from "@/features/error-messages/table-error-states/table-error-container";
import ErrorTooManyRequests from "@/features/error-messages/error-too-many-requests";

type Props = {
  description?: string;
  colSpan: number;
};

const TableErrorTooManyRequests = ({ description, colSpan }: Props) => (
  <TableErrorContainer colSpan={colSpan}>
    <ErrorTooManyRequests description={description} />
  </TableErrorContainer>
);

export default TableErrorTooManyRequests;
