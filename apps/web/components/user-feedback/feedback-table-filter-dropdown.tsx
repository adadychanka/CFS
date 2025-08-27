"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Button } from "@repo/ui/components/button";
import { useState } from "react";
import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FEEDBACK_FILTERS } from "@/constants/constants";

export function FeedbackTableFilterDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filtersOnURLQuery = searchParams.get("sentiment")?.split(",") || [];
  const [selectedFilters, setSelectedFilters] = useState<string[]>(
    filtersOnURLQuery.filter((f) => FEEDBACK_FILTERS.includes(f)),
  );

  const handleToggleFilter = (filter: string, checked: boolean) => {
    let newFilters = [];
    if (checked) {
      newFilters = [...selectedFilters, filter];
    } else {
      newFilters = selectedFilters.filter((f) => f !== filter);
    }

    setSelectedFilters(newFilters);

    const params = new URLSearchParams(searchParams);
    if (newFilters.length > 0) {
      params.set("sentiment", newFilters.join(","));
    } else {
      params.delete("sentiment");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Filter />
          Sentiment
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem
          checked={selectedFilters.includes("positive")}
          onCheckedChange={(checked) => handleToggleFilter("positive", checked)}
        >
          Positive
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedFilters.includes("neutral")}
          onCheckedChange={(checked) => handleToggleFilter("neutral", checked)}
        >
          Neutral
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedFilters.includes("negative")}
          onCheckedChange={(checked) => handleToggleFilter("negative", checked)}
        >
          Negative
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedFilters.includes("unknown")}
          onCheckedChange={(checked) => handleToggleFilter("unknown", checked)}
        >
          Unknown
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
