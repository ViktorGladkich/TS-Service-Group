"use client";

import { useState, useEffect } from "react";
import { Preloader } from "@/components/ui/preloader";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Lock scroll while preloader is visible
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleComplete = () => {
    document.body.style.overflow = "";
    setPreloaderDone(true);
  };

  return (
    <>
      {!preloaderDone && <Preloader onComplete={handleComplete} />}
      <div
        style={{
          opacity: preloaderDone ? 1 : 0,
          transition: "opacity 0.5s ease 0.1s",
          pointerEvents: preloaderDone ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
