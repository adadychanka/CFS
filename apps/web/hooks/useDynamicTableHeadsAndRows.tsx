import { ReactNode, JSX } from "react";

type UseDynamicTableProps<T> = {
  data?: T[];
  limit?: number;
  heads: ReactNode[];
  renderRow: (item: T, index: number) => JSX.Element;
};

export type UseDynamicTableData = {
  tableHeads: JSX.Element;
  tableRows: JSX.Element[] | null;
};

export function useDynamicTableHeadsAndRows<T>({
  data,
  limit = data?.length,
  heads,
  renderRow,
}: UseDynamicTableProps<T>): UseDynamicTableData {
  const tableHeads = <>{heads}</>;

  const tableRows =
    data?.slice(0, limit).map((item, index) => renderRow(item, index)) || null;

  return { tableHeads, tableRows };
}
