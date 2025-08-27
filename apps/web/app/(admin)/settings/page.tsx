import { type Metadata } from "next";
// import Header from "@repo/ui/components/header";
import { METADATA } from "@/constants/metadata";

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

const Page = () => {
  return (
    <>
      {/* <Header title="Settings" /> */}
      <section></section>
    </>
  );
};

export default Page;
