import React, { Suspense } from "react";
import type { Metadata } from "next";
import { METADATA } from "@/constants/metadata";
import FileUploadForm from "@/features/feedback-file-upload/file-upload-form";
import SavedFiles from "@/features/saved-files/saved-files";
import SpinnerLoader from "@repo/ui/custom-components/spinner-loader";
import type { WorkspaceIdParams } from "@/types/page-params";

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

async function Page({ params }: WorkspaceIdParams) {
  const { workspaceId } = await params;
  return (
    <div>
      {/*Bot FileUploadForm and SavedFiles includes useSearchParams*/}
      <Suspense fallback={<SpinnerLoader />}>
        <FileUploadForm workspaceId={workspaceId} />
        <SavedFiles workspaceId={workspaceId} />
      </Suspense>
    </div>
  );
}

export default Page;
