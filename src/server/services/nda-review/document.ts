const clean = (parts: string[]) =>
  parts.map((p) => p.replace(/[ \t]+/g, " ").trim()).filter((p) => p.length > 0);

/**
 * Splits contract text into paragraphs. Uses blank lines first; text extracted from PDFs often
 * has none, so it falls back to line breaks, then to numbered sections ("4. Duration. ...").
 */
export function splitParagraphs(text: string): string[] {
  const normalized = text.replace(/\r\n/g, "\n");
  const byBlankLine = clean(normalized.split(/\n\s*\n/));
  if (byBlankLine.length >= 4) return byBlankLine;
  const byLine = clean(normalized.split(/\n+/));
  if (byLine.length >= 4) return byLine;
  return clean(normalized.split(/(?<=[.:])\s+(?=\d{1,2}\.\s+[A-Z])/));
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/** Rough page estimate for display (about 400 words per contract page). */
export const estimatePages = (words: number) => Math.max(1, Math.round(words / 400));
