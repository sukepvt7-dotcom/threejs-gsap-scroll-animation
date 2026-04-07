"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

import type { Product } from "@/config/siteConfig";

type ProductCardProps = {
  product: Product;
  index: number;
};

export function ProductCard({ product, index }: ProductCardProps) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  return (
    <article
      className="group perspective-2000"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        setTilt({
          rotateX: (0.5 - y) * 12,
          rotateY: (x - 0.5) * 14
        });
      }}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
    >
      <div
        className="preserve-3d relative rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 transition duration-500"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(255,76,46,0.18),transparent_62%)] opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />

        <div className="relative aspect-[0.84] w-full overflow-hidden rounded-[1.5rem] bg-[#0e0e0e]">
          <div className="preserve-3d relative h-full w-full transition duration-700 group-hover:[transform:rotateY(180deg)]">
            <div className="backface-hidden absolute inset-0">
              <Image
                src={product.frontImage}
                alt={`${product.name} front view`}
                fill
                className={clsx(
                  "object-cover transition duration-700 group-hover:scale-[1.03]",
                  index === 1 ? "object-center" : "object-top"
                )}
              />
            </div>
            <div className="backface-hidden absolute inset-0 [transform:rotateY(180deg)]">
              <Image
                src={product.backImage}
                alt={`${product.name} reverse view`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-white/46">{product.tag}</p>
            <h3 className="mt-2 font-display text-3xl uppercase tracking-[0.08em] text-white">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-white/64">{product.price}</p>
          </div>
          <button className="rounded-full border border-white/12 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white transition hover:border-white/35 hover:bg-white/8">
            Own This
          </button>
        </div>
      </div>
    </article>
  );
}
