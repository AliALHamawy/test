"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollStore } from "@/lib/store/scroll";
import { Button } from "@/components/ui/button";
import { IphoneDuoScene } from "./IphoneDuoScene";
import { HeroHotspots } from "./HeroHotspots";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const { setProgress } = useScrollStore.getState();
    const proxy = { value: 0 };

    // gsap.context scopes the tween + its ScrollTrigger to this section and lets
    // revert() tear both of them down (React 19 StrictMode runs effects twice).
    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        value: 1,
        ease: "none",
        onUpdate: () => setProgress(proxy.value),
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => {
      ctx.revert();
      setProgress(0);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Explicit, fully-sized wrapper: the Canvas fills its parent, so it can never
          collapse into an invisible box. */}
      <div className="absolute inset-0 h-full w-full">
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 5], fov: 50 }}
        >
          <Suspense fallback={null}>
            <IphoneDuoScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center px-6 pt-20 text-center md:pt-24">
        <h1 className="text-5xl font-bold tracking-tight md:text-7xl">iPhone Duo</h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          The foldable iPhone. Two displays. One continuous canvas.
        </p>
        <div className="pointer-events-auto mt-10 flex items-center justify-center gap-4">
          <Button variant="outline" size="lg">
            Learn more
          </Button>
          <Button size="lg">Pre-order</Button>
        </div>
      </div>

      <HeroHotspots />

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <div className="h-6 w-1 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Scroll to unfold</span>
        </div>
      </div>
    </section>
  );
}
