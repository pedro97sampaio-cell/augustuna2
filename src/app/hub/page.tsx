import Link from "next/link";

export const metadata = { title: "Augustuna Hub — Administração" };

export default function HubPage() {
  const adminSections = [
    {
      title: "Eventos Institucionais",
      description: "Gerir Magna Augusta e Festa do Semina, adicionar edições, cartazes e prémios.",
      icon: "🎭",
      href: "/hub/eventos",
    },
    {
      title: "Loja Augustuna",
      description: "Adicionar ou editar produtos, gerir tamanhos e stock.",
      icon: "🛍️",
      href: "/hub/loja",
    },
    {
      title: "Notícias",
      description: "Escrever novos artigos e atualizar novidades da tuna.",
      icon: "📰",
      href: "/hub/noticias",
    },
    {
      title: "Membros e Direção",
      description: "Atualizar a constituição da tuna e membros da direção.",
      icon: "👥",
      href: "/hub/membros",
    },
    {
      title: "Atuações",
      description: "Adicionar datas e locais de futuras atuações e histórico.",
      icon: "🎸",
      href: "/hub/atuacoes",
    },
    {
      title: "Configurações",
      description: "Definições gerais do site, redes sociais e contactos.",
      icon: "⚙️",
      href: "/hub/configuracoes",
    },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="page-hero-label">Administração</span>
          <h1 className="page-hero-title">
            Augustuna <span className="gold-accent">Hub</span>
          </h1>
          <p className="page-hero-subtitle">
            Painel de controlo para gestão de conteúdos e elementos do site.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adminSections.map((section, idx) => (
              <Link key={idx} href={section.href}>
                <div className="group h-full bg-surface border border-primary/10 hover:border-primary/30 rounded-[2rem] p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md">
                  <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-3xl transition-colors group-hover:bg-primary/10">
                    {section.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
