"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out after 2.2s
    const fadeTimer = setTimeout(() => setFadeOut(true), 2200);
    // Remove from DOM after fade completes
    const removeTimer = setTimeout(() => setVisible(false), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#00264d] transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Radial glow background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(210,153,72,0.15)_0%,transparent_70%)] animate-pulse" />
      </div>

      {/* Logo with reveal animation */}
      <div className="relative z-10 animate-loading-logo">
        <Image
          src="/images/logo_augustuna_new.png"
          alt="Augustuna"
          width={100}
          height={100}
          className="object-contain drop-shadow-[0_0_30px_rgba(210,153,72,0.4)]"
          priority
        />
      </div>

      {/* Text reveal */}
      <div className="relative z-10 mt-6 overflow-hidden">
        <h2 className="font-display text-2xl sm:text-3xl text-white tracking-[0.3em] uppercase animate-loading-text">
          AUGUSTUNA
        </h2>
      </div>

      {/* Elegant loading bar */}
      <div className="relative z-10 mt-8 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-secondary/80 via-secondary to-secondary/80 rounded-full animate-loading-bar" />
      </div>


    </div>
  );
}
