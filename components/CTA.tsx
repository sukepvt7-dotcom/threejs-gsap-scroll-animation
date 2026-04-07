"use client";

import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type CTAProps = {
  content: {
    eyebrow: string;
    lineOne: string;
    lineTwo: string;
    action: string;
  };
};

export function CTA({ content }: CTAProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        }
      });

      tl.from("[data-cta-eyebrow]", { y: 18, opacity: 0, duration: 0.55 })
        .from("[data-cta-line]", { yPercent: 100, stagger: 0.12, duration: 1, ease: "power4.out" }, "-=0.1")
        .from("[data-cta-button]", { y: 20, opacity: 0, duration: 0.7 }, "-=0.45");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,76,46,0.28),transparent_35%),linear-gradient(180deg,#060606_0%,#030303_100%)]" />
      <div className="ambient-grid absolute inset-0" />
      <div className="section-shell relative z-10 flex min-h-screen flex-col items-center justify-center py-24 text-center">
        <p data-cta-eyebrow className="eyebrow mb-6">{content.eyebrow}</p>
        <div className="space-y-1">
          <div className="overflow-hidden">
            <h2 data-cta-line className="display-line text-[4.1rem] sm:text-[6rem] lg:text-[8rem]">
              {content.lineOne}
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 data-cta-line className="display-line text-stroke text-[4.1rem] sm:text-[6rem] lg:text-[8rem]">
              {content.lineTwo}
            </h2>
          </div>
        </div>
        <Link
          data-cta-button
          href="#top"
          className="mt-10 rounded-full border border-white/12 bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.26em] text-black transition hover:scale-[1.02]"
        >
          {content.action}
        </Link>
      </div>
    </section>
  );
}
