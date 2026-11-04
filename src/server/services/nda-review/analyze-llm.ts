import "server-only";

import { z } from "zod";
import { NDA_PLAYBOOK } from "@/features/nda-review/playbook";
import { chatJson } from "@/server/llm/client";
import type { ClauseResult } from "./analyze-rules";

const llmFindingSchema = z.object({
  clauseId: z.string(),
  position: z.enum(["preferred", "acceptable", "unacceptable", "missing"]),
  paragraph: z.number().int().nullable(),
  issue: z.string(),
  suggestedText: z.string().nullable(),
  reasoning: z.string(),
});

const llmResponseSchema = z.object({ findings: z.array(llmFindingSchema) });

const SYSTEM_PROMPT = `You are a contract review assistant working for a law firm. You review a non-disclosure agreement (NDA) against the firm's playbook and prepare work for an attorney, who makes every final decision.

Rules:
- Return exactly one finding per playbook clause, using the playbook clause id.
- position: "preferred" if the clause matches the preferred position, "acceptable" if it falls within the fallback, "unacceptable" if it matches the unacceptable position or is worse, "missing" if the document has no such clause.
- paragraph: the number of the paragraph that contains the clause, or null if missing. Never invent text; only point to paragraphs that exist.
- issue: one short sentence describing what the document says.
- suggestedText: replacement language based on the playbook's suggested language, adapted to the document's defined terms. null when position is "preferred".
- reasoning: two or three sentences an attorney can check, referring to the playbook position.
- Respond with JSON only: {"findings": [{"clauseId", "position", "paragraph", "issue", "suggestedText", "reasoning"}]}`;

/** Reviews the document with the configured LLM (gpt-oss on vLLM, or any OpenAI-compatible API). */
export async function analyzeWithLlm(paragraphs: string[]): Promise<ClauseResult[]> {
  const playbook = NDA_PLAYBOOK.map(
    ({ id, title, preferred, fallback, unacceptable, suggestedLanguage }) => ({
      id,
      title,
      preferred,
      fallback,
      unacceptable,
      suggestedLanguage,
    }),
  );
  const document = paragraphs.map((p, i) => `[${i + 1}] ${p}`).join("\n\n");

  const raw = await chatJson([
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: `PLAYBOOK:\n${JSON.stringify(playbook, null, 2)}\n\nDOCUMENT (numbered paragraphs):\n${document}`,
    },
  ]);
  const { findings } = llmResponseSchema.parse(raw);

  return NDA_PLAYBOOK.map((clause) => {
    const finding = findings.find((f) => f.clauseId === clause.id);
    if (!finding) {
      return {
        clauseId: clause.id,
        position: "missing",
        issue: "The agent did not return a result for this clause. Review manually.",
        originalText: null,
        suggestedText: clause.suggestedLanguage,
        reasoning: "No result from the model; flagged so an attorney checks it.",
      };
    }
    const index = finding.paragraph === null ? -1 : finding.paragraph - 1;
    return {
      clauseId: clause.id,
      position: finding.position,
      issue: finding.issue,
      // Only quote text that exists in the document.
      originalText: paragraphs[index] ?? null,
      suggestedText: finding.position === "preferred" ? null : finding.suggestedText,
      reasoning: finding.reasoning,
    };
  });
}
