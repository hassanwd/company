import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const OG_SIZE = { width: 1200, height: 630 } as const;

/** Shared artwork for the Open Graph and Twitter share images: brand name + tagline. */
export function renderShareImage() {
  const monogram = SITE.name.trim().charAt(0).toUpperCase();
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#ffffff",
        color: "#171717",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: SITE.brandColor,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            fontWeight: 700,
          }}
        >
          {monogram}
        </div>
        <div style={{ fontSize: 40, fontWeight: 700 }}>{SITE.name}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>
          AI agents that finish the work, with your people in control
        </div>
        <div style={{ fontSize: 30, color: "#52525b", maxWidth: 980 }}>{SITE.tagline}</div>
      </div>
      <div style={{ height: 8, width: 160, borderRadius: 4, background: SITE.brandColor }} />
    </div>,
    OG_SIZE,
  );
}

/** Square monogram used for the favicon and the Apple touch icon. */
export function renderIcon(size: number) {
  const monogram = SITE.name.trim().charAt(0).toUpperCase();
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: SITE.brandColor,
        color: "#ffffff",
        fontSize: Math.round(size * 0.62),
        fontWeight: 700,
        borderRadius: Math.round(size * 0.22),
      }}
    >
      {monogram}
    </div>,
    { width: size, height: size },
  );
}
