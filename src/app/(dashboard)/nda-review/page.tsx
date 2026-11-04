import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/feedback/page-header";
import { NdaReviewWorkspace } from "@/features/nda-review/components/nda-review-workspace";
import { llmConfig } from "@/server/config/env";

export const metadata: Metadata = { title: "NDA review" };

export default function NdaReviewPage() {
  return (
    <>
      <PageHeader
        title="Contract Review Agent"
        description="Upload an NDA. The agent compares every clause with your playbook and drafts redlines; an attorney decides."
      />
      <NdaReviewWorkspace
        modeLabel={
          llmConfig.mode === "live"
            ? `Live model: ${llmConfig.model ?? "not set"}`
            : "Demo mode: rule-based checks"
        }
      />
    </>
  );
}
