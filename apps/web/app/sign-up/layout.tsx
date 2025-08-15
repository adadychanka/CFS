import { type Metadata } from "next";
import React from "react";
import { METADATA } from "@/constants/metadata";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Sign Up | FeedbackSentiment",
  description:
    "Create your account to start analyzing customer feedback sentiment and gain actionable insights.",
  keywords: [
    "sign up",
    "feedback sentiment",
    "customer feedback analysis",
    "sentiment analysis",
    "feedback insights",
  ],
  openGraph: {
    title: "Sign Up | FeedbackSentiment",
    description:
      "Join FeedbackSentiment to get sentiment insights from customer feedback and make data-driven decisions.",
    url: METADATA.URL,
    siteName: METADATA.siteName,
    type: "website",
  },
};

function Layout({ children }: Props) {
  return <>{children}</>;
}

export default Layout;
