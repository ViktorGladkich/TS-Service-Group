"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Section } from "@/components/ui/section";

const SERVICES = [
  "SICHERHEITSDIENST",
  "OBJEKTSCHUTZ",
  "UMZUGSERVICE",
  "GEBÄUDEREINIGUNG",
  "VERANSTALTUNGSSCHUTZ",
  "UNTERHALTSREINIGUNG",
];

export function TickerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite horizontal scroll
      tweenRef.current = gsap.to(".ticker-track", {
        xPercent: -50,
        ease: "none",
        duration: 35, // Smooth, elegant speed
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    gsap.to(tweenRef.current, { timeScale: 0.2, duration: 0.8, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: "power2.out" });
  };

  return (
    <Section
      ref={sectionRef}
      className="relative z-20 overflow-hidden bg-bg -mt-24 md:-mt-40 lg:-mt-56 mb-12 md:mb-16 lg:mb-40 py-16 md:py-24"
      id="ticker"
    >
      <div 
        className="relative mx-auto flex w-full max-w-[100vw] items-center"
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="ticker-track flex w-max items-center">
          {/* Render 2 identical sets for seamless loop */}
          {[0, 1].map((setIndex) => (
            <div key={setIndex} className="flex items-center">
              {SERVICES.map((service, index) => (
                <div key={`${setIndex}-${index}`} className="flex items-center">
                  <span 
                    className="whitespace-nowrap font-display text-5xl font-medium tracking-tight text-white/90 transition-colors hover:text-white md:text-7xl lg:text-8xl"
                  >
                    {service}
                  </span>
                  <div className="mx-6 flex h-10 w-10 shrink-0 items-center justify-center md:mx-10 md:h-14 md:w-14">
                    <Image
                      src="/images/3dicon.png"
                      alt="Separator"
                      width={56}
                      height={56}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
