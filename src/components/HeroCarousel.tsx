"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    image: "/images/hero_bg_new.jpg",
    alt: "Augustuna em concerto",
    headline: "30 Anos de\nTradição e Boémia",
    subtitle: "multi sunt vocati pauci vero electi",
    ctas: [
      { label: "Descobre a Augustuna", href: "/historia", style: "outline" as const },
      { label: "Contrata-nos", href: "/contrata-nos", style: "solid" as const },
    ],
  },
  {
    image: "/images/Augustuna_Taipam_VII_Magna.jpg",
    alt: "Augustuna na VII Magna Augusta",
    headline: "Ensaios Todas\nas Semanas",
    subtitle: "2ª e 5ª feiras às 21h · Sala de baixo do BA",
    ctas: [
      { label: "Junta-te a nós", href: "/contactos", style: "solid" as const },
      { label: "Sabe mais", href: "/historia", style: "outline" as const },
    ],
  },
];

const INTERVAL = 16000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // 0=initial, 1=forward, -1=back

  const goTo = useCallback(
    (idx: number) => {
      if (idx === current) return;
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
    },
    [current]
  );

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-screen w-full bg-[#0a0a0f] overflow-hidden">
      {/* Background images — stacked with crossfade */}
      {slides.map((s, i) => (
        <div
          key={s.image}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={s.image}
            alt={s.alt}
            fill
            className={`object-cover object-[center_top] sm:object-center ${
              i === current ? "animate-zoom-pan" : "scale-105"
            }`}
            priority={i === 0}
            quality={90}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient overlays for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/60 sm:from-black/80 sm:via-black/20 sm:to-black/40 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent sm:from-black/50 sm:via-transparent sm:to-transparent pointer-events-none z-[1]" />

      {/* Content — bottom-left, like Nickel reference */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end px-8 sm:px-14 md:px-20 lg:px-28 pb-20 sm:pb-24 md:pb-28">
        {/* Headline */}
        <h1
          key={`h-${current}`}
          className="font-serif text-[2.2rem] sm:text-[3rem] md:text-[3.8rem] lg:text-[4.5rem] font-bold text-white leading-[1.08] tracking-tight mb-4 md:mb-5 max-w-3xl animate-hero-slide-up whitespace-pre-line"
        >
          {slide.headline.split(/(\d+)/).map((part, i) => 
            /\d+/.test(part) ? (
              <span key={i} className="font-sans tracking-tighter" style={{ fontVariantNumeric: "lining-nums" }}>{part}</span>
            ) : part
          )}
        </h1>

        {/* Subtitle */}
        <p
          key={`s-${current}`}
          className="font-serif italic text-white/60 text-sm sm:text-base md:text-lg tracking-[0.04em] mb-8 md:mb-10 max-w-lg animate-hero-slide-up-delay"
        >
          {slide.subtitle}
        </p>

        {/* CTAs — bottom, inline */}
        <div
          key={`c-${current}`}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-hero-slide-up-delay-2"
        >
          {slide.ctas.map((cta) => (
            <Link
              key={cta.label}
              href={cta.href}
              className={`
                inline-flex items-center justify-center !px-6 !py-2.5 rounded-xl text-[15px] font-semibold transition-all duration-300
                ${
                  cta.style === "solid"
                    ? "glass-btn-gold"
                    : "glass-btn"
                }
              `}
              style={{ textTransform: "none" }}
            >
              {cta.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Pagination dots — bottom right */}
      <div className="absolute bottom-10 right-8 sm:right-14 md:right-20 lg:right-28 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className={`transition-all duration-500 cursor-pointer rounded-full ${
              i === current
                ? "w-3 h-3 bg-secondary shadow-[0_0_8px_rgba(210,153,72,0.5)]"
                : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
