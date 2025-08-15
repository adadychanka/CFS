import { type Metadata } from "next";
import Header from "@repo/ui/components/header";
import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: "Alerts",
  description: "View and manage suspicious activity alerts in real-time.",
  keywords: [
    "alerts",
    "suspicious activity",
    "security notifications",
    "threat monitoring",
    "incident management",
  ],
  openGraph: {
    title: "Alerts",
    description:
      "Monitor, review, and manage suspicious activity alerts with real-time updates.",
    url: METADATA.URL,
    siteName: METADATA.siteName,
    type: "website",
  },
};

const Page = () => {
  return (
    <>
      <Header title="Alerts" />
    </>
  );
};

export default Page;
