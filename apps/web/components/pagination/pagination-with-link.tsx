import { PaginationLink } from "@repo/ui/components/pagination";
import Link from "next/link";
import { cn } from "@repo/ui/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { type ComponentProps } from "react";

export function PaginationPreviousWithLink({
  href,
  className,
  disabled,
  ...props
}: { href: string; disabled?: boolean } & ComponentProps<
  typeof PaginationLink
>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      asChild
      {...props}
    >
      {disabled ? (
        <span
          className={cn(
            "gap-1 px-2.5 sm:pr-2.5 opacity-50 cursor-not-allowed select-none",
            className,
          )}
          aria-disabled="true"
        >
          <ChevronLeftIcon />
          <span className="hidden sm:block">Previous</span>
        </span>
      ) : (
        <Link
          className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
          href={href}
          scroll={false}
        >
          <ChevronLeftIcon />
          <span className="hidden sm:block">Previous</span>
        </Link>
      )}
    </PaginationLink>
  );
}

export function PaginationNextWithLink({
  href,
  className,
  disabled,
  ...props
}: { href: string; disabled: boolean } & ComponentProps<
  typeof PaginationLink
>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      asChild
      {...props}
    >
      {disabled ? (
        <span
          className={cn(
            "gap-1 px-2.5 sm:pr-2.5 opacity-50 cursor-not-allowed select-none",
            className,
          )}
          aria-disabled="true"
        >
          <span className="hidden sm:block">Next</span>
          <ChevronRightIcon />
        </span>
      ) : (
        <Link
          className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
          href={href}
          scroll={false}
        >
          <span className="hidden sm:block">Next</span>
          <ChevronRightIcon />
        </Link>
      )}
    </PaginationLink>
  );
}
