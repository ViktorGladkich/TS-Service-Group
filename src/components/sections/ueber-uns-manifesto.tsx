"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

const MANIFESTO_TEXT =
  "Drei Disziplinen, eine Haltung. Wir schaffen Räume, in denen Vertrauen entsteht — durch verlässliche Sicherheit, makellose Sauberkeit und reibungslose Bewegung. Was uns antreibt, ist nicht die Größe, sondern die Genauigkeit, mit der wir jede Aufgabe angehen.";

export function UeberUnsManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!textRef.current || !overlayRef.current) return;

      ScrollTrigger.create({
        trigger: textRef.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1,
        onUpdate: (self) => {
          const clipValue = Math.max(0, 100 - self.progress * 100);
          gsap.set(overlayRef.current, {
            clipPath: `inset(0% 0% ${clipValue}% 0%)`,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-bg py-32 md:py-40 lg:py-48"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="relative">
          {/* Background — muted */}
          <h2
            ref={textRef}
            className={cn(
              "font-display font-medium tracking-tight",
              "text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem]",
              "leading-[1.2] text-text-subtle"
            )}
          >
            {MANIFESTO_TEXT}
          </h2>

          {/* Foreground — revealed in full text-text on scroll */}
          <h2
            ref={overlayRef}
            aria-hidden="true"
            className={cn(
              "absolute inset-0 font-display font-medium tracking-tight pointer-events-none select-none",
              "text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem]",
              "leading-[1.2] text-text"
            )}
            style={{ clipPath: "inset(0% 0% 100% 0%)" }}
          >
            {MANIFESTO_TEXT}
          </h2>
        </div>
      </div>
    </section>
  );
}
