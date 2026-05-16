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
 * Page transition — "Slice Revealer"
 *
 * Click a link →
 *   1. 5 vertical slices stagger in from the top to cover the screen.
 *   2. router.push fires while screen is covered.
 *   3. On pathname change, the slices stagger out to the bottom.
 */

const SLICES_COUNT = 5;
const SLICE_DURATION = 0.6;
const SLICE_STAGGER = 0.05;
const HOLD = 0.05;

export function PageTransitionProvider({ children }: PropsWithChildren) {
  const slicesRef = useRef<(HTMLDivElement | null)[]>([]);
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

    // Split curtains (Slice Reveal to bottom)
    tl.to(slicesRef.current, {
      y: "100%",
      duration: SLICE_DURATION,
      stagger: SLICE_STAGGER,
      ease: "power3.inOut",
    });
    
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => router.push(href),
      });

      // 1. Slices cover the screen from the top
      tl.fromTo(
        slicesRef.current,
        { y: "-100%" },
        {
          y: "0%",
          duration: SLICE_DURATION,
          stagger: SLICE_STAGGER,
          ease: "power3.inOut",
        },
        0
      );

      // 2. Brief hold
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
        {/* Slices */}
        {Array.from({ length: SLICES_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              slicesRef.current[i] = el;
            }}
            className="h-full flex-1 bg-white will-change-transform border-r border-black/10 shadow-[20px_0_40px_rgba(0,0,0,0.2)] last:border-r-0 z-10"
            style={{ transform: "translateY(-100%)" }}
          />
        ))}
      </div>

      {/* Page content passes through untouched */}
      {children}
    </TransitionContext.Provider>
  );
}
