/**
 * Simulates file download using browser APIs.
 *
 * @param blob
 * @param filename
 */
export const browserFileDownloader = (blob: Blob, filename: string) => {
  const fileURL = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = fileURL;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(fileURL);
};
