import Image from "next/image";
import institucional from "@/data/institucional.json";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = { title: "Traje — Augustuna" };

const hierarquiaImages = [
  "/images/traje_tuno.png",
  "/images/traje_detalhes.png",
  "/images/traje_grupo.png",
];

const hierarquiaIcons = ["school", "military_tech", "stars"];

export default function TrajePage() {
  return (
    <>
      {/* Hero — standard page-hero like other sections */}
      <section className="page-hero relative">
        <div className="absolute inset-0 bg-[url('/fotos/DSC_8481.jpg')] bg-cover bg-[center_15%] opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="page-hero-label">Tradição</span>
          <h1 className="page-hero-title">
            O <span className="gold-accent">Traje</span>
          </h1>
          <p className="page-hero-subtitle">
            A capa, as fitas e os emblemas — símbolos de pertença e história que
            cada tuno carrega com orgulho.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <ScrollReveal>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-6 leading-tight">
                Mais do que um <span className="gold-accent">uniforme</span>,
                uma identidade.
              </h2>
              <p className="text-foreground/60 leading-relaxed text-sm sm:text-base mb-4">
                O traje académico da Augustuna é o reflexo de décadas de
                tradição. Cada elemento — desde a capa negra até às fitas
                coloridas — conta uma história de amizade, música e boémia.
              </p>
              <p className="text-foreground/60 leading-relaxed text-sm sm:text-base">
                O traje é conquistado, nunca oferecido. Representa o percurso
                individual de cada membro e a sua dedicação à tuna.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl shadow-black/10">
              <Image
                src="/images/traje_detalhes.png"
                alt="Detalhes do traje — fitas e emblemas"
                fill
                className="object-cover"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Hierarchy — elegant cards with alternating layout */}
      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <span className="text-xs tracking-[0.3em] uppercase text-primary/40 font-sans mb-3 block">
              Percurso
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              A <span className="gold-accent">Hierarquia</span>
            </h2>
            <p className="text-foreground/50 mt-4 text-sm sm:text-base max-w-lg mx-auto">
              Na Augustuna, o percurso de cada membro é marcado por etapas que
              representam o seu crescimento dentro da tuna.
            </p>
          </div>

          <div className="space-y-20 md:space-y-28">
            {institucional.traje_hierarquia.map((posto, idx) => (
              <ScrollReveal key={posto.posto}>
                <div
                  className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                    idx % 2 !== 0 ? "md:[direction:rtl]" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="md:[direction:ltr]">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl group">
                      <Image
                        src={hierarquiaImages[idx]}
                        alt={posto.posto}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        quality={85}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                      {/* Step badge */}
                      <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white text-[10px] tracking-[0.2em] uppercase font-sans px-3 py-1.5 rounded-sm">
                        Etapa {idx + 1}
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="md:[direction:ltr]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="material-symbols-outlined text-secondary text-3xl">
                        {hierarquiaIcons[idx]}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                        {posto.posto}
                      </h3>
                    </div>
                    <div className="w-12 h-[2px] bg-secondary/40 mb-6" />
                    <p className="text-foreground/50 leading-relaxed text-sm sm:text-base">
                      {posto.descricao}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-background py-20 md:py-28 border-t border-primary/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Queres vestir o <span className="gold-accent">traje</span>?
          </h2>
          <p className="text-foreground/60 mb-8 text-sm sm:text-base">
            Junta-te à Augustuna e começa o teu percurso. A tradição espera por
            ti.
          </p>
          <a
            href="/contactos"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg text-sm tracking-[0.1em] font-semibold hover:bg-primary/90 transition-colors"
          >
            Junta-te a nós
          </a>
        </div>
      </section>
    </>
  );
}
