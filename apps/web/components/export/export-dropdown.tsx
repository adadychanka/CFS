import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Button } from "@repo/ui/components/button";
import { Download, FileSpreadsheet, FileText } from "lucide-react";

const ExportDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Export options">
          <Download />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem aria-label="Download detailed CSV file">
            <FileSpreadsheet className="text-neutral-800" />
            Detailed (CSV)
          </DropdownMenuItem>
          <DropdownMenuItem aria-label="Download summarized CSV file">
            <FileSpreadsheet className="text-neutral-800" />
            Summarized (CSV)
          </DropdownMenuItem>
          <DropdownMenuItem aria-label="Download detailed PDF file">
            <FileText className="text-neutral-800" />
            Detailed (PDF)
          </DropdownMenuItem>
          <DropdownMenuItem aria-label="Download summarized PDF file">
            <FileText className="text-neutral-800" />
            Summarized (PDF)
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportDropdown;
