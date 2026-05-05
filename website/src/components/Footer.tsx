import React from "react";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Branding */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4 text-dourado">
              Augustuna
            </h3>
            <p className="text-white/70 text-sm leading-relaxed font-sans">
              Tuna Académica da Universidade do Minho. Tradição, boémia e música
              desde a nossa fundação.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-widest mb-4 text-dourado">
              Navegação
            </h4>
            <ul className="space-y-3">
              {["Sobre", "História", "Notícias", "Galeria", "Loja", "Contactos"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-sm text-white/60 hover:text-white transition-colors font-sans"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h4 className="font-sans text-sm font-semibold uppercase tracking-widest mb-4 text-dourado">
              Contactos
            </h4>
            <div className="space-y-3 text-sm text-white/60 font-sans">
              <p>Universidade do Minho, Braga</p>
              <p>augustuna@gmail.com</p>
            </div>
            <div className="flex gap-4 mt-6">
              {/* Social icons placeholder — will use real SVGs later */}
              {["Facebook", "Instagram", "YouTube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs text-white/40 hover:text-dourado transition-colors uppercase tracking-wider font-sans"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40 font-sans">
            © {new Date().getFullYear()} Augustuna. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/30 font-sans italic">
            Tradição · Boémia · Música
          </p>
        </div>
      </div>
    </footer>
  );
}
