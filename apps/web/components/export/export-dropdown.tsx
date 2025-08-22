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

const handleDownload = async (
  type: "summarized" | "detailed",
  format: "csv" | "pdf",
) => {
  try {
    const res = await fetch(
      `/api/feedback/report?type=${type}&format=${format}`,
    );

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        clientAuthGuard(res.status);
        return;
      }

      toast.error("Download failed");
      return;
    }

    const contentDisposition = res.headers.get("content-disposition");
    const contentType = res.headers.get("content-type");

    if (!contentDisposition || !contentType) {
      return;
    }

    const blob = await res.blob();
    const fileURL = URL.createObjectURL(blob);

    const filename = `feedback-${type}.${format}`;

    // Simulated download
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(fileURL);
  } catch (err) {
    console.error("Unexpected error while downloading:", err);
    toast.error("Download failed");
  }
};

const ExportDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
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
            onClick={() => handleDownload("summarized", "csv")}
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
            onClick={() => handleDownload("summarized", "pdf")}
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
