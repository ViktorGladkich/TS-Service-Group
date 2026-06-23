"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";
import {
  FAQ_GENERAL,
  FAQ_SICHERHEIT,
  FAQ_UMZUG,
  FAQ_REINIGUNG,
} from "@/content/faq";
import type { FAQItem } from "@/lib/types";
import { cn } from "@/lib/cn";

const METALLIC_GRADIENT =
  "linear-gradient(135deg, #EDEDED 0%, #B5B5B5 50%, #8A8A8A 100%)";

interface Category {
  id: string;
  label: string;
  items: FAQItem[];
}

const CATEGORIES: Category[] = [
  { id: "general", label: "Allgemein", items: FAQ_GENERAL },
  { id: "sicherheit", label: "Sicherheitsdienst", items: FAQ_SICHERHEIT },
  { id: "umzug", label: "Umzugservice", items: FAQ_UMZUG },
  { id: "reinigung", label: "Reinigung", items: FAQ_REINIGUNG },
];

export function FaqAccordion() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("general");
  const [openItem, setOpenItem] = useState<number | null>(null);

  const activeItems =
    CATEGORIES.find((c) => c.id === activeCategory)?.items ?? [];

  // Reset open item on category switch
  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setOpenItem(null);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-section-eyebrow",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        ".faq-section-title-line",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        ".faq-category-pill",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-border bg-bg py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-center text-center md:mb-16">
          <span
            className="faq-section-eyebrow mb-4 font-mono text-sm uppercase tracking-[0.2em] text-text-muted"
            style={{ opacity: 0 }}
          >
            THEMEN
          </span>
          <h2
            ref={titleRef}
            className="font-display text-4xl font-medium tracking-tight text-text md:text-6xl lg:text-7xl"
          >
            <span
              className="faq-section-title-line block"
              style={{ opacity: 0 }}
            >
              Was Sie wissen sollten.
            </span>
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="FAQ Kategorien"
          className="mb-12 flex flex-wrap justify-center gap-2 md:gap-3 md:mb-16"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={cn(
                "faq-category-pill cursor-pointer rounded-full border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300",
                activeCategory === cat.id
                  ? "border-metallic-light bg-metallic-light text-bg"
                  : "border-border text-text-muted hover:border-border-hover hover:text-text"
              )}
              style={{ opacity: 0 }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion items */}
        <div className="border-t border-border">
          {activeItems.map((item, i) => (
            <FaqItemRow
              key={`${activeCategory}-${i}`}
              item={item}
              index={i}
              isOpen={openItem === i}
              onToggle={() => setOpenItem(openItem === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ item row — number + question + animated answer

function FaqItemRow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, rowRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rowRef} className="border-b border-border" style={{ opacity: 0 }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full cursor-pointer items-start gap-4 py-8 text-left md:gap-8 md:py-10"
      >
        {/* Metallic numbered tag */}
        <span
          className="shrink-0 font-display text-2xl font-medium leading-none tracking-[-0.04em] md:text-3xl lg:text-4xl"
          style={{
            background: METALLIC_GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            minWidth: "3rem",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question */}
        <h3
          className={cn(
            "flex-1 font-display text-xl font-medium leading-tight tracking-tight transition-colors duration-300 md:text-2xl lg:text-[1.75rem]",
            isOpen ? "text-text" : "text-text group-hover:text-metallic-light"
          )}
        >
          {item.question}
        </h3>

        <span
          className={cn(
            "mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-hover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isOpen
              ? "rotate-45 border-metallic-light bg-metallic-light/10"
              : "group-hover:border-text"
          )}
        >
          <Plus
            className={cn(
              "h-4 w-4 transition-colors duration-300",
              isOpen ? "text-metallic-light" : "text-text-muted"
            )}
          />
        </span>
      </button>

      <div
        className={cn(
          "grid transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden md:pl-22 lg:pl-24">
          <p
            className={cn(
              "max-w-3xl pb-8 pr-12 text-base leading-relaxed text-text-muted md:text-lg",
              "pl-0"
            )}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
