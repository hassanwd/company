import "server-only";

import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { isComplete, isDeviation, type Finding, type Review } from "@/features/nda-review/types";

const POSITION_LABEL: Record<Finding["position"], string> = {
  preferred: "Matches playbook",
  acceptable: "Fallback position",
  unacceptable: "Unacceptable",
  missing: "Missing",
};

const DECISION_LABEL: Record<Finding["decision"], string> = {
  pending: "Pending attorney decision",
  approved: "Approved",
  edited: "Edited by attorney",
  rejected: "Rejected (keep original)",
};

const border = { style: BorderStyle.SINGLE, size: 4, color: "D4D4D8" };
const cellBorders = { top: border, bottom: border, left: border, right: border };

const cell = (text: string, opts: { bold?: boolean; shade?: boolean; width: number }) =>
  new TableCell({
    borders: cellBorders,
    width: { size: opts.width, type: WidthType.DXA },
    shading: opts.shade ? { fill: "F4F4F5", type: "clear", color: "auto" } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: text
      .split("\n")
      .map(
        (line) =>
          new Paragraph({ children: [new TextRun({ text: line, bold: opts.bold, size: 18 })] }),
      ),
  });

const heading = (text: string) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 120 },
    children: [new TextRun(text)],
  });

const body = (text: string, opts: { bold?: boolean; italics?: boolean; color?: string } = {}) =>
  new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text, size: 20, ...opts })] });

/** Builds the attorney-facing review report as a Word document. */
export async function buildReviewDocx(review: Review): Promise<Buffer> {
  const deviations = review.findings.filter(isDeviation);
  const matches = review.findings.filter((f) => !isDeviation(f));
  const widths = [1800, 1500, 3000, 3060];

  const table = new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({
        tableHeader: true,
        children: ["Clause", "Status", "Original text", "Agreed text / decision"].map((h, i) =>
          cell(h, { bold: true, shade: true, width: widths[i]! }),
        ),
      }),
      ...deviations.map(
        (f) =>
          new TableRow({
            children: [
              cell(`${f.title}${f.severity === "critical" ? "\n(critical)" : ""}`, {
                bold: true,
                width: widths[0]!,
              }),
              cell(POSITION_LABEL[f.position], { width: widths[1]! }),
              cell(f.originalText ?? "(clause missing)", { width: widths[2]! }),
              cell(`${DECISION_LABEL[f.decision]}${f.finalText ? `\n\n${f.finalText}` : ""}`, {
                width: widths[3]!,
              }),
            ],
          }),
      ),
    ],
  });

  const doc = new Document({
    creator: "Contract Review Agent",
    title: `NDA review: ${review.title}`,
    styles: { default: { document: { run: { font: "Arial", size: 20 } } } },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
          },
        },
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun(`NDA review: ${review.title}`)],
          }),
          body(
            isComplete(review)
              ? "Status: reviewed and approved by an attorney."
              : "DRAFT: pending attorney approval. Do not send.",
            { bold: true, color: isComplete(review) ? "15803D" : "B45309" },
          ),
          body(
            `Reviewed ${new Date(review.createdAt).toUTCString()} · ${review.stats.pages} page(s) · ${review.stats.clausesChecked} clauses checked · ${review.stats.deviations} deviations · ${review.stats.critical} critical`,
            { color: "52525B" },
          ),
          heading("Deviations from the playbook"),
          deviations.length ? table : body("No deviations. The NDA matches the playbook."),
          heading("Clauses that match the playbook"),
          ...matches.map((f) => body(`• ${f.title}: ${f.issue}`)),
          heading("Agent reasoning"),
          ...deviations.flatMap((f) => [body(f.title, { bold: true }), body(f.reasoning)]),
          heading("Audit trail"),
          ...review.audit.map((e) =>
            body(
              `${new Date(e.at).toUTCString()} · ${e.actor === "agent" ? "Agent" : "Attorney"} · ${e.action}: ${e.detail}`,
              { color: "52525B" },
            ),
          ),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { before: 300 },
            children: [
              new TextRun({
                text: "Prepared by an AI agent for attorney review. Not legal advice.",
                italics: true,
                size: 16,
                color: "71717A",
              }),
            ],
          }),
        ],
      },
    ],
  });
  return Packer.toBuffer(doc);
}
