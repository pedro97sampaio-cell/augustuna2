import Link from "next/link";
import institucional from "@/data/institucional.json";
import AnimatedCounter from "@/components/AnimatedCounter";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = { title: "História — Augustuna" };

const stats = [
  { value: institucional.historia.estatisticas.anos, label: "Anos de História" },
  { value: institucional.historia.estatisticas.membros, label: "Membros" },
  { value: institucional.historia.estatisticas.atuacoes_estimadas, label: "Atuações" },
  { value: institucional.historia.estatisticas.paises_visitados, label: "Países" },
];

export default function HistoriaPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero relative">
        <div className="absolute inset-0 bg-[url('/fotos/Baile%20de%20Finalistas.jpg')] bg-cover bg-[center_5%] opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="page-hero-label">Sobre Nós</span>
          <h1 className="page-hero-title">
            A <span className="gold-accent">Formação</span>
          </h1>
          <p className="page-hero-subtitle">
            A história da fundação e evolução da Augustuna
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <ScrollReveal key={stat.label} className="text-center" style={{ transitionDelay: `${idx * 150}ms` }}>
              <div className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">
                <AnimatedCounter end={Number(stat.value) || 0} />+
              </div>
              <div className="text-sm text-foreground/40 font-sans uppercase tracking-wider">
                {stat.label}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Introduction text */}
      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-10">
            A Tradição que <span className="gold-accent">Desafia</span>
          </h2>
          {institucional.historia.introducao.map((p, i) => (
            <p
              key={i}
              className="text-foreground/55 leading-[1.8] mb-6 text-base font-sans"
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-surface">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-20 text-center">
            Cronologia
          </h2>
          <div className="relative">
            {/* Central line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary/10" />

            {institucional.historia.cronologia.map((entry, idx) => (
              <ScrollReveal
                key={entry.ano}
                className={`relative mb-20 last:mb-0 flex ${
                  idx % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                } flex-col`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-secondary border-2 border-surface z-10 mt-1.5" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${
                  idx % 2 === 0 ? "md:pr-14" : "md:pl-14"
                }`}>
                  <span className="font-serif text-xl font-bold text-secondary">
                    {entry.ano}
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-foreground mt-1 mb-3">
                    {entry.titulo}
                  </h3>
                  <p className="text-foreground/45 text-sm leading-relaxed">
                    {entry.descricao}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
