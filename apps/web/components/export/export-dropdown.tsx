"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Button } from "@repo/ui/components/button";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import { toast } from "sonner";
import { downloadReport } from "@/lib/actions/feedback";
import { formatCreatedAtDate } from "@/utils/date-utils";
import { base64ToBlobConverter } from "@/utils/base64-to-blob-converter";
import { browserFileDownloader } from "@/utils/browser-file-downloader";
import { useSampleMode } from "@/context/use-sample-mode";

const handleDownload = async (
  type: "summary" | "detailed",
  format: "csv" | "pdf",
) => {
  try {
    const res = await downloadReport(type, format);

    if (!res.success) {
      if (res.status === 401 || res.status === 403) {
        clientAuthGuard(res.status);
        return;
      }

      toast.error("Download failed");
      return;
    }

    if (res.data) {
      // Prepare file
      const filename = `feedback-${type}-${formatCreatedAtDate(new Date())}.${format}`;
      const contentType = format === "csv" ? "text/csv" : "application/pdf";

      // Download file
      const blob = base64ToBlobConverter(res.data, contentType);
      browserFileDownloader(blob, filename);
    }
  } catch (err) {
    console.error("Unexpected error while downloading:", err);
    toast.error("Download failed");
  }
};

const ExportDropdown = () => {
  const { isSampleMode } = useSampleMode();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isSampleMode}>
        <Button variant="outline" size="sm" aria-label="Export options">
          <Download />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            aria-label="Download detailed CSV file"
            onClick={() => handleDownload("detailed", "csv")}
          >
            <FileSpreadsheet className="text-neutral-800" />
            Detailed (CSV)
          </DropdownMenuItem>
          <DropdownMenuItem
            aria-label="Download summarized CSV file"
            onClick={() => handleDownload("summary", "csv")}
          >
            <FileSpreadsheet className="text-neutral-800" />
            Summarized (CSV)
          </DropdownMenuItem>
          <DropdownMenuItem
            aria-label="Download detailed PDF file"
            onClick={() => handleDownload("detailed", "pdf")}
          >
            <FileText className="text-neutral-800" />
            Detailed (PDF)
          </DropdownMenuItem>
          <DropdownMenuItem
            aria-label="Download summarized PDF file"
            onClick={() => handleDownload("summary", "pdf")}
          >
            <FileText className="text-neutral-800" />
            Summarized (PDF)
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportDropdown;
