const MAX_FILE_NUMBERS = 10;

const MAX_FILE_COUNT_ERROR_MESSAGE =
  "Please upload less than " + MAX_FILE_NUMBERS + " files.";
const INVALID_FILE_TYPE_ERROR_MESSAGE = "Please upload CSV files.";
const DUPLICATE_FILES_ERROR_MESSAGE =
  "Please do not upload the same file twice";

function isValidCSVFile(file: File): boolean {
  return file.type === "text/csv" && file.name.endsWith(".csv");
}

function areAllValidCSVFile(files: File[]): boolean {
  return files.every(isValidCSVFile);
}

const hasAllowedFileCount = (files: File[]) => {
  return files.length <= MAX_FILE_NUMBERS;
};

function areThereDuplicateFiles(storedFiles: File[], newFiles: File[]) {
  const storedNames = new Set(storedFiles.map((file) => file.name));
  return newFiles.some((file) => storedNames.has(file.name));
}

export function validateUploadedFiles(
  storedFiles: File[],
  newFiles: File[],
): {
  isValid: boolean;
  error: string | null;
} {
  const isValidType = areAllValidCSVFile(newFiles);
  const isValidNumber = hasAllowedFileCount([...storedFiles, ...newFiles]);
  const isThereDuplicate = areThereDuplicateFiles(storedFiles, newFiles);

  if (!isValidType) {
    return { isValid: false, error: INVALID_FILE_TYPE_ERROR_MESSAGE };
  }
  if (!isValidNumber) {
    return { isValid: false, error: MAX_FILE_COUNT_ERROR_MESSAGE };
  }
  if (isThereDuplicate) {
    return { isValid: false, error: DUPLICATE_FILES_ERROR_MESSAGE };
  }

  return { isValid: true, error: null };
}
