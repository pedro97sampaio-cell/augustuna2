import Link from "next/link";
import Image from "next/image";

const navColumns = [
  {
    title: "Navegação",
    links: [
      { href: "/noticias", label: "Notícias" },
      { href: "/historia", label: "História" },
      { href: "/atuacoes/convite", label: "Atuações" },
      { href: "/loja", label: "Loja" },
      { href: "/contactos", label: "Contactos" },
    ],
  },
  {
    title: "Sobre Nós",
    links: [
      { href: "/historia", label: "História" },
      { href: "/traje", label: "Traje" },
      { href: "/membros", label: "Augustunos" },
      { href: "/magna-augusta", label: "Magna Augusta" },
    ],
  },
];

const socials = [
  { href: "https://www.youtube.com/@AugustunaTAUM", icon: "yt", label: "YouTube" },
  { href: "https://www.instagram.com/augustuna/", icon: "ig", label: "Instagram" },
  { href: "https://www.facebook.com/Augustuna96", icon: "fb", label: "Facebook" },
  { href: "https://open.spotify.com/artist/7339QO1cXY7kYpTfB4lq2p", icon: "sp", label: "Spotify" },
];

const sponsors = [
  { src: "/logotipos/UM LOGO.png", alt: "Universidade do Minho", href: "https://www.uminho.pt" },
  { src: "/logotipos/AAUM LOGO.png", alt: "AAUM", href: "https://www.aauminho.pt/" },
  { src: "/logotipos/CAMARA BRAGA LOGO.png", alt: "Câmara Municipal de Braga", href: "https://www.cm-braga.pt" },
  { src: "/logotipos/BRAGA PARQUE LOGO.png", alt: "Braga Parque", href: "https://bragaparque.pt/" },
  { src: "/logotipos/IPDJ LOGO.png", alt: "IPDJ", href: "https://ipdj.gov.pt" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/fotos/TESTE%20(1).png')] bg-cover bg-no-repeat bg-center opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <Image
                src="/images/logo.png"
                alt="Augustuna"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="font-serif text-sm font-semibold tracking-wide">
                AUGUSTUNA
              </span>
            </Link>
            <p className="text-white/40 text-xs leading-relaxed mb-4">
              Tuna Académica<br />da Universidade do Minho
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-white transition-colors text-xs"
                  aria-label={s.label}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
              Contacto
            </h4>
            <p className="text-sm text-white/60 mb-1">augustunataum@gmail.com</p>
            <Link href="/farricoco-runner" className="text-sm text-white/60 hover:text-secondary transition-colors">
              Campus de Gualtar, Braga
            </Link>
          </div>
        </div>

        {/* Sponsors */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <p className="text-center text-xs text-white/30 uppercase tracking-wider mb-6">
            Apoios & Parcerias
          </p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {sponsors.map((s) => (
              <a
                key={s.alt}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity"
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={120}
                  height={60}
                  className="object-contain opacity-50 hover:opacity-80 transition-opacity"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Augustuna — Tuna Académica da Universidade do Minho
          </p>
          <p className="text-xs text-white/25">
            Website feito por <a href="https://www.instagram.com/solumdesigns23" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-white transition-colors">Bare Studio</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
