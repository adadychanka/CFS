import PreviewFileListItem from "./preview-file-list-item";

type Props = {
  files: File[];
  onDeleteSingleFile: (fileName: string) => void;
};

const PreviewFileList = ({ files, onDeleteSingleFile }: Props) => {
  return files.map((file, index) => (
    <PreviewFileListItem
      key={file.name}
      index={index}
      file={file}
      onDeleteSingleFile={onDeleteSingleFile}
    />
  ));
};

export default PreviewFileList;
