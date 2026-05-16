"use client";

import { useState, useEffect } from "react";
import { Preloader } from "@/components/ui/preloader";
import { SmoothScroller } from "@/components/ui/smooth-scroller";
import { PageTransitionProvider } from "@/components/ui/page-transition";
import { markPreloaderDone } from "@/lib/preloader-flag";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Lock native scroll while preloader runs (Lenis not yet active)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleComplete = () => {
    document.body.style.overflow = "";
    markPreloaderDone(); // module-level flag so re-mounted Hero can skip the 3.8s wait
    setPreloaderDone(true);
  };

  return (
    // PageTransitionProvider mounts at top level so the curtain persists across routes
    <PageTransitionProvider>
      {!preloaderDone && <Preloader onComplete={handleComplete} />}

      {/* Lenis initializes only after preloader exits to avoid conflicting with scroll lock.
          Content stays visible (opacity:1) so the preloader's curtain split reveals
          the page beneath it. Pointer events stay off until the preloader finishes. */}
      <SmoothScroller enabled={preloaderDone}>
        <div
          style={{
            pointerEvents: preloaderDone ? "auto" : "none",
          }}
        >
          {children}
        </div>
      </SmoothScroller>
    </PageTransitionProvider>
  );
}
