import { PaginationLink } from "@repo/ui/components/pagination";
import Link from "next/link";
import { cn } from "@repo/ui/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { type ComponentProps } from "react";

export function PaginationPreviousWithLink({
  href,
  className,
  ...props
}: { href: string } & ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      asChild
      {...props}
    >
      <Link
        className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
        href={href}
        passHref
      >
        <ChevronLeftIcon />
        <span className="hidden sm:block">Previous</span>
      </Link>
    </PaginationLink>
  );
}

export function PaginationNextWithLink({
  href,
  className,
  ...props
}: { href: string } & ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      asChild
      {...props}
    >
      <Link
        className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
        href={href}
        passHref
      >
        <span className="hidden sm:block">Next</span>
        <ChevronRightIcon />
      </Link>
    </PaginationLink>
  );
}
