"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/cn";

const SERVICE_IMAGES: Record<string, string> = {
  sicherheitsdienst: "/images/service-security.png",
  umzugservice: "/images/service-moving.png",
  reinigung: "/images/service-cleaning.png",
};

const METALLIC_GRADIENT =
  "linear-gradient(135deg, #EDEDED 0%, #B5B5B5 50%, #8A8A8A 100%)";

export function LeistungenServices() {
  return (
    <div className="bg-bg">
      {siteConfig.services.map((service, index) => (
        <ServicePanel
          key={service.slug}
          service={service}
          index={index}
          total={siteConfig.services.length}
        />
      ))}
    </div>
  );
}

function ServicePanel({
  service,
  index,
  total,
}: {
  service: (typeof siteConfig.services)[number];
  index: number;
  total: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const diamondRef = useRef<HTMLDivElement>(null);

  const reversed = index % 2 === 1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Top divider (metallic line + diamond) — only when not the first panel
      if (index > 0 && topLineRef.current) {
        gsap.fromTo(
          topLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 95%",
              end: "top 60%",
              scrub: 1.2,
            },
          }
        );
      }
      if (index > 0 && diamondRef.current) {
        gsap.fromTo(
          diamondRef.current,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      }

      // Image clip-path reveal — full-bleed on enter
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
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Image parallax — slow y-drift while in viewport
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

      // Massive metallic number reveal
      if (numberRef.current) {
        gsap.fromTo(
          numberRef.current,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Content stagger entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".service-tagline",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
      )
        .fromTo(
          ".service-title",
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          ".service-desc",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          ".service-feature",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ".service-cta",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Top divider (between panels — skipped on first) */}
      {index > 0 && (
        <div className="relative pt-12 md:pt-16">
          <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
            <div className="relative flex h-3 items-center">
              <div
                ref={topLineRef}
                className="h-px w-full origin-center bg-linear-to-r from-transparent via-metallic-light to-transparent"
                style={{ transform: "scaleX(0)", willChange: "transform" }}
              />
              <div
                ref={diamondRef}
                className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-metallic-light"
                style={{
                  opacity: 0,
                  boxShadow: "0 0 12px 1px rgba(237,237,237,0.45)",
                  willChange: "opacity, transform",
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-12 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
          {/* IMAGE SIDE */}
          <div
            className={cn(
              "relative lg:col-span-7",
              reversed && "lg:order-2"
            )}
          >
            {/* Top eyebrow row above image */}
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-text-subtle">
                {service.number} / {String(total).padStart(2, "0")}
              </span>
              <div className="h-px flex-1 bg-border" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-text-subtle">
                {service.shortTitle}
              </span>
            </div>

            <div
              ref={imageWrapperRef}
              className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-elevated md:aspect-3/4"
              style={{ clipPath: "inset(100% 0% 0% 0%)" }}
            >
              <div ref={imageInnerRef} className="absolute inset-[-8%]">
                <Image
                  src={SERVICE_IMAGES[service.slug] ?? "/images/3dicon.png"}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Dark gradient for number readability */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-bg via-bg/40 to-transparent" />

              {/* Massive metallic number watermark — partially clipped at bottom */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center overflow-hidden">
                <span
                  ref={numberRef}
                  className="block font-display font-medium leading-[0.85] tracking-tighter select-none"
                  style={{
                    fontSize: "clamp(8rem, 22vw, 16rem)",
                    background: METALLIC_GRADIENT,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    transform: "translateY(15%)",
                    opacity: 0,
                  }}
                >
                  {service.number}
                </span>
              </div>
            </div>
          </div>

          {/* CONTENT SIDE */}
          <div
            className={cn(
              "lg:col-span-5",
              reversed && "lg:order-1"
            )}
          >
            <div className="space-y-8">
              <span
                className="service-tagline block font-mono text-xs uppercase tracking-[0.3em] text-metallic-light"
                style={{ opacity: 0 }}
              >
                {service.tagline.split(".")[0]}.
              </span>

              <h2
                className="service-title font-display text-4xl font-medium leading-[0.95] tracking-tight text-text sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ opacity: 0 }}
              >
                {service.title}.
              </h2>

              <p
                className="service-desc font-sans text-base leading-relaxed text-text-muted md:text-lg"
                style={{ opacity: 0 }}
              >
                {service.description}
              </p>

              <ul className="divide-y divide-border border-y border-border">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="service-feature flex items-baseline gap-5 py-4"
                    style={{ opacity: 0 }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-subtle">
                      ●
                    </span>
                    <span className="text-base text-text md:text-lg">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="service-cta pt-2" style={{ opacity: 0 }}>
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="group relative inline-flex h-12 items-center gap-4 rounded-full border border-white/10 bg-bg pl-6 pr-2 text-sm font-medium text-white overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none" />
                  <span className="relative z-10 group-hover:text-bg transition-colors duration-500">Mehr erfahren</span>
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black group-hover:bg-bg group-hover:text-white transition-colors duration-500">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
