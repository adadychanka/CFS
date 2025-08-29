"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Button } from "@repo/ui/components/button";
import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FEEDBACK_FILTERS } from "@/constants/constants";
import {
  parseSentimentsQueryParam,
  updateSearchParamsWithSentiments,
} from "@/utils/url-helpers";
import { SENTIMENT_QUERY_PARAM_VALUE } from "@/constants";

export function FeedbackTableFilterDropdown() {
  if (
    !SENTIMENT_QUERY_PARAM_VALUE ||
    SENTIMENT_QUERY_PARAM_VALUE.length === 0
  ) {
    return "Sentiment"; // Will just return text for table header
  }

  return <FunctionalComponent />;
}

function FunctionalComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedFilters, setSelectedFilters] = useState<string[]>(
    parseSentimentsQueryParam(searchParams),
  );

  useEffect(
    function syncFiltersWithQueryParam() {
      const filtersFromQuery =
        searchParams.get(SENTIMENT_QUERY_PARAM_VALUE)?.split(",") || [];
      const validFilters = filtersFromQuery.filter((f) =>
        FEEDBACK_FILTERS.includes(f),
      );

      setSelectedFilters(validFilters);
    },
    [searchParams],
  );

  const handleToggleFilter = (filter: string, checked: boolean) => {
    let newFilters = [];
    if (checked) {
      newFilters = [...selectedFilters, filter];
    } else {
      newFilters = selectedFilters.filter((f) => f !== filter);
    }

    setSelectedFilters(newFilters);

    const params = updateSearchParamsWithSentiments(searchParams, newFilters);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Filter feedback by sentiment"
        >
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
