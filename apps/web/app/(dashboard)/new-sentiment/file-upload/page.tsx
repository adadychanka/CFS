import FileUpload from "@/components/feedback-file-upload/file-upload";
import React from "react";
import type { Metadata } from "next";
import { METADATA } from "@/constants/metadata";

export const metadata: Metadata = {
  title: "CSV File Upload",
  description:
    "Upload one or multiple CSV files for sentiment analysis with real-time file previews and easy file management.",
  keywords: [
    "CSV upload",
    "file upload",
    "sentiment analysis",
    "dropzone",
    "file preview",
    "bulk feedback upload",
  ],
  openGraph: {
    title: "CSV File Upload",
    description:
      "Easily upload and preview multiple CSV files before processing for sentiment analysis.",
    url: METADATA.URL,
    siteName: METADATA.siteName,
    type: "website",
  },
};

function Page() {
  return (
    <div>
      <FileUpload />
    </div>
  );
}

export default Page;
