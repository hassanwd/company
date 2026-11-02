import { renderShareImage } from "@/lib/og-image";

export const alt = "AI agents that finish the work, with your people in control";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderShareImage();
}
