import { RateLimitResponseData } from "@/types/rate-limit";

export function getRateLimits(data: RateLimitResponseData[]) {
  const apiRate = data.find((rate) => rate.target === "API")?.limit || 1000;
  const uploadRate =
    data.find((rate) => rate.target === "UPLOAD")?.limit || 1000;
  const loginRate = data.find((rate) => rate.target === "LOGIN")?.limit || 1000;
  const downloadRate =
    data.find((rate) => rate.target === "DOWNLOAD")?.limit || 1000;
  return {
    apiRate,
    uploadRate,
    loginRate,
    downloadRate,
  };
}
