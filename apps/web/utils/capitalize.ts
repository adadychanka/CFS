export function capitalizeSentence(input: string) {
  if (!input) return "";
  const [first, ...rest] = [...input];
  return first?.toUpperCase() + rest.join("").toLocaleLowerCase() || "";
}
