import type { Metadata } from "next";
import Header from "@repo/ui/components/header";
import WelcomeWorkspacesList from "@/features/welcome-page/welcome-workspaces-list";
import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Access your workspaces, try sample mode, or create a new workspace directly from your dashboard.",
  keywords: [
    "dashboard",
    "workspaces",
    "sample mode",
    "create workspace",
    "project management",
  ],
  openGraph: {
    title: "Dashboard",
    description:
      "Manage your workspaces, experiment with sample mode, and easily create new ones from your dashboard.",
    url: METADATA.URL,
    siteName: METADATA.siteName,
    type: "website",
  },
};

const Page = () => {
  return (
    <>
      <Header title="Dashboard" />
      <div className="w-full max-w-[1280px] mx-auto p-4 flex flex-col gap-8">
        <WelcomeWorkspacesList />
      </div>
    </>
  );
};

export default Page;
