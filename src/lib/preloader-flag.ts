/**
 * Module-level singleton flag — was the intro preloader already shown
 * during this browser session?
 *
 * PageWrapper marks this true once the Preloader finishes its animation.
 * Hero animations read it on mount to decide their start-delay:
 *   - first-ever load → still hidden behind preloader → wait for it
 *   - subsequent SPA navigations → preloader is long gone → animate immediately
 *
 * Note: this is module state, NOT React state — it survives soft-navigation
 * component re-mounts without needing context/props plumbing.
 */

let preloaderDone = false;

export function markPreloaderDone(): void {
  preloaderDone = true;
}

export function isPreloaderDone(): boolean {
  return preloaderDone;
}
