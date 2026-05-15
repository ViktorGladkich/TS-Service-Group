"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

// 18 High-End Architecture & Facility Services Placeholders
const LOOP_IMAGES = [
  "/images/hero-01.jpg",
  "/images/hero-02.jpg",
  "/images/hero-03.jpg",
  "/images/hero-04.jpg",
  "/images/about-cityscape.png",
  "/images/about-hero.png",
  "/images/about-team.jpg",
  "/images/bento-interior.jpg",
  "/images/bento-premium.jpg",
  "/images/bento-security.jpg",
  "/images/service-cleaning.jpg",
  "/images/service-moving.jpg",
  "/images/service-security.jpg",
  "/images/screen4.png",
];

export function CtaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Kinetic Rapid Image Switching Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LOOP_IMAGES.length);
    }, 1500); // Switches smoothly every 1.5s for beautiful cinematic pacing

    return () => clearInterval(interval);
  }, []);

  // Rejouice Expansion Scroll Animation (Hardware GPU Accelerated)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!wrapperRef.current) return;

      gsap.fromTo(
        wrapperRef.current,
        {
          scale: 0.82,
        },
        {
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "center center",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      ref={containerRef}
      container={false}
      className="relative z-30 mt-12 md:mt-1 w-full h-screen min-h-[700px] overflow-hidden bg-bg  py-4 lg:py-6"
      id="cta"
      
    >
      <div className="w-full h-full px-4 lg:px-15">
        <div
          ref={wrapperRef}
          className="relative w-full h-full overflow-hidden rounded-[1rem] md:rounded-[3rem] shadow-2xl"
        >
          {/* Rapid Switching Image Array */}
          {LOOP_IMAGES.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={src}
                alt={`TS Service Group Showcase ${index + 1}`}
                fill
                sizes="100vw"
                priority={index < 5}
                className="object-cover brightness-[0.75] transition-all duration-500"
              />
            </div>
          ))}

          {/* Center Call to Action Card Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none p-6 text-center">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 px-8 sm:px-12 md:px-16 py-12 md:py-16 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] space-y-8 max-w-2xl pointer-events-auto">
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-metallic-light font-medium">
                  [ BEREIT FÜR EXZELLENZ ]
                </p>
                <h2 className="font-display text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
                  Starten Sie Ihr Projekt.
                </h2>
                <p className="text-sm md:text-base text-white/80 max-w-lg mx-auto pt-2 leading-relaxed">
                  Erleben Sie maßgeschneiderte Sicherheits-, Umzugs- und Reinigungskonzepte für Ihr Objekt in Dresden und ganz Sachsen.
                </p>
              </div>

              <div className="pt-2">
                <Link href="/kontakt">
                  <Button variant="secondary" size="lg" className="rounded-full font-mono uppercase tracking-wider text-xs border border-black shadow-lg">
                    Online-Briefing starten
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}
