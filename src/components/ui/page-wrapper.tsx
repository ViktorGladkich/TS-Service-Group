"use client";

import { useState, useEffect } from "react";
import { Preloader } from "@/components/ui/preloader";
import { SmoothScroller } from "@/components/ui/smooth-scroller";
import { PageTransitionProvider } from "@/components/ui/page-transition";

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
    setPreloaderDone(true);
  };

  return (
    // PageTransitionProvider mounts at top level so the curtain persists across routes
    <PageTransitionProvider>
      {!preloaderDone && <Preloader onComplete={handleComplete} />}

      {/* Lenis initializes only after preloader exits to avoid conflicting with scroll lock */}
      <SmoothScroller enabled={preloaderDone}>
        <div
          style={{
            opacity: preloaderDone ? 1 : 0,
            transition: "opacity 0.5s ease 0.1s",
            pointerEvents: preloaderDone ? "auto" : "none",
          }}
        >
          {children}
        </div>
      </SmoothScroller>
    </PageTransitionProvider>
  );
}
