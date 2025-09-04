import { type Metadata } from "next";
import React from "react";
import { METADATA } from "@/constants/metadata";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Admin Login | FeedbackSentiment",
  description:
    "Secure admin login to the FeedbackSentiment platform. Access administrative tools to manage users, monitor feedback sentiment, and oversee system settings.",
  keywords: [
    "admin login",
    "administrator access",
    "feedback sentiment admin",
    "manage feedback",
    "sentiment analysis control panel",
    "admin dashboard",
    "FeedbackSentiment administration",
  ],
  openGraph: {
    title: "Admin Login | FeedbackSentiment",
    description:
      "Sign in to the FeedbackSentiment Admin Panel to manage users, control system settings, and oversee customer feedback sentiment analysis.",
    url: METADATA.URL,
    siteName: METADATA.siteName,
    type: "website",
  },
};

function Layout({ children }: Props) {
  return <>{children}</>;
}

export default Layout;
