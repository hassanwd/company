"use client";

import {
  createColumnHelper,
  rowPaginationFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
  type ColumnDef,
  type PaginationState,
  type RowData,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_SIZE_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Module-scope so the reference is stable (required by TanStack Table v9).
export const dataTableFeatures = tableFeatures({ rowPaginationFeature, rowSortingFeature });
export type DataTableFeatures = typeof dataTableFeatures;

/** Typed column helper for every DataTable: `const helper = createDataTableColumns<User>()`. */
export const createDataTableColumns = <TData extends RowData>() =>
  createColumnHelper<DataTableFeatures, TData>();

// Cell value type differs per column, so a column list can only be typed with `any` here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataTableColumn<TData extends RowData> = ColumnDef<DataTableFeatures, TData, any>;

type DataTableProps<TData extends RowData> = {
  columns: DataTableColumn<TData>[];
  /** Current page rows; `undefined` while the first request is in flight. */
  data: TData[] | undefined;
  /** Total rows on the server (all pages). */
  rowCount: number;
  pagination: PaginationState;
  onPaginationChange: (
    updater: PaginationState | ((prev: PaginationState) => PaginationState),
  ) => void;
  sorting: SortingState;
  onSortingChange: (updater: SortingState | ((prev: SortingState) => SortingState)) => void;
  loading?: boolean;
  fetching?: boolean;
  emptyMessage?: string;
  toolbar?: ReactNode;
};

const emptyRows: never[] = [];

/**
 * Server-driven table: sorting and pagination are delegated to the API (manual mode), so the
 * parent owns state, puts it in the query key, and passes the current page back in as `data`.
 */
export function DataTable<TData extends RowData>({
  columns,
  data,
  rowCount,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
  loading,
  fetching,
  emptyMessage = "No results found.",
  toolbar,
}: DataTableProps<TData>) {
  const table = useTable({
    features: dataTableFeatures,
    columns,
    data: data ?? (emptyRows as TData[]),
    rowCount,
    manualPagination: true,
    manualSorting: true,
    enableSortingRemoval: false,
    state: { pagination, sorting },
    onPaginationChange,
    onSortingChange,
  });

  const { pageIndex, pageSize } = pagination;
  const from = rowCount === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, rowCount);
  const rows = table.getRowModel().rows;
  const columnCount = columns.length;

  return (
    <div className="border-border bg-card rounded-xl border shadow-sm">
      {toolbar ? <div className="border-border border-b p-4">{toolbar}</div> : null}

      <div
        className={cn("overflow-x-auto transition-opacity", fetching && !loading && "opacity-60")}
      >
        <table className="w-full text-sm">
          <thead className="border-border bg-muted/50 text-muted-foreground border-b text-left">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  const canSort = header.column.getCanSort();
                  return (
                    <th
                      key={header.id}
                      scope="col"
                      aria-sort={
                        sorted === "asc"
                          ? "ascending"
                          : sorted === "desc"
                            ? "descending"
                            : undefined
                      }
                      className="px-4 py-3 font-medium whitespace-nowrap"
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-1 focus-visible:ring-2 focus-visible:outline-none"
                        >
                          <table.FlexRender header={header} />
                          {sorted === "asc" ? (
                            <ArrowUp className="size-3.5" aria-hidden />
                          ) : sorted === "desc" ? (
                            <ArrowDown className="size-3.5" aria-hidden />
                          ) : (
                            <ChevronsUpDown className="size-3.5 opacity-50" aria-hidden />
                          )}
                        </button>
                      ) : (
                        <table.FlexRender header={header} />
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: Math.min(pageSize, 5) }, (_, i) => (
                <tr key={i} className="border-border border-b last:border-0">
                  {Array.from({ length: columnCount }, (_, j) => (
                    <td key={j} className="px-4 py-3">
                      <Skeleton className="h-5 w-full max-w-40" />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columnCount} className="text-muted-foreground px-4 py-12 text-center">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-border hover:bg-muted/40 border-b last:border-0">
                  {row.getAllCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      <table.FlexRender cell={cell} />
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="border-border flex flex-wrap items-center justify-between gap-3 border-t p-3 text-sm">
        <div className="text-muted-foreground flex items-center gap-2">
          <span>Rows per page</span>
          <Select
            aria-label="Rows per page"
            className="h-8 w-20"
            value={pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground" aria-live="polite">
            {from}–{to} of {rowCount}
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
