import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { FetchError } from "@/lib/errors";
import { UseDynamicTableData } from "@/hooks/useDynamicTableHeadsAndRows";
import type { SavedFile } from "@/types/saved-files";
import useFilesTableBody from "@/hooks/useFilesTableBody";
import { AnimatePresence } from "framer-motion";

export type SavedFilesTable = {
  files: SavedFile[];
  isLoading: boolean;
  filesLimit: number;
  isFilteringEnabled?: boolean;
  error?: FetchError;
  onRetry?: () => void;
  tableHeads: UseDynamicTableData["tableHeads"];
  tableRows: UseDynamicTableData["tableRows"];
  handleCancelDelete?: () => void;
};

function SavedFilesTable({
  files,
  isLoading,
  filesLimit,
  error,
  tableHeads,
  tableRows,
  onRetry,
  handleCancelDelete,
}: SavedFilesTable) {
  const content = useFilesTableBody({
    filesLimit,
    files,
    isLoading,
    tableRows,
    tableHeads,
    error,
    onRetry,
  });

  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>{tableHeads}</TableRow>
      </TableHeader>
      <TableBody>
        <AnimatePresence
          key="saved-files"
          initial={false}
          onExitComplete={handleCancelDelete}
        >
          {content}
        </AnimatePresence>
      </TableBody>
    </Table>
  );
}

export default SavedFilesTable;
