/**
 * Articles for the /insights section. Intentionally empty: the section stays out of the
 * navigation and the sitemap (and is noindexed) until at least one real article exists below.
 */

export type Article = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. "2026-11-03". */
  date: string;
  /** One string per paragraph. */
  body: string[];
};

// TODO: add real data
export const ARTICLES: Article[] = [];

export const hasInsights = ARTICLES.length > 0;

export const getArticle = (slug: string) => ARTICLES.find((article) => article.slug === slug);
