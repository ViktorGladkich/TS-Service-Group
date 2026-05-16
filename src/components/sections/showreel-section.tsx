"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SHOWREEL_SRC = "/videos/hero-showreel.mp4";

/**
 * Full-bleed showreel between About and Ticker.
 *
 * - Autoplays muted on loop (browser-friendly — no user gesture needed).
 * - Reveal: clip-path opens from the centre outward + slight scale-in,
 *   driven by scroll position so it reads as a deliberate cinematic moment.
 * - Subtle parallax: video drifts slower than the surrounding page during
 *   its own scroll range, adding depth without being gimmicky.
 */
export function ShowreelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial hidden state — set in JS so content stays visible if effect skips.
      gsap.set(wrapperRef.current, {
        clipPath: "inset(8% 12% 8% 12% round 28px)",
        scale: 0.96,
        opacity: 0.5,
      });

      // Reveal driven by scroll (scrub) — the section opens up as it enters view.
      gsap.to(wrapperRef.current, {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        scale: 1,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top 30%",
          scrub: 1.1,
        },
      });

      // Parallax: the inner video drifts slowly upward while the page
      // scrolls past, so it visually lingers in place while the ticker
      // (which sits in normal flow below) rises up and overlaps it.
      // This produces the "наезд" effect without using position:fixed
      // pinning, which would leak through gaps in subsequent sections.
      gsap.to(videoRef.current, {
        yPercent: -28,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Wrapper drifts the opposite way so the entire video frame
      // appears even more anchored as the ticker scrolls over it.
      gsap.to(wrapperRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Best-effort autoplay (muted is required by browsers).
      const v = videoRef.current;
      if (v) {
        v.muted = true;
        v.play().catch(() => {
          // Some mobile browsers still block; that's fine — the poster shows.
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Showreel"
      className="relative z-10 w-full overflow-hidden bg-bg py-12 lg:py-20"
    >
      <div
        ref={wrapperRef}
        className="relative mx-auto aspect-video w-full max-w-[1920px] overflow-hidden bg-black will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        <video
          ref={videoRef}
          src={SHOWREEL_SRC}
          className="absolute inset-0 h-[120%] w-full object-cover"
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
