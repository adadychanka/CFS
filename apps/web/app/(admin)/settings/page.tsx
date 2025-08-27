import { type Metadata } from "next";
// import Header from "@repo/ui/components/header";
import { METADATA } from "@/constants/metadata";
import { RateLimitForm } from "@/features/admin/rate-limit/rate-limit-form";
import { getServerApi } from "@/lib/server-api";
import { auth } from "@/auth/auth";
import type {
  RateLimitResponse,
  RateLimitResponseData,
} from "@/types/rate-limit";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your preferences, account details, and usage limits.",
  keywords: [
    "settings",
    "preferences",
    "account settings",
    "usage limits",
    "profile management",
  ],
  openGraph: {
    title: "Settings",
    description:
      "Update your preferences, manage account details, and configure usage limits.",
    url: METADATA.URL,
    siteName: METADATA.siteName,
    type: "website",
  },
};

async function Page() {
  const api = await getServerApi();
  const session = await auth();
  let defaultLimit: RateLimitResponseData | null = null;

  if (session?.user.token) {
    api.setToken(session.user.token);
  } else {
    console.log("Token is not found");
  }

  const response = await api.get("/api/admin/rate-limit");
  const result: RateLimitResponse = await response.json();

  if (result?.data?.length) {
    const apiRate = result.data.find((rate) => rate.target === "API");
    defaultLimit = apiRate || null;
  }

  return (
    <>
      <section className="pl-4 pt-4">
        <RateLimitForm defaultValue={defaultLimit} />
      </section>
    </>
  );
}

export default Page;
