import "server-only";

import { randomUUID } from "node:crypto";
import type { ListUsersQuery, UserInput } from "@/features/users/schemas";
import type { UserDto } from "@/features/users/types";
import type { Role, UserStatus } from "@/lib/constants";

/**
 * Persistence boundary. The in-memory implementation below is a development stand-in:
 * implement this interface against your real database (Prisma/Drizzle/etc.) and swap the
 * export at the bottom — services and actions do not change.
 */
export interface UsersRepository {
  findById(id: string): Promise<UserDto | undefined>;
  findByEmail(email: string): Promise<UserDto | undefined>;
  list(query: ListUsersQuery): Promise<{ items: UserDto[]; total: number }>;
  count(): Promise<{ total: number; active: number; admins: number }>;
  create(input: UserInput): Promise<UserDto>;
  update(id: string, input: UserInput): Promise<UserDto | undefined>;
  remove(id: string): Promise<boolean>;
}

const FIRST = [
  "Ada",
  "Grace",
  "Alan",
  "Linus",
  "Margaret",
  "Dennis",
  "Barbara",
  "Ken",
  "Radia",
  "Tim",
];
const LAST = [
  "Lovelace",
  "Hopper",
  "Turing",
  "Torvalds",
  "Hamilton",
  "Ritchie",
  "Liskov",
  "Thompson",
  "Perlman",
  "Berners",
];

function seed(): Map<string, UserDto> {
  const store = new Map<string, UserDto>();
  const now = Date.now();

  const add = (name: string, email: string, role: Role, status: UserStatus, daysAgo: number) => {
    const createdAt = new Date(now - daysAgo * 86_400_000).toISOString();
    const record: UserDto = {
      id: randomUUID(),
      name,
      email,
      role,
      status,
      createdAt,
      updatedAt: createdAt,
    };
    store.set(record.id, record);
  };

  add("Admin User", "admin@example.com", "admin", "active", 90);
  add("Manager User", "manager@example.com", "manager", "active", 60);
  add("Regular User", "user@example.com", "user", "active", 30);

  for (let i = 0; i < 22; i++) {
    const first = FIRST[i % FIRST.length];
    const last = LAST[(i * 3) % LAST.length];
    add(
      `${first} ${last}`,
      `${first}.${last}${i}@example.com`.toLowerCase(),
      i % 7 === 0 ? "manager" : "user",
      i % 5 === 0 ? "inactive" : "active",
      i + 1,
    );
  }
  return store;
}

// Survives dev HMR so data is not wiped on every edit.
const globalStore = globalThis as unknown as { __users?: Map<string, UserDto> };
const getStore = () => (globalStore.__users ??= seed());

const memoryRepository: UsersRepository = {
  async findById(id) {
    return getStore().get(id);
  },

  async findByEmail(email) {
    for (const user of getStore().values()) if (user.email === email) return user;
    return undefined;
  },

  async list({ page, pageSize, search, sort, order }) {
    let items = [...getStore().values()];

    if (search) {
      const needle = search.toLowerCase();
      items = items.filter(
        (u) => u.name.toLowerCase().includes(needle) || u.email.toLowerCase().includes(needle),
      );
    }

    const dir = order === "asc" ? 1 : -1;
    items.sort((a, b) => a[sort].localeCompare(b[sort]) * dir);

    const total = items.length;
    return { items: items.slice((page - 1) * pageSize, page * pageSize), total };
  },

  async count() {
    const users = [...getStore().values()];
    return {
      total: users.length,
      active: users.filter((u) => u.status === "active").length,
      admins: users.filter((u) => u.role === "admin").length,
    };
  },

  async create(input) {
    const now = new Date().toISOString();
    const record: UserDto = { id: randomUUID(), createdAt: now, updatedAt: now, ...input };
    getStore().set(record.id, record);
    return record;
  },

  async update(id, input) {
    const store = getStore();
    const existing = store.get(id);
    if (!existing) return undefined;
    const next = { ...existing, ...input, updatedAt: new Date().toISOString() };
    store.set(id, next);
    return next;
  },

  async remove(id) {
    return getStore().delete(id);
  },
};

export const usersRepository: UsersRepository = memoryRepository;
