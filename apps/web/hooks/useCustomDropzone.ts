import { useCallback, useState } from "react";
import { validateFiles } from "@/utils/files-helper";

export const useCustomDropzone = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const possibleError = validateFiles(acceptedFiles);

    if (acceptedFiles?.length > 0 && !possibleError) {
      setError(null);
      setFiles((prevFiles) => {
        return [...prevFiles, ...acceptedFiles];
      });
    } else {
      setError(possibleError);
    }
  }, []);

  const handleClear = useCallback(() => {
    setFiles([]);
  }, []);

  const handleDeleteSingleFile = useCallback((fileName: string) => {
    setFiles((prevFiles) => {
      return prevFiles.filter((file) => file.name !== fileName);
    });
  }, []);

  return {
    files,
    error,
    onDrop,
    handleClear,
    handleDeleteSingleFile,
  };
};
