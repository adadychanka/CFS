import React, { Suspense } from "react";
import type { Metadata } from "next";
import { METADATA } from "@/constants/metadata";
import FileUploadForm from "@/features/feedback-file-upload/file-upload-form";
import SavedFiles from "@/features/saved-files/saved-files";
import SpinnerLoader from "@/components/loaders/spinner-loader";

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
      {/*Bot FileUploadForm and SavedFiles includes useSearchParams*/}
      <Suspense fallback={<SpinnerLoader />}>
        <FileUploadForm />
        <SavedFiles />
      </Suspense>
    </div>
  );
}

export default Page;
