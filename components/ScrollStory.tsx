"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import type { StoryScene } from "@/config/siteConfig";

gsap.registerPlugin(ScrollTrigger);

type ScrollStoryProps = {
  scenes: readonly StoryScene[];
};

export function ScrollStory({ scenes }: ScrollStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-story-panel]");
      const images = gsap.utils.toArray<HTMLElement>("[data-story-image]");
      const words = gsap.utils.toArray<HTMLElement>("[data-story-word]");
      const captions = gsap.utils.toArray<HTMLElement>("[data-story-copy]");

      gsap.set(panels, { opacity: 0, y: 80 });
      gsap.set(images, { scale: 1.16 });
      gsap.set([words, captions], { opacity: 0, y: 40 });
      gsap.set(panels[0], { opacity: 1, y: 0 });
      gsap.set([words[0], captions[0]], { opacity: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 3.2}`,
          pin: true,
          scrub: 0.7
        }
      });

      panels.forEach((panel, index) => {
        tl.to(images[index], { scale: index === 0 ? 1.36 : 1.18, duration: 1.1 }, index === 0 ? 0 : "+=0.2")
          .to(words[index], { opacity: 1, y: 0, duration: 0.45 }, "<")
          .to(captions[index], { opacity: 1, y: 0, duration: 0.45 }, "<+0.12");

        if (index < panels.length - 1) {
          tl.to([words[index], captions[index]], { opacity: 0, y: -36, duration: 0.4 }, "+=0.55")
            .to(images[index], { scale: 1.32, opacity: 0.25, duration: 0.55 }, "<")
            .to(panel, { opacity: 0, y: -40, duration: 0.45 }, "<")
            .fromTo(
              panels[index + 1],
              { opacity: 0, y: 80 },
              { opacity: 1, y: 0, duration: 0.55 },
              "<+0.08"
            )
            .fromTo(
              images[index + 1],
              { scale: 1.24 },
              { scale: 1.04, duration: 0.6 },
              "<"
            );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative h-screen overflow-hidden border-b border-white/10 bg-black"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,76,46,0.16),transparent_35%),linear-gradient(180deg,#090909_0%,#040404_100%)]" />

      {scenes.map((scene, index) => (
        <article
          key={scene.word}
          data-story-panel
          className="absolute inset-0 flex items-center"
        >
          <div className="section-shell grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative order-2 lg:order-1">
              <div className="relative mx-auto aspect-[0.9] w-full max-w-[32rem] overflow-hidden rounded-[2rem] story-frame-shadow">
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background: `linear-gradient(180deg, transparent 0%, rgba(5,5,5,0.12) 55%, rgba(5,5,5,0.88) 100%), radial-gradient(circle at top left, ${scene.accent}55, transparent 32%)`
                  }}
                />
                <div data-story-image className="absolute inset-0">
                  <Image
                    src={scene.image}
                    alt={`${scene.word} by SOKKA`}
                    fill
                    className={`object-cover ${index === 0 ? "object-center" : "object-top"}`}
                  />
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="eyebrow mb-4">Chapter 0{index + 1}</p>
              <div className="overflow-hidden">
                <h2
                  data-story-word
                  className="display-line text-[4.6rem] sm:text-[6rem] lg:text-[8rem]"
                >
                  {scene.word}
                </h2>
              </div>
              <div data-story-copy className="max-w-lg">
                <p className="mt-5 text-xl leading-tight text-white/88 sm:text-2xl">
                  {scene.caption}
                </p>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/66 sm:text-base">
                  {scene.supporting}
                </p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
