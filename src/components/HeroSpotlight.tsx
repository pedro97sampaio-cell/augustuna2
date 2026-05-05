"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroSpotlight() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 animate-zoom-pan">
        {/* Base Black and White Layer */}
        <Image
          src="/images/hero_bg.jpeg"
          alt="Augustuna Background Grayscale"
          fill
          className="object-cover object-center grayscale opacity-80"
          priority
          quality={90}
        />

        {/* Colored Spotlight Layer */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: mounted ? 1 : 0,
            WebkitMaskImage: `radial-gradient(circle 450px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`,
            maskImage: `radial-gradient(circle 450px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`,
          }}
        >
          <Image
            src="/images/hero_bg.jpeg"
            alt="Augustuna Background Color"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
        </div>
      </div>
      
      {/* Semi-transparent light overlay to ensure text contrast */}
      <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] pointer-events-none transition-colors duration-500"></div>

      {/* SVG Cross Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cross-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 28v4M28 30h4" stroke="#00336c" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cross-pattern)" />
      </svg>

      {/* Subtle ambient glow behind center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none"
      />
    </div>
  );
}
