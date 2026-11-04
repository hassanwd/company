import "server-only";

import mammoth from "mammoth";
import { extractText, getDocumentProxy } from "unpdf";
import { AppError } from "@/server/http/errors";

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

/** Reads the text of an uploaded PDF, Word (.docx) or plain-text contract. */
export async function extractContractText(file: File): Promise<string> {
  if (file.size > MAX_UPLOAD_BYTES)
    throw new AppError("FILE_TOO_LARGE", "Files must be 5 MB or smaller.");
  const name = file.name.toLowerCase();
  const buffer = Buffer.from(await file.arrayBuffer());

  let text: string;
  if (name.endsWith(".docx")) {
    text = (await mammoth.extractRawText({ buffer })).value;
  } else if (name.endsWith(".pdf")) {
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    text = (await extractText(pdf, { mergePages: true })).text;
  } else if (name.endsWith(".txt")) {
    text = buffer.toString("utf8");
  } else {
    throw new AppError("UNSUPPORTED_FILE", "Upload a PDF, Word (.docx) or .txt file.");
  }

  text = text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  if (!text) {
    throw new AppError(
      "EMPTY_FILE",
      "No text found. Scanned PDFs need OCR first; try the Word version.",
    );
  }
  return text;
}
