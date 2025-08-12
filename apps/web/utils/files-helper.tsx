const MAX_FILE_NAME_LENGTH = 40;
const MAX_FILE_NUMBERS = 10;

const checkFileTypes = (files: File[]) => {
  let areFilesValid = true;
  files.forEach((file) => {
    if (file.type !== "text/csv") {
      areFilesValid = false;
    }
  });

  return areFilesValid;
};

const checkFileNumbers = (files: File[]) => {
  return files.length < MAX_FILE_NUMBERS;
};

const getPossibleErrors = (isValidType: boolean, isValidNumber: boolean) => {
  let error: null | string = null;
  if (!isValidType && !isValidNumber) {
    error =
      "Please upload less than " +
      MAX_FILE_NUMBERS +
      " and they should be CSV files.";
  } else if (!isValidType) {
    error = "Please upload valid CSV file.";
  } else if (!isValidNumber) {
    error = "Number of files should be less than " + MAX_FILE_NUMBERS;
  }

  return error;
};

export const validateFiles = (files: File[]) => {
  const isValidType = checkFileTypes(files);
  const isValidNumber = checkFileNumbers(files);

  return getPossibleErrors(isValidType, isValidNumber);
};

export const truncateFileNames = (file: File) => {
  const fileName = file.name;
  let truncateFileName = "";
  const isNameLong = fileName.length > MAX_FILE_NAME_LENGTH;

  if (isNameLong) {
    truncateFileName = fileName.slice(0, MAX_FILE_NAME_LENGTH) + "...";
  }

  return isNameLong ? truncateFileName : fileName;
};
