"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

interface PreloaderProps {
  onComplete: () => void;
}

/**
 * Cinematic intro preloader.
 *
 * Sequence:
 *  1. Eyebrow + title rise word-by-word from below their masking boxes.
 *  2. Copy fades out.
 *  3. The screen — composed of two stacked halves — splits horizontally,
 *     top half rises out of view, bottom half drops out of view,
 *     revealing the page underneath.
 *
 * Timing is tuned to finish ~3.8s so the hero entrance animation
 * (which has a matching 3.8s delay on first load) takes over seamlessly.
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText, CustomEase);

    if (!CustomEase.get("hop")) {
      CustomEase.create("hop", ".8, 0, .3, 1");
    }

    const ctx = gsap.context(() => {
      // Split each line into words, then wrap each word's text in an
      // inner span so we can translateY without breaking the masking box.
      const wrapWords = (selector: string): HTMLElement[] => {
        const el = rootRef.current?.querySelector(selector);
        if (!el) return [];

        const split = new SplitText(el as HTMLElement, {
          type: "words",
          wordsClass: "preloader-word",
        });

        const inners: HTMLElement[] = [];
        split.words.forEach((word) => {
          const w = word as HTMLElement;
          const text = w.textContent ?? "";
          w.textContent = "";
          w.style.display = "inline-block";
          w.style.overflow = "hidden";
          w.style.lineHeight = "1";

          const inner = document.createElement("span");
          inner.style.display = "inline-block";
          inner.style.willChange = "transform";
          inner.style.transform = "translateY(110%)";
          inner.textContent = text;

          w.appendChild(inner);
          inners.push(inner);
        });
        return inners;
      };

      const eyebrowWords = wrapWords(".preloader-eyebrow");
      const cycleWords = gsap.utils.toArray<HTMLElement>(".preloader-word-cycle");

      const tl = gsap.timeline({
        defaults: { ease: "hop" },
        onComplete,
      });

      // 1. Eyebrow rises
      tl.to(eyebrowWords, { y: "0%", duration: 0.6, stagger: 0.04 }, 0.2);

      // 2. Fast sequential word cycle without overlap
      cycleWords.forEach((word, index) => {
        const CYCLE_DURATION = 0.75; // 0.35 in + 0.15 hold + 0.25 out
        const startTime = 0.4 + index * CYCLE_DURATION;
        
        // fade in & slide up
        tl.fromTo(word, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 
          startTime
        );
        
        // fade out & slide up (except last word which stays until copy fade)
        if (index < cycleWords.length - 1) {
          tl.to(word, 
            { opacity: 0, y: -20, duration: 0.25, ease: "power2.in" }, 
            startTime + 0.5 // 0.35 in + 0.15 hold
          );
        }
      });

      // 3. Copy fades after a hold
      tl.to(copyRef.current, { opacity: 0, duration: 0.4 }, 2.4);

      // 4. Curtain split — top slides up, bottom slides down
      tl.to(topHalfRef.current, { yPercent: -100, duration: 1.2 }, 2.7)
        .to(bottomHalfRef.current, { yPercent: 100, duration: 1.2 }, 2.7);
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden
    >
      {/* Top half — slides up at the end */}
      <div
        ref={topHalfRef}
        className="absolute inset-x-0 top-0 h-[50svh] bg-bg"
        style={{ zIndex: 2 }}
      />

      {/* Bottom half — slides down at the end */}
      <div
        ref={bottomHalfRef}
        className="absolute inset-x-0 bottom-0 h-[50svh] bg-bg"
        style={{ zIndex: 1 }}
      />

      {/* Centered copy — sits above both halves */}
      <div
        ref={copyRef}
        className="absolute inset-0 z-[3] flex items-center justify-center px-6 text-center"
      >
        <div className="max-w-3xl">
          <p className="preloader-eyebrow font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-white/55 mb-5">
            TS Service Group · Dresden
          </p>
          <div className="relative flex items-center justify-center overflow-visible">
            {/* Invisible placeholder for container height */}
            <span className="invisible font-display uppercase font-medium leading-[0.95] tracking-[-0.04em] pointer-events-none" style={{ fontSize: "clamp(2.2rem, 4.5vw + 0.5rem, 4.5rem)" }}>
              Sicherheit.
            </span>
            <span className="preloader-word-cycle absolute opacity-0 font-display text-white uppercase font-medium leading-[0.95] tracking-[-0.04em]" style={{ fontSize: "clamp(2.2rem, 4.5vw + 0.5rem, 4.5rem)" }}>
              Sicherheit.
            </span>
            <span className="preloader-word-cycle absolute opacity-0 font-display text-white uppercase font-medium leading-[0.95] tracking-[-0.04em]" style={{ fontSize: "clamp(2.2rem, 4.5vw + 0.5rem, 4.5rem)" }}>
              Sauberkeit.
            </span>
            <span className="preloader-word-cycle absolute opacity-0 font-display text-white uppercase font-medium leading-[0.95] tracking-[-0.04em]" style={{ fontSize: "clamp(2.2rem, 4.5vw + 0.5rem, 4.5rem)" }}>
              Bewegung.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
