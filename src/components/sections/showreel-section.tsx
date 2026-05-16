"use client";

import { useEffect, useRef } from "react";

const SHOWREEL_SRC = "/videos/hero-showreel.mp4";

/**
 * Full-bleed showreel between About and Ticker.
 *
 * - Autoplays muted on loop (browser-friendly — no user gesture needed).
 * - Static layout (no scroll animations).
 */
export function ShowreelSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Best-effort autoplay (muted is required by browsers).
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.play().catch(() => {
        // Some mobile browsers still block; that's fine — the poster shows.
      });
    }
  }, []);

  return (
    <section
      aria-label="Showreel"
      className="relative z-10 w-full overflow-hidden bg-bg py-12 lg:py-20"
    >
      <div
        className="relative mx-auto aspect-video w-full max-w-[1920px] overflow-hidden bg-black"
      >
        <video
          ref={videoRef}
          src={SHOWREEL_SRC}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
        {/* Subtle vignette so the section sits cohesively against bg-bg */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(10,10,10,0.55)_100%)]" />
      </div>
    </section>
  );
}
