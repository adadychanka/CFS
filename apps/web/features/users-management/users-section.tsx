"use client";

import UsersList from "@/features/users-management/users-list";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Search } from "lucide-react";
import PaginationSection from "@/components/user-feedback/pagination-section";
import { FormEvent, useCallback, useState } from "react";
import { FetchError } from "@/lib/errors";
import useSWR from "swr";
import type { GetUsersResponse } from "@/types/http";
import { FEEDBACK_PAGE_LIMIT } from "@/constants/constants";
import { clientAuthGuard } from "@/utils/client-auth-guard";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new FetchError(
      data.message || "Something went wrong",
      res.status,
      data,
    );
  }

  return data;
};

const UsersSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(searchQuery);

  const { data, error, isLoading, mutate } = useSWR<GetUsersResponse>(
    `/api/users?page=${currentPage}&limit=${FEEDBACK_PAGE_LIMIT}&search=${searchQuery}`,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  if (error instanceof FetchError) clientAuthGuard(error.status);

  const handleMutate = useCallback(async () => {
    await mutate();
  }, [mutate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput) {
      params.set("search", searchInput);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search by email"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button variant="outline" type="submit">
            <Search /> Search
          </Button>
        </div>

        <p className="pl-1 text-sm text-muted-foreground">
          Only 5 users are shown when searching
        </p>
      </form>

      <UsersList
        usersList={data?.users || []}
        isLoading={isLoading}
        error={error}
        onMutate={handleMutate}
      />

      {data?.pagination && (
        <PaginationSection limit={data.pagination.pages | 0} />
      )}
    </div>
  );
};

export default UsersSection;
