"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ShowreelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Defer loading + playback of the 7MB-source clip until it nears the
  // viewport. preload="none" means zero bytes on initial page load (huge LCP /
  // total-byte win); the observer kicks off the download + autoplay only when
  // the user scrolls within ~25% of the section.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.preload = "auto";
            video.play().catch(() => {});
            io.disconnect();
          }
        }
      },
      { rootMargin: "25% 0px" }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Butter-smooth scale reveal of the frame on scroll
      gsap.fromTo(
        containerRef.current,
        { scale: 0.94 },
        {
          scale: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Adds lag/smoothing to trackpads and mouse-wheels
          },
        }
      );

      // Immersive inner video zoom parallax
      gsap.fromTo(
        videoRef.current,
        { scale: 1.12 },
        {
          scale: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Symmetric smoothing
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-bg py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div
          ref={containerRef}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px] md:rounded-[32px] border border-white/10 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{
            transform: "translate3d(0,0,0)",
            backfaceVisibility: "hidden",
            willChange: "transform",
          }}
        >
          <video
            ref={videoRef}
            src="/videos/hero-showreel-opt.mp4"
            poster="/videos/hero-showreel-poster.jpg"
            className="h-full w-full object-cover origin-center"
            loop
            muted
            playsInline
            preload="none"
            style={{
              transform: "translate3d(0,0,0)",
              backfaceVisibility: "hidden",
              willChange: "transform",
            }}
          />
          {/* Ambient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-bg/30 via-transparent to-transparent pointer-events-none" />
          
          {/* Premium Glass Tag */}
          <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/90">
              Corporate Showreel
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
