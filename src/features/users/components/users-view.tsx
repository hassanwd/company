"use client";

import { MoreHorizontal, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { DataTable, createDataTableColumns } from "@/components/shared/data-table/data-table";
import { useDataTableState } from "@/components/shared/data-table/use-data-table-state";
import { ErrorState } from "@/components/shared/feedback/error-state";
import { PageHeader } from "@/components/shared/feedback/page-header";
import { ConfirmDialog } from "@/components/shared/modal/confirm-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useDisclosure } from "@/hooks/use-disclosure";
import { formatDate } from "@/lib/utils";
import { useDeleteUser, useUsers } from "../hooks";
import { USER_SORT_FIELDS } from "../schemas";
import type { UserDto } from "../types";
import { UserFormModal } from "./user-form-modal";

const helper = createDataTableColumns<UserDto>();

type SortField = (typeof USER_SORT_FIELDS)[number];
const isSortField = (id: string): id is SortField =>
  (USER_SORT_FIELDS as readonly string[]).includes(id);

export function UsersView() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const table = useDataTableState([{ id: "createdAt", desc: true }]);
  const formModal = useDisclosure<UserDto | undefined>();
  const deleteModal = useDisclosure<UserDto>();
  const deleteUser = useDeleteUser();

  const sort = table.sorting[0];
  const { data, isPending, isFetching, isError, refetch } = useUsers({
    page: table.pagination.pageIndex + 1,
    pageSize: table.pagination.pageSize,
    search: debouncedSearch || undefined,
    sort: sort && isSortField(sort.id) ? sort.id : "createdAt",
    order: sort?.desc === false ? "asc" : "desc",
  });

  const { onOpen: openForm } = formModal;
  const { onOpen: openDelete } = deleteModal;

  const columns = useMemo(
    () => [
      helper.accessor("name", {
        header: "Name",
        cell: ({ row }) => (
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-muted-foreground text-xs">{row.original.email}</div>
          </div>
        ),
      }),
      helper.accessor("email", { header: "Email" }),
      helper.accessor("role", {
        header: "Role",
        cell: ({ getValue }) => <Badge variant="primary">{getValue()}</Badge>,
      }),
      helper.accessor("status", {
        header: "Status",
        cell: ({ getValue }) => (
          <Badge variant={getValue() === "active" ? "success" : "neutral"}>{getValue()}</Badge>
        ),
      }),
      helper.accessor("createdAt", {
        header: "Created",
        cell: ({ getValue }) => formatDate(getValue()),
      }),
      helper.display({
        id: "actions",
        enableSorting: false,
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={`Actions for ${row.original.name}`}>
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => openForm(row.original)}>
                <Pencil className="size-4" aria-hidden /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem destructive onSelect={() => openDelete(row.original)}>
                <Trash2 className="size-4" aria-hidden /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      }),
    ],
    [openForm, openDelete],
  );

  return (
    <>
      <PageHeader
        title="Users"
        description="Manage your users."
        actions={
          <Button onClick={() => openForm(undefined)}>
            <Plus className="size-4" aria-hidden /> Add user
          </Button>
        }
      />

      {isError ? (
        <ErrorState message="We couldn't load users." onRetry={() => refetch()} />
      ) : (
        <DataTable
          columns={columns}
          data={data?.items}
          rowCount={data?.meta.total ?? 0}
          pagination={table.pagination}
          onPaginationChange={table.onPaginationChange}
          sorting={table.sorting}
          onSortingChange={(updater) => {
            table.onSortingChange(updater);
            table.resetPage();
          }}
          loading={isPending}
          fetching={isFetching}
          emptyMessage={debouncedSearch ? "No users match your search." : "No users yet."}
          toolbar={
            <div className="relative max-w-sm">
              <Search
                className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
                aria-hidden
              />
              <Input
                type="search"
                placeholder="Search by name or email…"
                aria-label="Search users"
                className="pl-9"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  table.resetPage();
                }}
              />
            </div>
          }
        />
      )}

      <UserFormModal
        open={formModal.open}
        onOpenChange={formModal.onOpenChange}
        user={formModal.payload}
      />

      <ConfirmDialog
        open={deleteModal.open}
        onOpenChange={deleteModal.onOpenChange}
        title="Delete user?"
        description={`This permanently removes ${deleteModal.payload?.name ?? "this user"}. This action cannot be undone.`}
        confirmLabel="Delete"
        destructive
        loading={deleteUser.isPending}
        onConfirm={() => {
          if (deleteModal.payload) {
            deleteUser.mutate({ id: deleteModal.payload.id }, { onSuccess: deleteModal.onClose });
          }
        }}
      />
    </>
  );
}
