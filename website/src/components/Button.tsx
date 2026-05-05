import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyle =
    "px-6 py-3 rounded-base font-sans font-medium transition-all duration-300 transform active:scale-95 select-none inline-flex justify-center items-center cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-primary-container text-white shadow-md hover:shadow-lg hover:from-primary-hover hover:to-primary",
    secondary:
      "bg-dourado text-white shadow-md hover:shadow-lg hover:brightness-110",
    outline:
      "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
