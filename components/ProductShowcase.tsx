"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import type { Product } from "@/config/siteConfig";
import { ProductCard } from "@/components/ProductCard";

gsap.registerPlugin(ScrollTrigger);

type ProductShowcaseProps = {
  products: readonly Product[];
};

export function ProductShowcase({ products }: ProductShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-products-heading]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        },
        y: 40,
        opacity: 0,
        duration: 1
      });

      gsap.from("[data-product-card]", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 62%"
        },
        y: 70,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="products" className="relative border-b border-white/10 py-24 sm:py-32">
      <div className="section-shell">
        <div data-products-heading className="max-w-2xl">
          <p className="eyebrow">Selected Drop</p>
          <h2 className="display-line mt-4 text-[3.5rem] sm:text-[5rem] lg:text-[6.5rem]">
            Product Architecture.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/64 sm:text-base">
            Engineered graphics, premium cotton weight, and silhouettes designed to hold their shape while the detail does the talking.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {products.map((product, index) => (
            <div key={product.name} data-product-card>
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
