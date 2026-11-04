import "server-only";

import { llmConfig } from "@/server/config/env";

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

/**
 * Minimal client for any OpenAI-compatible chat endpoint: vLLM (gpt-oss), OpenAI, or a gateway.
 * Configure with LLM_BASE_URL / LLM_MODEL / LLM_API_KEY. Returns the parsed JSON object the model
 * produced.
 */
export async function chatJson(messages: ChatMessage[]): Promise<unknown> {
  const { baseUrl, model, apiKey, timeoutMs } = llmConfig;
  if (!baseUrl || !model) {
    throw new Error("LLM_BASE_URL and LLM_MODEL must be set when LLM_MODE=live");
  }

  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0,
      response_format: { type: "json_object" },
    }),
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!response.ok) {
    throw new Error(`LLM request failed: ${response.status} ${await response.text()}`);
  }

  const body = (await response.json()) as {
    choices?: { message?: { content?: string | null } }[];
  };
  const content = body.choices?.[0]?.message?.content ?? "";
  // Some models wrap JSON in a markdown fence despite response_format.
  const json = content
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/, "")
    .trim();
  return JSON.parse(json);
}
