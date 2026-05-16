"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";
import type { ServiceMeta, ServiceShowcaseBlock } from "./types";

export function ServiceShowcase({ meta }: { meta: ServiceMeta }) {
  return (
    <section className="relative bg-bg">
      {meta.showcase.map((block, i) => (
        <ShowcaseRow key={block.title} block={block} index={i} />
      ))}
    </section>
  );
}

function ShowcaseRow({
  block,
  index,
}: {
  block: ServiceShowcaseBlock;
  index: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  const reversed = index % 2 === 1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (imageInnerRef.current) {
        gsap.fromTo(
          imageInnerRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".showcase-eyebrow",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
      )
        .fromTo(
          ".showcase-title",
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          ".showcase-body",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          ".showcase-bullet",
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-border"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-12 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
          {/* IMAGE */}
          <div
            className={cn(
              "relative lg:col-span-7",
              reversed && "lg:order-2"
            )}
          >
            <div
              ref={imageWrapperRef}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-elevated md:aspect-[5/4]"
              style={{ clipPath: "inset(100% 0% 0% 0%)" }}
            >
              <div ref={imageInnerRef} className="absolute inset-[-8%]">
                <Image
                  src={block.image}
                  alt={block.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-bg/40 via-transparent to-transparent" />

              {/* Corner index */}
              <div className="absolute left-6 top-6 flex items-center gap-3 rounded-full border border-white/20 bg-black/30 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-md">
                <span className="h-1 w-1 rounded-full bg-metallic-light" />
                {block.eyebrow}
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div
            className={cn(
              "lg:col-span-5",
              reversed && "lg:order-1"
            )}
          >
            <div className="space-y-8">
              <span
                className="showcase-eyebrow block font-mono text-xs uppercase tracking-[0.3em] text-metallic-light"
                style={{ opacity: 0 }}
              >
                {block.eyebrow}
              </span>

              <h3
                className="showcase-title font-display text-3xl font-medium leading-[1] tracking-tight text-text sm:text-4xl md:text-5xl"
                style={{ opacity: 0 }}
              >
                {block.title}
              </h3>

              <p
                className="showcase-body font-sans text-base leading-relaxed text-text-muted md:text-lg"
                style={{ opacity: 0 }}
              >
                {block.body}
              </p>

              <ul className="divide-y divide-border border-y border-border">
                {block.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="showcase-bullet flex items-baseline gap-5 py-4"
                    style={{ opacity: 0 }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-subtle">
                      ●
                    </span>
                    <span className="text-base text-text md:text-lg">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
