import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { validateUploadedFiles } from "@/utils/files-helper";

export const useCustomDropzone = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const { isValid, error } = validateUploadedFiles(files, acceptedFiles);

      if (acceptedFiles.length === 0) {
        setError(null);
        return;
      }

      if (!isValid) {
        setError(error);
        return;
      }

      setError(null);
      setFiles((prevFiles) => {
        return [...acceptedFiles, ...prevFiles];
      });
    },
    [files],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleClear = useCallback(() => {
    setFiles([]);
  }, []);

  const handleClearErrors = useCallback(() => {
    setError(null);
  }, []);

  const handleDeleteSingleFile = useCallback((fileName: string) => {
    setFiles((prevFiles) => {
      return prevFiles.filter((file) => file.name !== fileName);
    });
  }, []);

  return {
    files,
    error,
    isDragActive,
    getInputProps,
    getRootProps,
    handleClear,
    handleClearErrors,
    handleDeleteSingleFile,
  };
};
