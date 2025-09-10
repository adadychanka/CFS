import ManualFeedbackTab from "@/components/feedback-form/manual-feedback-tab";
import { type Metadata } from "next";
import { METADATA } from "@/constants/metadata";
import { WorkspaceIdParams } from "@/types/page-params";

export const metadata: Metadata = {
  title: "Manual Feedback Upload",
  description:
    "Manually add feedback entries, preview them, and submit for sentiment analysis.",
  keywords: [
    "manual feedback",
    "feedback upload",
    "sentiment analysis",
    "preview feedback",
  ],
  openGraph: {
    title: "Manual Feedback Upload",
    description:
      "Quickly add and preview feedback before submitting for analysis.",
    url: METADATA.URL,
    siteName: METADATA.siteName,
    type: "website",
  },
};

const Page = async ({ params }: WorkspaceIdParams) => {
  const { workspaceId } = await params;

  return <ManualFeedbackTab workspaceId={workspaceId} />;
};

export default Page;
