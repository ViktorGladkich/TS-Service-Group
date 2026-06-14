/**
 * Module-level singleton flag — was the intro preloader already shown
 * during this browser session?
 *
 * PageWrapper marks this true once the Preloader finishes its animation.
 * Hero animations read it on mount to decide their start-delay:
 *   - first-ever load → still hidden behind preloader → wait for it
 *   - subsequent SPA navigations → preloader is long gone → animate immediately
 *
 * The flag is mirrored into sessionStorage so a *full page reload* within the
 * same tab also skips the ~2.4s intro — only the very first visit of a session
 * pays the cinematic cost. This keeps LCP fast for users browsing the site.
 *
 * Note: the in-memory value is module state, NOT React state — it survives
 * soft-navigation component re-mounts without context/props plumbing.
 */

const STORAGE_KEY = "tsg_preloader_done";

let preloaderDone = false;

export function markPreloaderDone(): void {
  preloaderDone = true;
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* sessionStorage unavailable (private mode / SSR) — in-memory flag is enough */
  }
}

export function isPreloaderDone(): boolean {
  if (preloaderDone) return true;
  try {
    if (typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "1") {
      preloaderDone = true;
      return true;
    }
  } catch {
    /* ignore */
  }
  return false;
}

/** Users who opted out of motion should never sit behind the intro curtain. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
