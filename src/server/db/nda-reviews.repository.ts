import "server-only";

import type { Review } from "@/features/nda-review/types";

/**
 * Storage for NDA reviews and their audit trail.
 *
 * Demo implementation: in server memory (lost on restart). For a client pilot, implement this
 * interface against PostgreSQL, one database or schema per firm, and keep the audit trail
 * append-only.
 */
export interface NdaReviewsRepository {
  save(review: Review): Promise<Review>;
  get(id: string): Promise<Review | undefined>;
  list(): Promise<Review[]>;
}

const store = globalThis as unknown as { __ndaReviews?: Map<string, Review> };
const reviews = (store.__ndaReviews ??= new Map<string, Review>());
const MAX_REVIEWS = 200;

export const ndaReviewsRepository: NdaReviewsRepository = {
  async save(review) {
    reviews.set(review.id, structuredClone(review));
    // Keep memory bounded in a long-running demo server.
    if (reviews.size > MAX_REVIEWS) reviews.delete(reviews.keys().next().value!);
    return review;
  },
  async get(id) {
    const review = reviews.get(id);
    return review ? structuredClone(review) : undefined;
  },
  async list() {
    return [...reviews.values()].reverse().map((r) => structuredClone(r));
  },
};
