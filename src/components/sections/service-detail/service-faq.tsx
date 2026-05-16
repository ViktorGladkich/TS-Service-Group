"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ServiceMeta, ServiceFaqItem } from "./types";

const METALLIC_GRADIENT =
  "linear-gradient(135deg, #EDEDED 0%, #B5B5B5 50%, #8A8A8A 100%)";

export function ServiceFaq({ meta }: { meta: ServiceMeta }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sfaq-eyebrow",
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
        ".sfaq-title-line",
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Header column */}
          <div className="lg:col-span-4">
            <span
              className="sfaq-eyebrow mb-5 block font-mono text-sm uppercase tracking-[0.25em] text-text-muted"
              style={{ opacity: 0 }}
            >
              {meta.faqEyebrow}
            </span>
            <h2 className="font-display text-4xl font-medium tracking-tight text-text md:text-5xl lg:text-6xl">
              {meta.faqTitle.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-1">
                  <span
                    className={
                      "sfaq-title-line block " +
                      (i === meta.faqTitle.length - 1 ? "text-text-muted" : "")
                    }
                    style={{ transform: "translateY(100%)" }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h2>
          </div>

          {/* Accordion column */}
          <div className="lg:col-span-8">
            <div className="border-t border-border">
              {meta.faq.map((item, i) => (
                <FaqRow
                  key={i}
                  item={item}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqRow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: ServiceFaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-start gap-5 py-8 text-left md:py-10"
      >
        <span
          className="shrink-0 font-display text-xl font-medium leading-none tracking-[-0.04em] md:text-2xl"
          style={{
            background: METALLIC_GRADIENT,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            minWidth: "2.5rem",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className={cn(
            "flex-1 font-display text-lg font-medium leading-tight tracking-tight transition-colors duration-300 md:text-2xl",
            isOpen ? "text-text" : "text-text group-hover:text-metallic-light"
          )}
        >
          {item.question}
        </h3>
        <span
          className={cn(
            "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-hover transition-all duration-500",
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
          "grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-3xl pb-8 pl-0 pr-12 text-base leading-relaxed text-text-muted md:pl-[3.5rem] md:text-lg">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
