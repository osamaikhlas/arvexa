import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";
import { SITE_TAGLINE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Arvexa: AI-native product engineering. From AI prototype to production.";

/**
 * Generated, not a designed asset — no real OG image was ever supplied
 * (docs/open-questions.md), so this builds one from the same tokens as
 * the rest of the site (brand-system.md) rather than shipping a broken
 * or generic social-preview image. Uses the real icon file (not a
 * hand-drawn approximation) so it actually matches the site's logo.
 * Route-level `opengraph-image.tsx` files (none exist yet) would override
 * this per-page if ever added.
 */
export default function OgImage() {
  const iconPath = join(process.cwd(), "public/logo/arvexa-icon.png");
  const iconBase64 = readFileSync(iconPath).toString("base64");
  const iconSrc = `data:image/png;base64,${iconBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#fefeff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* next/og requires a plain <img>, not next/image */}
          <img src={iconSrc} width={44} height={44} alt="" />
          <span style={{ fontSize: 34, fontWeight: 700, color: "#111111", letterSpacing: -1 }}>
            ARVEXA
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 64, fontWeight: 700, color: "#111111", lineHeight: 1.05 }}>
            <span>From AI Prototype</span>
            <span>to Production.</span>
          </div>
          <div style={{ fontSize: 28, color: "#525252" }}>{SITE_TAGLINE}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
