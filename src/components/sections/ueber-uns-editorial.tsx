"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface UeberUnsEditorialProps {
  src: string;
  alt: string;
  /** Optional editorial caption — shown bottom-left over the image */
  metaLeft?: string;
  /** Optional editorial caption — shown bottom-right over the image */
  metaRight?: string;
  /** Aspect ratio of the image frame. Default 16/9. */
  aspect?: "16/9" | "21/9" | "4/3" | "3/2";
  /** Vertical padding around the image */
  padding?: "default" | "compact" | "spacious";
}

const ASPECT_CLASS: Record<NonNullable<UeberUnsEditorialProps["aspect"]>, string> = {
  "16/9": "aspect-[16/9]",
  "21/9": "aspect-[21/9]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
};

const PADDING_CLASS: Record<NonNullable<UeberUnsEditorialProps["padding"]>, string> = {
  compact: "py-12 md:py-16",
  default: "py-16 md:py-24",
  spacious: "py-24 md:py-32",
};

export function UeberUnsEditorial({
  src,
  alt,
  metaLeft,
  metaRight,
  aspect = "16/9",
  padding = "default",
}: UeberUnsEditorialProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Clip-path reveal from bottom
      if (wrapperRef.current) {
        gsap.fromTo(
          wrapperRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Slow y-parallax on inner image
      if (innerRef.current) {
        gsap.fromTo(
          innerRef.current,
          { yPercent: -8, scale: 1.08 },
          {
            yPercent: 8,
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Caption fade-in
      if (captionRef.current) {
        gsap.fromTo(
          captionRef.current,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-bg ${PADDING_CLASS[padding]}`}
    >
      <div
        ref={wrapperRef}
        className="relative w-full overflow-hidden"
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
      >
        <div className={`relative w-full ${ASPECT_CLASS[aspect]}`}>
          <div ref={innerRef} className="absolute inset-[-8%]">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Bottom gradient for caption readability */}
          {(metaLeft || metaRight) && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/70 via-bg/20 to-transparent" />
          )}

          {/* Editorial caption row */}
          {(metaLeft || metaRight) && (
            <div
              ref={captionRef}
              className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between px-6 pb-6 md:px-12 md:pb-10"
              style={{ opacity: 0 }}
            >
              {metaLeft && (
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-metallic-light">
                    {metaLeft}
                  </span>
                  <div className="h-px w-8 bg-metallic-light/60" />
                </div>
              )}
              {metaRight && (
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/80">
                  {metaRight}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
