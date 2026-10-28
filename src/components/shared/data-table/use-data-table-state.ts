"use client";

import type { PaginationState, SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

/** Pagination + sorting state for a server-driven DataTable. Resets to page 1 on sort/size change. */
export function useDataTableState(initialSorting: SortingState) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const [sorting, setSorting] = useState<SortingState>(initialSorting);

  const resetPage = () => setPagination((prev) => ({ ...prev, pageIndex: 0 }));

  return {
    pagination,
    sorting,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    resetPage,
  };
}
