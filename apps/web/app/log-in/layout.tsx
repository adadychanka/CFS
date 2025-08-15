import { type Metadata } from "next";
import React from "react";
import { METADATA } from "@/constants/metadata";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Log In | FeedbackSentiment",
  description:
    "Access your FeedbackSentiment account to analyze customer feedback sentiment and gain actionable insights.",
  keywords: [
    "log in",
    "login",
    "feedback sentiment",
    "customer feedback analysis",
    "sentiment analysis",
    "feedback insights",
  ],
  openGraph: {
    title: "Log In | FeedbackSentiment",
    description:
      "Sign in to FeedbackSentiment to continue getting sentiment insights from customer feedback and make data-driven decisions.",
    url: METADATA.URL,
    siteName: METADATA.siteName,
    type: "website",
  },
};

function Layout({ children }: Props) {
  return <>{children}</>;
}

export default Layout;
