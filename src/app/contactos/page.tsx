import contactos from "@/data/contactos.json";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";

export const metadata = { title: "Contactos — Augustuna" };

export default function ContactosPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero relative">
        <div className="absolute inset-0 bg-[url('/fotos/umdicas.jpeg')] bg-cover bg-[center_25%] opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="page-hero-label">Fala Connosco</span>
          <h1 className="page-hero-title">
            <span className="gold-accent">Contactos</span>
          </h1>
          <p className="page-hero-subtitle">
            Entra em contacto connosco — estamos sempre disponíveis para ti
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-col gap-16 lg:gap-24">
            
            {/* Top Section: Socials & Info */}
            <div className="flex flex-col gap-12">
              {/* Socials */}
              <div className="w-full flex flex-col items-start justify-start text-left mb-4">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
                  Segue-nos nas <span className="gold-accent">Redes Sociais</span>
                </h2>
                <div className="flex flex-wrap gap-8 justify-start">
                  {Object.entries(contactos.redes_sociais).map(([name, url]) => {
                    const socialConfig: Record<string, { icon: React.ReactNode }> = {
                      youtube: {
                        icon: (
                          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                          </svg>
                        )
                      },
                      instagram: {
                        icon: (
                          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                          </svg>
                        )
                      },
                      facebook: {
                        icon: (
                          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                          </svg>
                        )
                      },
                      linkedin: {
                        icon: (
                          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                          </svg>
                        )
                      },
                      spotify: {
                        icon: (
                          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.3 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.72 12.9c.36.181.54.841.24 1.14zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.54-1.02.72-1.56.42z" />
                          </svg>
                        )
                      }
                    };

                    const cfg = socialConfig[name.toLowerCase()] || { icon: <span className="text-2xl font-bold">{name[0]}</span> };

                    return (
                      <a
                        key={name}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-3"
                      >
                        <div className="text-secondary group-hover:text-primary transition-all duration-300 group-hover:scale-110">
                          {cfg.icon}
                        </div>
                        <span className="text-sm font-bold text-foreground/70 group-hover:text-foreground capitalize transition-colors">
                          {name}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* General Info */}
              <div className="w-full flex flex-col items-start text-left border-t border-primary/10 pt-12">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Informação Geral
                </h2>
                <div className="flex flex-col gap-6 text-foreground/70 text-sm w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1 sm:gap-4 items-baseline">
                    <span className="text-secondary font-bold uppercase tracking-widest text-[10px]">Email</span>
                    <a href={`mailto:${contactos.informacoes_gerais.email}`} className="text-primary hover:text-secondary transition-colors text-base">
                      {contactos.informacoes_gerais.email}
                    </a>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1 sm:gap-4 items-baseline">
                    <span className="text-secondary font-bold uppercase tracking-widest text-[10px]">Telefone</span>
                    <a href={`tel:${contactos.informacoes_gerais.telefone}`} className="hover:text-primary transition-colors text-base">
                      {contactos.informacoes_gerais.telefone}
                    </a>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-1 sm:gap-4 items-start">
                    <span className="text-secondary font-bold uppercase tracking-widest text-[10px] pt-1">Morada</span>
                    <span className="text-base leading-relaxed">Universidade do Minho<br />Campus de Gualtar, Braga</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
                Deixa-nos uma mensagem
              </h2>
              <ContactForm />
            </div>

            {/* Direção */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
                Direção
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
                {contactos.dirigentes.map((d, i) => (
                  <div key={i} className="group flex flex-col text-center sm:text-left">
                    <div className="aspect-square bg-surface rounded-2xl mb-4 overflow-hidden border border-primary/5 flex items-center justify-center relative w-full">
                      {(d as any).imagem ? (
                        <Image src={(d as any).imagem} alt={d.nome} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <span className="text-5xl opacity-10 group-hover:scale-110 transition-transform duration-500">
                          👤
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-col flex-1">
                      <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">
                        {d.cargo}
                      </p>
                      <p className="font-serif text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {d.nome}
                      </p>
                      
                      <div className="flex-1" />
                      
                      <div className="flex flex-col gap-1 mt-auto pt-2">
                        <a
                          href={`tel:${d.telefone}`}
                          className="text-sm text-foreground/50 hover:text-primary transition-colors block"
                        >
                          {d.telefone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden h-[400px] w-full shadow-lg border border-primary/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2983.7!2d-8.3969!3d41.5608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd24fee57cb424d3%3A0x884eb8e2b42b2!2sUniversidade%20do%20Minho%20-%20Campus%20de%20Gualtar!5e0!3m2!1spt-PT!2spt!4v1710000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
