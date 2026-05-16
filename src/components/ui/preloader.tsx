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
      const titleWords = wrapWords(".preloader-title");

      const tl = gsap.timeline({
        defaults: { ease: "hop" },
        onComplete,
      });

      tl
        // 1. Eyebrow rises
        .to(eyebrowWords, { y: "0%", duration: 0.7, stagger: 0.04 }, 0.3)
        // 2. Title rises shortly after
        .to(titleWords, { y: "0%", duration: 0.8, stagger: 0.06 }, 0.5)
        // 3. Copy fades after a hold
        .to(copyRef.current, { opacity: 0, duration: 0.4 }, 2.0)
        // 4. Curtain split — top slides up, bottom slides down
        .to(topHalfRef.current, { yPercent: -100, duration: 1.2 }, 2.55)
        .to(bottomHalfRef.current, { yPercent: 100, duration: 1.2 }, 2.55);
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
          <h1
            className="preloader-title font-display text-white uppercase font-medium leading-[0.95] tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.2rem, 4.5vw + 0.5rem, 4.5rem)" }}
          >
            Sicherheit. Sauberkeit. Bewegung.
          </h1>
        </div>
      </div>
    </div>
  );
}
