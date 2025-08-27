import { type Metadata } from "next";
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
  //TODO Add SideBar Provider Before using Header and Sidebar
  return (
    <>
      {/* <Header title="Alerts" /> */}
      <h2 className="text-lg">Alerts Page</h2>
    </>
  );
};

export default Page;
