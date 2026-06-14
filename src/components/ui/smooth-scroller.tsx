"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Mobile URL-bar show/hide resizes the visual viewport but not the layout
// viewport. Without this, ScrollTrigger recalculates every pin/scrub on every
// URL-bar toggle, causing visible jumps mid-scroll on iOS Safari & Chrome.
ScrollTrigger.config({ ignoreMobileResize: true });

interface Props {
  children: React.ReactNode;
  enabled: boolean;
}

export function SmoothScroller({ children, enabled }: Props) {
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Skip Lenis on touch devices: with syncTouch:false it doesn't smooth
    // native touch scrolling anyway, so the per-frame GSAP ticker would just
    // add main-thread work (hurting mobile TBT/INP) for no UX gain. ScrollTrigger
    // falls back to its own native scroll listener automatically.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    // Keep ScrollTrigger scroll position in sync with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP ticker (not rAF) for consistent frame timing
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, [enabled]);

  return <>{children}</>;
}
