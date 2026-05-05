import noticias from "@/data/noticias.json";

export const metadata = { title: "Notícias — Augustuna" };

const categoryLabel: Record<string, string> = {
  recrutamento: "Recrutamento",
  premio: "Prémio",
  cultura: "Cultura",
};

export default function NoticiasPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="page-hero-label">Atualidade</span>
          <h1 className="page-hero-title">
            <span className="gold-accent">Notícias</span>
          </h1>
          <p className="page-hero-subtitle">
            As últimas novidades do mundo augustunense
          </p>
        </div>
      </section>

      {/* News list */}
      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto px-6 space-y-16">
          {noticias.map((noticia) => (
            <article key={noticia.id} className="group">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                      {categoryLabel[noticia.categoria] || noticia.categoria}
                    </span>
                    <span className="w-px h-3 bg-foreground/10" />
                    <span className="text-xs text-foreground/40">{noticia.data}</span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors">
                    {noticia.titulo}
                  </h2>
                  <p className="text-foreground/50 leading-relaxed">
                    {noticia.corpo}
                  </p>
                </div>
                
                {/* Image Placeholder / Space */}
                <div className="w-full md:w-48 lg:w-56 aspect-[4/3] rounded-2xl bg-surface border border-primary/5 flex-shrink-0 overflow-hidden relative flex items-center justify-center">
                  {/* @ts-ignore : assume next updates to JSON will append .imagem */}
                  {noticia.imagem ? (
                    <img 
                      // @ts-ignore
                      src={noticia.imagem} 
                      alt={noticia.titulo}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-4xl opacity-5 group-hover:scale-110 transition-transform duration-500">
                      📰
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-12 w-full h-px bg-foreground/5" />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
