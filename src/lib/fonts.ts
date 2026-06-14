import localFont from "next/font/local";

/**
 * Display font — Clash Display from Fontshare
 * Used for hero headlines, large numerals, and section titles.
 */
export const clashDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/ClashDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
  // Next generates a size-adjusted @font-face for Arial so the fallback
  // matches Clash Display's metrics — eliminates the layout-shift / re-wrap
  // when the web font finishes loading. Without this, hero headlines briefly
  // render in fallback then re-wrap once Clash Display lands.
  adjustFontFallback: "Arial",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

/**
 * Sans font — Switzer from Fontshare
 * Used for body text, UI elements, navigation.
 */
export const switzer = localFont({
  src: [
    {
      path: "../../public/fonts/Switzer-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Switzer-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Switzer-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Switzer-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Switzer-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
  // Body copy isn't preloaded: `adjustFontFallback` ships a size-adjusted Arial
  // metric so the swap from fallback → Switzer causes no layout shift, and the
  // text is readable immediately. Preloading all 5 weights here would compete
  // with the LCP image and the display font for the critical bandwidth budget.
  preload: false,
  adjustFontFallback: "Arial",
  fallback: ["system-ui", "Arial", "sans-serif"],
});
