"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const PaginationComponent = ({
  pagesCount,
  size,
  className,
  itemStyle,
  selectedItemStyle,
}: {
  pagesCount: number;
  size: number;
  className?: string;
  itemStyle?: string;
  selectedItemStyle?: string;
}) => {
  const searchParams = useSearchParams();

  if (pagesCount < 2) return;
  const paginationSize = pagesCount > size ? size : pagesCount;

  const activeIndex = Number(searchParams.get("page")) || 1;
  let start = Math.ceil(activeIndex - paginationSize / 2);
  if (start < 1) start = 1;
  if (start + paginationSize > pagesCount) {
    start = pagesCount - paginationSize || 1;
  }
  let to = start + paginationSize;
  if (to > pagesCount) to = pagesCount;
  const dotsAfter = activeIndex < pagesCount - paginationSize;
  const dotsBefor = !dotsAfter && activeIndex > paginationSize;
  const dotsTo = dotsAfter
    ? pagesCount - Math.ceil(paginationSize / 2)
    : Math.ceil(paginationSize / 2);
  const pageIndexes = Array.from(
    { length: to - start + 1 },
    (_, i) => start + i
  );

  const generateHref = (page: number) => {
    if (page < 1 || page > pagesCount) return;
    const params = new URLSearchParams(searchParams.toString());

    // Update the 'page' param
    params.set("page", page + "");

    return `?${params.toString()}`;
  };
  return (
    <div className={cn("w-fit", className)}>
      <Pagination>
        <PaginationContent>
          {activeIndex > 1 && (
            <PaginationItem className={itemStyle}>
              <PaginationPrevious href={generateHref(activeIndex - 1)} />
            </PaginationItem>
          )}
          {dotsBefor && (
            <PaginationItem>
              <PaginationLink href={generateHref(dotsTo)} className={itemStyle}>
                ...
              </PaginationLink>
            </PaginationItem>
          )}
          {pageIndexes.map((page) => (
            <PaginationItem
              key={page}
              className={cn(
                itemStyle,
                page === activeIndex && selectedItemStyle
              )}
            >
              <PaginationLink
                className={page === activeIndex ? "pointer-events-none" : ""}
                isActive={page === activeIndex}
                href={generateHref(page)}
              >
                {page}{" "}
              </PaginationLink>
            </PaginationItem>
          ))}
          {dotsAfter && (
            <PaginationItem>
              <PaginationLink href={generateHref(dotsTo)} className={itemStyle}>
                ...
              </PaginationLink>
            </PaginationItem>
          )}
          {activeIndex < pagesCount && (
            <PaginationItem className={itemStyle}>
              <PaginationNext href={generateHref(activeIndex + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
