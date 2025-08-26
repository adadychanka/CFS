"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Button } from "@repo/ui/components/button";
import { useEffect } from "react";
import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FEEDBACK_FILTERS } from "@/constants/constants";

export function FeedbackTableFilterDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterOnURLQuery = searchParams.get("sentiment") || "no-filter";
  const selectedFilter = FEEDBACK_FILTERS.includes(filterOnURLQuery)
    ? filterOnURLQuery
    : "no-filter";

  useEffect(() => {
    if (!FEEDBACK_FILTERS.includes(filterOnURLQuery)) {
      const params = new URLSearchParams(searchParams);
      params.set("sentiment", "no-filter");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [filterOnURLQuery, searchParams, router]);

  const handleChange = (newValue: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sentiment", newValue);
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
        <DropdownMenuRadioGroup
          value={selectedFilter}
          onValueChange={handleChange}
        >
          <DropdownMenuRadioItem value="no-filter">
            no filter
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="positive">
            positive
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="neutral">neutral</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="negative">
            negative
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="unknown">unknown</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // NOTE: In case of multi filters are allowed
  // const [showStatusBar, setShowStatusBar] = useState(true);
  // const [showActivityBar, setShowActivityBar] = useState(false);
  // const [showPanel, setShowPanel] = useState(false);
  // const [filterNegative, setFilterNegative] = useState(false);
  //
  // return (
  //   <DropdownMenu>
  //     <DropdownMenuTrigger asChild>
  //       <Button variant="ghost" size="sm">
  //         <Filter />
  //         Sentiment
  //       </Button>
  //     </DropdownMenuTrigger>
  //     <DropdownMenuContent>
  //       <DropdownMenuCheckboxItem
  //         checked={showStatusBar}
  //         onCheckedChange={setShowStatusBar}
  //       >
  //         Positive
  //       </DropdownMenuCheckboxItem>
  //       <DropdownMenuCheckboxItem
  //         checked={showActivityBar}
  //         onCheckedChange={setShowActivityBar}
  //       >
  //         Neutral
  //       </DropdownMenuCheckboxItem>
  //       <DropdownMenuCheckboxItem
  //         checked={showPanel}
  //         onCheckedChange={setShowPanel}
  //       >
  //         Negative
  //       </DropdownMenuCheckboxItem>
  //       <DropdownMenuCheckboxItem
  //         checked={filterNegative}
  //         onCheckedChange={setFilterNegative}
  //       >
  //         Unknow
  //       </DropdownMenuCheckboxItem>
  //     </DropdownMenuContent>
  //   </DropdownMenu>
  // );
}
