export const normalizeFeedbackEntriesFromInput = (feedback: string) => {
  return feedback
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((item) => ({
      id: crypto.randomUUID(),
      feedback: item,
    }));
}