import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
}

export function Card({ children, className = "", elevated = false }: CardProps) {
  return (
    <div
      className={`rounded-base p-6 bg-surface-low transition-all duration-300 ${
        elevated ? "shadow-md hover:shadow-xl" : "shadow-sm"
      } ${className}`}
    >
      {children}
    </div>
  );
}
