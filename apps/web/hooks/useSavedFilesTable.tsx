import React, { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import type { SavedFile, SavedFilesResponse } from "@/types/saved-files";
import { TableCell, TableHead, TableRow } from "@repo/ui/components/table";
import { useDynamicTableHeadsAndRows } from "./useDynamicTableHeadsAndRows";
import { formatCreatedAtDate } from "@/utils/date-utils";
import { Button } from "@repo/ui/components/button";
import { FileSpreadsheet, Trash2 } from "lucide-react";
import { clientApi } from "@/lib/api";

type Props = {
  data?: SavedFile[];
  reFetch: () => void;
};

function useSavedFilesTable({ data, reFetch }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const heads = useMemo(() => {
    return [
      <TableHead key={"file-name"} className="min-w-[200px]" title="File name">
        File Name
      </TableHead>,
      <TableHead
        key={"counts"}
        className="w-[100px] text-center"
        title="Number of feedback the file contains"
      >
        Number of Feedback
      </TableHead>,
      <TableHead key={"created-at"} className="w-[100px] text-center">
        Created at
      </TableHead>,
      <TableHead key={"actions"} className="w-[100px] text-center">
        Actions
      </TableHead>,
    ];
  }, []);

  function handleClickDeleteButton(id: string) {
    setIsDialogOpen(true);
    setSelectedId(id);
  }

  async function handleConfirmDelete() {
    try {
      const response = await clientApi.delete(`/api/files/${selectedId}`);

      const result: SavedFilesResponse = await response.json();
      if (result.success) {
        reFetch();
        toast.success("File has been deleted!");
      } else toast.error("An error occurred!");
    } catch (error) {
      console.error(error);

      toast.error("An error occurred");
    }
    setIsDialogOpen(false);
  }

  function handleCancelDelete() {
    setIsDialogOpen(false);
    setSelectedId(null);
  }

  const MotionRow = motion.create(TableRow);

  const renderRow = useCallback(
    (file: SavedFile) => (
      <MotionRow
        key={file.id}
        animate={{ opacity: 1, y: 0 }}
        exit={file.id === selectedId ? { opacity: 0, x: -50 } : {}}
        transition={{ duration: 0.3 }}
        className="odd:bg-muted/50"
      >
        <TableCell
          className=" max-w-[400px] flex items-center gap-2"
          title={file.name}
        >
          <span>
            <FileSpreadsheet width={24} height={24} />
          </span>{" "}
          <span className="truncate">{file.name}</span>
        </TableCell>
        <TableCell className="text-center">{file.rowCount}</TableCell>
        <TableCell className="text-center">
          {formatCreatedAtDate(file.createdAt)}
        </TableCell>
        <TableCell className="text-center">
          <Button
            aria-label="Delete singe file"
            variant={"ghost"}
            onClick={() => handleClickDeleteButton(file.id)}
          >
            <Trash2 />
          </Button>
        </TableCell>
      </MotionRow>
    ),
    [MotionRow, selectedId],
  );

  const { tableHeads, tableRows } = useDynamicTableHeadsAndRows({
    data,
    heads,
    renderRow,
  });

  return {
    tableHeads,
    tableRows,
    isDialogOpen,
    handleCancelDelete,
    handleConfirmDelete,
  };
}

export default useSavedFilesTable;
