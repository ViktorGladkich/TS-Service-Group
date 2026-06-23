"use client";

import { SmoothScroller } from "@/components/ui/smooth-scroller";
import { PageTransitionProvider } from "@/components/ui/page-transition";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PageTransitionProvider>
      <SmoothScroller enabled={true}>
        {children}
      </SmoothScroller>
    </PageTransitionProvider>
  );
}
