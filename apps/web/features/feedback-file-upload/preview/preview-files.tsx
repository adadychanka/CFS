import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import PreviewFileList from "./preview-file-list";

type Props = {
  files: File[];
  onDeleteSingleFile: (fileName: string) => void;
};

const PreviewFilesTable = ({ files, onDeleteSingleFile }: Props) => {
  return (
    <div className="overflow-x-auto rounded-md border max-h-[800px]">
      <Table className="min-w-[600px] table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4 w-[60px]">#</TableHead>
            <TableHead className="w-auto">File name</TableHead>
            <TableHead className="w-[100px] text-center">Status</TableHead>
            <TableHead className="w-[120px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <PreviewFileList
            files={files}
            onDeleteSingleFile={onDeleteSingleFile}
          />
        </TableBody>
      </Table>
    </div>
  );
};

export default PreviewFilesTable;
