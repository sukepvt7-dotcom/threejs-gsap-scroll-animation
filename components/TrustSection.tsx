"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type TrustSectionProps = {
  proof: {
    title: string;
    description: string;
    logos: readonly string[];
    quotes: readonly string[];
  };
};

export function TrustSection({ proof }: TrustSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-proof-reveal]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative border-b border-white/10 py-24 sm:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div data-proof-reveal>
          <p className="eyebrow">Proof</p>
          <h2 className="display-line mt-4 text-[3.2rem] sm:text-[4.8rem] lg:text-[5.6rem]">
            {proof.title}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/64 sm:text-base">
            {proof.description}
          </p>
        </div>

        <div className="space-y-8">
          <div data-proof-reveal className="flex flex-wrap gap-3">
            {proof.logos.map((logo) => (
              <span
                key={logo}
                className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-white/55"
              >
                {logo}
              </span>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {proof.quotes.map((quote) => (
              <blockquote
                key={quote}
                data-proof-reveal
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-white/68"
              >
                {quote}
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
