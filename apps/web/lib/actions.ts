"use server";

export const uploadManualFeedbacks = async (feedbacks: string[]) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate error if any feedback includes "fail"
  if (feedbacks.some((f) => f.toLowerCase().includes("fail"))) {
    throw new Error("Simulated API error");
  }

  // Otherwise simulate success
  return { success: true, message: "Feedbacks uploaded successfully" };
};
