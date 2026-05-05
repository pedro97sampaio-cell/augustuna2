"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";

const navLinks = [
  { href: "/noticias", label: "Notícias" },
  {
    label: "Sobre Nós",
    children: [
      { href: "/historia", label: "História" },
      { href: "/traje", label: "Traje" },
      { href: "/membros", label: "Augustunos" },
      { href: "/musica", label: "Reportório" },
      { href: "/magna-augusta", label: "Magna Augusta" },
      { href: "/festa-semina", label: "Festa do Semina" },
    ],
  },
  {
    label: "Atuações",
    children: [
      { href: "/atuacoes/concurso", label: "Festivais a concurso" },
      { href: "/atuacoes/convite", label: "Festivais a convite" },
      { href: "/atuacoes/outras", label: "Outras Atuações" },
    ],
  },
  { href: "/loja", label: "Loja" },
  { href: "/contactos", label: "Contactos" },
];

export default function Navigation() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Determine colors based on context
  const headerBg = scrolled
    ? "bg-primary/95 backdrop-blur-lg shadow-lg border border-white/10"
    : "bg-primary/80 backdrop-blur-md shadow-md border border-white/5";
  
  const textColor = "text-white/90";
  const textHover = "hover:text-white hover:bg-white/10";
  const logoColor = "text-white";
  const activeColor = "text-white bg-white/10 shadow-inner border border-white/10";

  if (pathname === "/farricoco-runner") return null;

  return (
    <header className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-5rem)] lg:w-[calc(100%-14rem)] max-w-[1600px] z-50 transition-all duration-500 rounded-2xl ${headerBg}`}>
      <nav className={`px-6 py-3 flex flex-col justify-center`}>
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="group">
            <span
              className={`font-serif text-base font-semibold tracking-[0.15em] transition-colors duration-300 ${logoColor}`}
            >
              AUGUSTUNA
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-0.5 h-full">
            {navLinks.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative group h-full flex items-center"
                >
                  <button
                    className={`px-3.5 py-1.5 text-[13px] font-medium flex items-center gap-1 rounded-lg transition-all duration-300 ${
                      item.children.some((child) => pathname === child.href) ? activeColor : `${textColor} ${textHover}`
                    }`}
                  >
                    {item.label}
                    <svg
                      className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {/* Invisible padding area to prevent hover gap issues */}
                  <div className="absolute top-[80%] left-0 pt-4 w-52 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 origin-top">
                    <div className="rounded-xl bg-primary/95 backdrop-blur-xl shadow-xl border border-white/10 py-1.5 overflow-hidden">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2.5 text-[13px] transition-all duration-200 ${
                            pathname === child.href
                              ? "text-white font-semibold bg-white/20 border-l-2 border-secondary"
                              : "text-white/80 hover:text-white hover:bg-white/10 hover:pl-5 border-l-2 border-transparent"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div key={item.href} className="h-full flex items-center">
                  <Link
                    href={item.href!}
                    className={`px-3.5 py-1.5 text-[13px] font-medium rounded-lg transition-all duration-300 ${
                      pathname === item.href
                        ? activeColor
                        : `${textColor} ${textHover}`
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              )
            )}

            {/* Divider */}
            <div className="w-px h-4 mx-2 bg-white/20" />

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`p-1.5 rounded-lg transition-all duration-300 flex items-center justify-center relative ${textColor} ${textHover}`}
              title="Carrinho"
            >
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-secondary text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-surface">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              href="/contrata-nos"
              className="ml-3 glass-btn text-[13px] !px-4 !py-1.5 !rounded-lg"
            >
              Contrata-nos
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors text-white hover:bg-white/10`}
            aria-label="Menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-screen border-t border-white/10 mt-4" : "max-h-0"
          }`}
        >
          <div className="px-2 py-4 space-y-1">
            {navLinks.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )
                    }
                    className="w-full flex items-center justify-between py-2.5 text-sm font-medium text-white/90"
                  >
                    {item.label}
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === item.label && (
                    <div className="pl-4 space-y-1 pb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => {
                            setMobileOpen(false);
                            setOpenDropdown(null);
                          }}
                          className="block py-2 text-sm text-white/70 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 text-sm font-medium text-white/90 hover:text-white"
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/contrata-nos"
              onClick={() => setMobileOpen(false)}
              className="glass-btn w-full text-sm mt-4 !py-3 !rounded-xl text-center flex items-center justify-center"
            >
              Contrata-nos
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
