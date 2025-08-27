"use client";

import UsersList from "@/features/users-management/users-list";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Search } from "lucide-react";
import PaginationSection from "@/components/user-feedback/pagination-section";
import { Suspense, useCallback } from "react";
import { FetchError } from "@/lib/errors";
import useSWR from "swr";
import type { GetUsersResponse } from "@/types/http";
import { FEEDBACK_PAGE_LIMIT } from "@/constants/constants";
import { clientAuthGuard } from "@/utils/client-auth-guard";

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
  const { data, error, isLoading, mutate } = useSWR<GetUsersResponse>(
    `/api/users?page=${1}&limit=${FEEDBACK_PAGE_LIMIT}`,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  if (error instanceof FetchError) clientAuthGuard(error.status);

  console.log(data && data);

  const handleMutate = useCallback(async () => {
    await mutate();
  }, [mutate]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Input type="email" placeholder="Search by email" />
        <Button variant="outline">
          <Search /> Search
        </Button>
      </div>

      <UsersList
        usersList={data?.users || []}
        isLoading={isLoading}
        error={error}
        onMutate={handleMutate}
      />

      {/* TODO: Need custom loader it seems */}
      <Suspense fallback={"Loading..."}>
        <PaginationSection limit={20} />
      </Suspense>
    </div>
  );
};

export default UsersSection;
