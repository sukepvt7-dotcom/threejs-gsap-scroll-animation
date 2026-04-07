"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const HeroScene = dynamic(
  () => import("@/components/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false }
);

type HeroProps = {
  content: {
    eyebrow: string;
    headingTop: string;
    headingBottom: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    backgroundImage: string;
    spotlightImage: string;
  };
  lookbook: readonly string[];
  theme: {
    primary: string;
    secondary: string;
    surface: string;
    muted: string;
  };
};

export function Hero({ content, lookbook }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero-bg]", { scale: 1.18, duration: 1.6, opacity: 0.3 })
        .from("[data-hero-copy]", { y: 48, opacity: 0, duration: 1 }, 0.2)
        .from("[data-hero-line]", { yPercent: 110, stagger: 0.12, duration: 1 }, 0.32)
        .from("[data-hero-actions]", { y: 24, opacity: 0, duration: 0.9 }, 0.65)
        .from("[data-hero-strip]", { x: 50, opacity: 0, stagger: 0.08, duration: 1 }, 0.55)
        .from("[data-scroll-indicator]", { y: 12, opacity: 0, duration: 0.8 }, 1.15);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="ambient-grid noise relative min-h-screen overflow-hidden border-b border-white/10"
      id="top"
    >
      <div data-hero-bg className="absolute inset-0">
        <Image
          src={content.backgroundImage}
          alt="SOKKA atmospheric street scene"
          fill
          priority
          className="object-cover opacity-35 saturate-[0.8]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.15)_32%,rgba(5,5,5,0.9)_78%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.9)_0%,rgba(5,5,5,0.58)_40%,rgba(5,5,5,0.78)_100%)]" />
      </div>

      <div className="section-shell relative z-10 grid min-h-screen items-center gap-10 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-0">
        <div data-hero-copy className="relative max-w-xl self-center pt-16 lg:pt-20">
          <p className="eyebrow mb-5">{content.eyebrow}</p>
          <div className="overflow-hidden">
            <h1 data-hero-line className="display-line text-[4.5rem] leading-none sm:text-[6rem] lg:text-[8rem]">
              {content.headingTop}
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1
              data-hero-line
              className="display-line text-stroke -mt-2 text-[4.6rem] sm:text-[6.1rem] lg:text-[8.2rem]"
            >
              {content.headingBottom}
            </h1>
          </div>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/68 sm:text-base">
            {content.body}
          </p>

          <div data-hero-actions className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#products"
              className="rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-black transition hover:scale-[1.02]"
            >
              {content.primaryCta}
            </Link>
            <Link
              href="#story"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white/82 transition hover:border-white/40 hover:bg-white/6"
            >
              {content.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="relative flex min-h-[52vh] items-center justify-center lg:min-h-screen">
          <div className="absolute inset-x-0 top-1/2 h-[28rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,76,46,0.24)_0%,rgba(255,76,46,0)_72%)] blur-3xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[24rem] w-full max-w-[34rem] sm:h-[32rem] lg:h-[42rem]">
              <Canvas camera={{ position: [0, 0.4, 8], fov: 34 }} shadows dpr={[1, 1.75]}>
                <HeroScene />
              </Canvas>
            </div>
          </div>

          <div className="pointer-events-none absolute right-0 top-1/2 hidden w-36 -translate-y-1/2 gap-4 lg:flex lg:flex-col">
            {lookbook.map((image, index) => (
              <div
                key={image}
                data-hero-strip
                className={`relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 ${
                  index === 1 ? "ml-10 h-44" : "h-36"
                }`}
              >
                <Image
                  src={image}
                  alt="SOKKA lookbook portrait"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        data-scroll-indicator
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="eyebrow text-[0.62rem]">Scroll</span>
        <span className="relative h-14 w-7 rounded-full border border-white/18">
          <span className="absolute left-1/2 top-3 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white/80 motion-safe:animate-bounce" />
        </span>
      </div>
    </section>
  );
}
