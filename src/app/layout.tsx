import type { Metadata } from "next";
import { Raleway, PT_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import CartSidebar from "@/components/CartSidebar";
import LoadingScreen from "@/components/LoadingScreen";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Augustuna — Tuna Académica da Universidade do Minho",
  description:
    "Augustuna – Tuna Académica Masculina da Universidade do Minho. 30 anos de tradição, música e boémia desde 1996.",
  keywords:
    "Augustuna, Tuna Académica, Universidade do Minho, Braga, música académica, tuna masculina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${raleway.variable} ${ptSans.variable} ${playfair.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-surface text-foreground antialiased">
        <LoadingScreen />
        <CartProvider>
          <Navigation />
          <CartSidebar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
