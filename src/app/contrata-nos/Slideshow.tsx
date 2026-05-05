"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Service {
  title: string;
  desc: string;
  image: string;
}

const services: Service[] = [
  {
    title: "Animação de Festas",
    desc: "Animação musical para tornar o teu evento inesquecível. Casamentos, aniversários, batizados e celebrações.",
    image: "/fotos/casa.JPG",
  },
  {
    title: "Eventos Corporativos",
    desc: "Entretenimento cultural para empresas e organizações. Jantares de gala, inaugurações e team building.",
    image: "/fotos/sjoao.jpg",
  },
  {
    title: "Festivais & Espetáculos",
    desc: "Participação em festivais de tunas, saraus culturais e eventos musicais regionais e internacionais.",
    image: "/fotos/xxv_fitab-53.jpg",
  },
  {
    title: "Serenatas",
    desc: "A magia de uma serenata ao luar — perfeita para pedidos de casamento, aniversários especiais ou momentos únicos.",
    image: "/fotos/porto.jpg",
  },
];

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  // Automatic sliding removed as requested

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 md:px-16">
      {/* Slideshow Container */}
      <div className="relative group">
        <div className="relative overflow-hidden h-[500px] md:h-[500px] w-full flex items-center justify-center">
          {services.map((service, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col md:flex-row items-center gap-8 md:gap-16 px-6 md:px-12 transition-opacity duration-500 ease-in-out ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 h-[220px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl relative shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Content */}
              <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
                <h3 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6">
                  {service.title}
                </h3>
                <p className="text-foreground/70 text-lg md:text-xl leading-relaxed">
                  {service.desc}
                </p>
                <div className="mt-8">
                  <span className="w-16 h-1 bg-secondary inline-block rounded-full"></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-white text-primary shadow-xl transition-all hover:bg-primary hover:text-white hover:scale-110 border border-primary/10"
          aria-label="Anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-white text-primary shadow-xl transition-all hover:bg-primary hover:text-white hover:scale-110 border border-primary/10"
          aria-label="Próximo"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators — outside the container */}
      <div className="flex justify-center gap-2 mt-8">
        {services.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? "bg-primary w-8" : "bg-primary/20 hover:bg-primary/50"
            }`}
            aria-label={`Ir para o slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
