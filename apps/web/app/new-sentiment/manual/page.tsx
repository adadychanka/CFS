import ManualFeedbackTab from "@/components/feedback-form/manual-feedback-tab";
import { type Metadata } from "next";
import { METADATA } from "@/constants/metadata";

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

const Page = () => {
  return <ManualFeedbackTab />;
};

export default Page;
