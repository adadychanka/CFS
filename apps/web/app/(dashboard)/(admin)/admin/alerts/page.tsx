import { type Metadata } from "next";
import { METADATA } from "@/constants/metadata";
import Header from "@repo/ui/components/header";
import AlertsSection from "@/features/alerts-list/alerts-section";

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
  //TODO Add SideBar Provider Before using Header and Sidebar
  return (
    <>
      <Header title="Alerts" />
      <AlertsSection />
    </>
  );
};

export default Page;
