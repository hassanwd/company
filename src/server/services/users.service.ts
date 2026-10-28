import "server-only";

import type { ListUsersQuery, UserInput } from "@/features/users/schemas";
import type { UserDto } from "@/features/users/types";
import type { Paginated } from "@/types/api";
import { usersRepository } from "@/server/db/users.repository";
import { AppError } from "@/server/http/errors";

async function assertEmailAvailable(email: string, exceptId?: string) {
  const existing = await usersRepository.findByEmail(email);
  if (existing && existing.id !== exceptId) {
    throw new AppError("CONFLICT", "A user with this email already exists", {
      email: ["Already in use"],
    });
  }
}

export const usersService = {
  async list(query: ListUsersQuery): Promise<Paginated<UserDto>> {
    const { items, total } = await usersRepository.list(query);
    return {
      items,
      meta: {
        page: query.page,
        pageSize: query.pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / query.pageSize)),
      },
    };
  },

  stats: () => usersRepository.count(),

  async create(input: UserInput) {
    await assertEmailAvailable(input.email);
    return usersRepository.create(input);
  },

  async update(id: string, input: UserInput) {
    await assertEmailAvailable(input.email, id);
    const updated = await usersRepository.update(id, input);
    if (!updated) throw AppError.notFound("User not found");
    return updated;
  },

  async remove(id: string) {
    if (!(await usersRepository.remove(id))) throw AppError.notFound("User not found");
  },
};
