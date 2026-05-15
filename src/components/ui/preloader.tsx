"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

// Stages: "split" → "merge" → "exit"
// split: T and S in separate colored panels (grid)
// merge: both letters come together in center, panels collapse
// exit: whole preloader slides/fades out

interface PreloaderProps {
  onComplete: () => void;
}

import Image from "next/image";

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  
  const curtainsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      // 0. "TS SERVICE GROUP" appears and flips up
      tl.fromTo(
        lettersRef.current,
        { yPercent: 120, opacity: 0, rotateX: -90, transformOrigin: "bottom center" },
        { 
          yPercent: 0, 
          opacity: 1, 
          rotateX: 0,
          duration: 0.6, 
          stagger: 0.02, 
          ease: "expo.out" 
        }
      )
      // Track out spacing
      .to(
        textRef.current,
        { letterSpacing: "0.15em", duration: 0.8, ease: "power2.out" },
        "-=0.3"
      )
      // Fade out TS SERVICE GROUP
      .to(
        textRef.current,
        { opacity: 0, filter: "blur(10px)", duration: 0.2 },
        "-=0.1"
      )

      // 1. Flash "SICHERHEIT"
      .fromTo(
        step1Ref.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1.05, duration: 0.15, ease: "none" }
      )
      .set(step1Ref.current, { opacity: 0 })

      // 2. Flash "UMZUGSERVICE"
      .fromTo(
        step2Ref.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1.05, duration: 0.15, ease: "none" }
      )
      .set(step2Ref.current, { opacity: 0 })

      // 3. Flash "CLEANING"
      .fromTo(
        step3Ref.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1.05, duration: 0.15, ease: "none" }
      )
      .set(step3Ref.current, { opacity: 0 })

      // 4. Logo pop-in
      .fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.6, filter: "blur(10px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "back.out(1.5)" }
      )

      // 5. Exit Phase (Push-through & Curtain Wipe)
      .addLabel("exit", "+=0.3")

      // Logo scales up aggressively towards the camera & blurs out
      .to(
        logoRef.current,
        {
          scale: 4,
          opacity: 0,
          filter: "blur(20px)",
          duration: 0.8,
          ease: "power3.in"
        },
        "exit"
      )

      // Curtains staggered slide up to reveal the page
      .to(
        curtainsRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          stagger: 0.05,
          ease: "expo.inOut"
        },
        "exit+=0.1"
      );

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const text = "TS SERVICE GROUP";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex items-center justify-center pointer-events-none"
    >
      {/* 3 Staggered Background Curtains */}
      <div className="absolute inset-0 flex w-full h-full z-0">
        <div ref={el => { curtainsRef.current[0] = el; }} className="w-1/3 h-full bg-[#0a0a0a] border-r border-white/5" />
        <div ref={el => { curtainsRef.current[1] = el; }} className="w-1/3 h-full bg-[#0a0a0a] border-r border-white/5" />
        <div ref={el => { curtainsRef.current[2] = el; }} className="w-1/3 h-full bg-[#0a0a0a]" />
      </div>

      {/* Foreground Animation Container */}
      <div className="relative z-10 flex items-center justify-center w-full h-full perspective-[1000px]">
        
        {/* Step 0: Main Title */}
        <div 
          ref={textRef}
          className="absolute flex space-x-1 md:space-x-3 font-display text-[5.5vw] sm:text-3xl md:text-5xl lg:text-7xl font-medium tracking-tight text-white whitespace-nowrap"
          style={{ transformStyle: "preserve-3d" }}
        >
          {text.split("").map((char, index) => {
            if (char === " ") {
              return <span key={`space-${index}`} className="w-3 md:w-6" />;
            }
            return (
              <span key={index} className="overflow-hidden inline-flex">
                <span 
                  ref={el => { lettersRef.current[index] = el; }}
                  className="inline-block"
                >
                  {char}
                </span>
              </span>
            );
          })}
        </div>

        {/* Flashing Services */}
        <div ref={step1Ref} className="absolute opacity-0 font-display text-[8vw] sm:text-5xl md:text-8xl font-medium text-white tracking-tighter">
          SICHERHEIT
        </div>
        <div ref={step2Ref} className="absolute opacity-0 font-display text-[8vw] sm:text-5xl md:text-8xl font-medium text-white tracking-tighter">
          UMZUGSERVICE
        </div>
        <div ref={step3Ref} className="absolute opacity-0 font-display text-[8vw] sm:text-5xl md:text-8xl font-medium text-white tracking-tighter">
          CLEANING
        </div>

        {/* Final Logo */}
        <div ref={logoRef} className="absolute opacity-0 flex items-center justify-center">
          <Image 
            src="/images/logo-white.png" 
            alt="TS Service Group" 
            width={480} 
            height={160} 
            className="w-72 h-auto object-contain md:w-96 scale-125 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            priority
          />
        </div>

      </div>
    </div>
  );
}
