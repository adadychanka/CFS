/**
 * Converts base 64 string into Blob (binary large object)
 *
 * @param base64String
 * @param contentType
 */
export const base64ToBlobConverter = (
  base64String: string,
  contentType: string,
) => {
  const byteCharacters = atob(base64String); // Decode Base64 string
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  return new Blob([byteArray], { type: contentType });
};
