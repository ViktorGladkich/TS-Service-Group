"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "@/components/ui/section";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "01",
    title: "SICHERHEIT",
    href: "/leistungen/sicherheitsdienst",
    description: "Professioneller Objektschutz und Veranstaltungssicherheit. Diskret, präzise und kompromisslos.",
    image: "/images/service-security.jpg"
  },
  {
    id: "02",
    title: "UMZUG",
    href: "/leistungen/umzugservice",
    description: "Reibungslose Privat- und Firmenumzüge. Wir bewegen Werte mit höchster Sorgfalt.",
    image: "/images/service-moving.jpg"
  },
  {
    id: "03",
    title: "REINIGUNG",
    href: "/leistungen/reinigung",
    description: "Exzellente Gebäude- und Unterhaltsreinigung für makellose Repräsentation.",
    image: "/images/service-cleaning.jpg"
  }
];

export function ServiceShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      const { isDesktop } = context.conditions as { isDesktop: boolean };

      const ctx = gsap.context(() => {
        if (isDesktop) {
          // Entrance animation sequence
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            }
          });

          tl.fromTo(headlineRef.current, 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
          );

          tl.fromTo(cardsRef.current, 
            { y: 100, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
            "-=0.6"
          );

          tl.fromTo(".service-image-mask",
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", duration: 1.2, stagger: 0.15, ease: "power3.inOut" },
            "-=0.8"
          );
        } else {
          // Mobile entrance animation
          gsap.fromTo(headlineRef.current, 
            { y: 60, opacity: 0 }, 
            { 
              y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
              scrollTrigger: {
                trigger: headlineRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );

          cardsRef.current.forEach((card) => {
            if (!card) return;
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            });
            tl.fromTo(card, 
              { y: 60, opacity: 0 }, 
              { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
            );
            const mask = card.querySelector(".service-image-mask");
            if (mask) {
              tl.fromTo(mask, 
                { clipPath: "inset(100% 0 0 0)" }, 
                { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power3.inOut" }, 
                "-=1"
              );
            }
          });
        }
        void isDesktop;
      }, containerRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <Section 
      ref={sectionRef}
      className="relative z-20 mt-12 bg-metallic-light py-24 shadow-[0_-35px_60px_-15px_rgba(0,0,0,0.35)] md:mt-24 md:py-32" 
      id="expertise"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12" ref={containerRef}>
        
        {/* Headline */}
        <div className="mb-16 flex flex-col md:mb-24">
          <span className="mb-4 font-mono text-sm tracking-[0.2em] text-bg/50">
            UNSERE EXPERTISE
          </span>
          <h2 
            ref={headlineRef}
            className="font-display text-4xl font-medium tracking-tight text-bg md:text-6xl lg:text-7xl"
          >
            Drei Disziplinen.<br/>
            Ein Anspruch.
          </h2>
        </div>

        {/* Interactive Accordion Container */}
        <div className="flex h-[700px] w-full flex-col gap-2 md:h-[600px] md:flex-row lg:h-[750px]">
          {SERVICES.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            
            return (
              <div
                key={service.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                // Flex manipulation drives the smooth expansion/compression
                className={cn(
                  "group relative overflow-hidden bg-surface transition-all duration-800 ease-[cubic-bezier(0.25,1,0.5,1)]",
                  !isAnyHovered && "flex-1", // Equal distribution
                  isHovered && "flex-3",   // Focused panel expands heavily
                  isAnyHovered && !isHovered && "flex-[0.5]" // Others compress
                )}
              >
                {/* Background Image (Masked via GSAP on entrance) */}
                <div className="service-image-mask absolute inset-0 z-0 bg-elevated">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 720px"
                    className={cn(
                      "object-cover object-center transition-all duration-1200 ease-out",
                      isHovered ? "scale-105 opacity-80" : "scale-100 opacity-40"
                    )}
                  />
                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                </div>

                {/* Overlay Content */}
                <Link 
                  href={service.href}
                  className="absolute inset-0 z-10 flex cursor-pointer flex-col justify-between p-6 md:p-10"
                >
                  {/* Top: Number & Arrow */}
                  <div className="flex items-start justify-between">
                    <span className={cn(
                      "font-mono text-xl transition-colors duration-500",
                      isHovered ? "text-white" : "text-white/50"
                    )}>
                      {service.id}
                    </span>
                    
                    {/* Animated Arrow */}
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md transition-all duration-600 ease-out",
                      isHovered ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                    )}>
                      <ArrowRight className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  {/* Bottom: Title & Sliding Description */}
                  <div className="flex flex-col justify-end">
                    <h3 className="whitespace-nowrap font-display text-3xl font-medium tracking-tight text-white md:text-4xl lg:text-5xl">
                      {service.title}
                    </h3>
                    
                    {/* Hidden body that slides up on hover */}
                    <div 
                      className={cn(
                        "mt-0 overflow-hidden transition-all duration-800 ease-[cubic-bezier(0.25,1,0.5,1)]",
                        isHovered ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <p className="max-w-sm text-sm leading-relaxed text-white/70 md:text-base">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </Section>
  );
}
