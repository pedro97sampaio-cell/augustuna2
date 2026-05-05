import Link from "next/link";
import Slideshow from "./Slideshow";

export const metadata = { title: "Contrata-nos — Augustuna" };

export default function ContrataNosPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero relative">
        <div className="absolute inset-0 bg-[url('/fotos/buba.jpg')] bg-cover bg-[center_25%] opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="page-hero-label">Agende Já</span>
          <h1 className="page-hero-title">
            Contrata a <span className="gold-accent">Augustuna</span>
          </h1>
          <p className="page-hero-subtitle">
            Leva a magia da música académica ao teu evento
          </p>
        </div>
      </section>

      {/* Services Slideshow */}
      <section className="section-padding bg-background pb-10">
        <div className="px-6">
          <Slideshow />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-3">
            Interessado?
          </h2>
          <p className="text-white/60 mb-8 text-sm">
            Entra em contacto e vamos tornar o teu evento inesquecível.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:augustunataum@gmail.com"
              className="glass-btn-gold inline-flex items-center justify-center text-sm px-8 py-3.5 rounded-lg tracking-[0.1em] font-semibold"
            >
              Enviar email
            </a>
            <Link href="/contactos" className="glass-btn inline-flex items-center justify-center text-sm px-8 py-3.5 rounded-lg tracking-[0.1em] font-semibold">
              Ver contactos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
