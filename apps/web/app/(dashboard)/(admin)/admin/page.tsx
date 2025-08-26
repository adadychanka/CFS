import { type Metadata } from "next";
import { METADATA } from "@/constants/metadata";
import ChartsSection from "@/components/admin/charts-section";
import UsersSection from "@/components/users-management/users-section";
import Header from "@repo/ui/components/header";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Monitor API usage, track errors, and analyze daily uploads with interactive charts. Manage users with suspension and access control tools.",
  keywords: [
    "admin dashboard",
    "API usage",
    "error monitoring",
    "uploads tracking",
    "user management",
    "suspend users",
    "limit users",
    "admin tools",
    "analytics dashboard",
  ],
  openGraph: {
    title: "Admin Dashboard",
    description:
      "Powerful admin dashboard to monitor API usage, errors, and uploads with daily charts, plus manage users through suspension and access controls.",
    url: METADATA.URL,
    siteName: METADATA.siteName,
    type: "website",
  },
};

const Page = () => {
  return (
    //TODO Add SideBar Provider Before using Header and Sidebar
    <div>
      <Header title="Admin Dashboard" />

      <div className="w-full max-w-[1280px] mx-auto p-4 @container">
        <ChartsSection />
        <UsersSection />
      </div>
    </div>
  );
};

export default Page;
