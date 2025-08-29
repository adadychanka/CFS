import { type Metadata } from "next";
import React from "react";
import { METADATA } from "@/constants/metadata";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Admin Sign Up | FeedbackSentiment",
  description:
    "Create your administrator account to manage FeedbackSentiment, oversee user activity, and control sentiment analysis settings.",
  keywords: [
    "admin sign up",
    "administrator registration",
    "feedback sentiment admin",
    "admin account creation",
    "sentiment analysis control panel",
    "admin dashboard setup",
    "FeedbackSentiment administration",
  ],
  openGraph: {
    title: "Admin Sign Up | FeedbackSentiment",
    description:
      "Register for the FeedbackSentiment Admin Panel to manage users, control system settings, and oversee customer feedback sentiment analysis.",
    url: METADATA.URL,
    siteName: METADATA.siteName,
    type: "website",
  },
};

function Layout({ children }: Props) {
  return <>{children}</>;
}

export default Layout;
