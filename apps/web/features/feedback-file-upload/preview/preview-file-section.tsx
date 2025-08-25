import { MAX_FILES_PER_UPLOAD } from "@/constants/constants";
import PreviewFilesTable from "./preview-files";

type Props = {
  files: File[];
  onDeleteSingleFile: (fileName: string) => void;
};

const PreviewFileSection = ({ files, onDeleteSingleFile }: Props) => {
  return (
    <div>
      <p className="font-medium">{files.length} files in total</p>
      <p className="pb-4 text-neutral-800 text-sm">
        We’ll upload the first {MAX_FILES_PER_UPLOAD} files now. The rest will
        be saved for later. Files marked as <em>ready</em> will be included in
        this upload.
      </p>
      <PreviewFilesTable
        onDeleteSingleFile={onDeleteSingleFile}
        files={files}
      />
    </div>
  );
};

export default PreviewFileSection;
