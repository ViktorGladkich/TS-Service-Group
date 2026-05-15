"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type PropsWithChildren,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

type NavigateFn = (href: string) => void;
const TransitionContext = createContext<NavigateFn>(() => {});
export const usePageTransition = () => useContext(TransitionContext);

/**
 * Page transition — "Cinematic Split"
 *
 * Click a link →
 *   1. Two dark panels meet in the center from left and right.
 *   2. The brand logo pops up in the center briefly.
 *   3. router.push fires while screen is covered.
 *   4. On pathname change, the panels separate to reveal the new page.
 */

const COVER_DURATION = 0.5;
const HOLD = 0.2;
const REVEAL_DURATION = 0.5;

export function PageTransitionProvider({ children }: PropsWithChildren) {
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isInitial = useRef(true);
  const isAnimating = useRef(false);

  // On pathname change (post-navigation): slide curtains out
  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        isAnimating.current = false;
      },
    });

    // Fade out logo and line first
    tl.to(logoRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.2,
      ease: "power2.in",
    });
    tl.to(lineRef.current, {
      opacity: 0,
      scaleY: 0,
      duration: 0.3,
      ease: "expo.inOut",
    }, "<");

    // Split curtains
    tl.to(leftCurtainRef.current, {
      x: "-100%",
      duration: REVEAL_DURATION,
      ease: "expo.inOut",
    }, "-=0.1");

    tl.to(rightCurtainRef.current, {
      x: "100%",
      duration: REVEAL_DURATION,
      ease: "expo.inOut",
    }, "<");
    
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => router.push(href),
      });

      // 1. Curtains meet in the center
      tl.fromTo(
        leftCurtainRef.current,
        { x: "-100%" },
        {
          x: "0%",
          duration: COVER_DURATION,
          ease: "expo.inOut",
        },
        0
      );

      tl.fromTo(
        rightCurtainRef.current,
        { x: "100%" },
        {
          x: "0%",
          duration: COVER_DURATION,
          ease: "expo.inOut",
        },
        0
      );

      // 2. Line expands down the center
      tl.fromTo(
        lineRef.current,
        { opacity: 0, scaleY: 0 },
        {
          opacity: 1,
          scaleY: 1,
          duration: 0.6,
          ease: "expo.out",
        },
        COVER_DURATION - 0.2
      );

      // 3. Logo pops in
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );

      // 3. Brief hold
      tl.to({}, { duration: HOLD });
    },
    [router]
  );

  // Global click interceptor
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (e.button !== 0) return;

      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      if (!href.startsWith("/") || href.startsWith("//")) return;
      if (href.includes("#")) return;
      if (anchor.target === "_blank") return;
      if (anchor.hasAttribute("download")) return;
      if (href === pathname) return;

      e.preventDefault();
      e.stopImmediatePropagation();
      navigate(href);
    };

    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true });
  }, [navigate, pathname]);

  return (
    <TransitionContext.Provider value={navigate}>
      {/* Fixed overlay above everything */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[200] flex overflow-hidden"
      >
        {/* Left Curtain */}
        <div
          ref={leftCurtainRef}
          className="h-full w-1/2 bg-bg will-change-transform border-r border-white/5"
          style={{ transform: "translateX(-100%)" }}
        />
        
        {/* Right Curtain */}
        <div
          ref={rightCurtainRef}
          className="h-full w-1/2 bg-bg will-change-transform border-l border-white/5"
          style={{ transform: "translateX(100%)" }}
        />

        {/* Center Vertical Line */}
        <div
          ref={lineRef}
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] opacity-0 pointer-events-none bg-gradient-to-b from-transparent via-metallic-light to-transparent origin-center"
        />

        {/* Center Logo/Brand */}
        <div
          ref={logoRef}
          className="absolute inset-0 flex flex-col items-center justify-center opacity-0 pointer-events-none"
        >
          <span className="font-display font-medium text-white text-4xl tracking-[0.2em] uppercase">
            TS SERVICE
          </span>
          <span className="font-mono text-xs text-text-subtle mt-2 tracking-[0.4em] uppercase">
            GROUP
          </span>
        </div>
      </div>

      {/* Page content passes through untouched */}
      {children}
    </TransitionContext.Provider>
  );
}
