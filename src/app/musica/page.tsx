export const metadata = { title: "Reportório — Augustuna" };

const spotifyAlbums = [
  {
    title: "20 Anos",
    embedId: "3bYaRnT7yXwkMiozBzbWbZ",
  },
  {
    title: "VI Magna Augusta",
    embedId: "1iCzhaUVn3wxpZKUPLzJjC",
  },
];

export default function MusicaPage() {
  return (
    <>
      {/* Dark Hero */}
      <section className="page-hero relative">
        <div className="absolute inset-0 bg-[url('/fotos/sjoao.jpg')] bg-cover bg-[center_70%] opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="page-hero-label">Música</span>
          <h1 className="page-hero-title">
            O Nosso <span className="gold-accent">Reportório</span>
          </h1>
          <p className="page-hero-subtitle">
            Da tradição à irreverência — fados, marchas populares, temas originais e versões únicas que fazem vibrar palcos e ruas.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Cancioneiro Card */}
            <div className="flex flex-col items-start group">
              <div className="w-12 h-12 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Cancioneiro</h3>
              <p className="text-foreground/60 mb-8 flex-1">
                Explora as letras e acordes das nossas músicas. Leva a magia da Augustuna contigo e canta connosco.
              </p>
              <a 
                href="/Cancioneiro_Augustuna_3.1.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-btn !shadow-none text-[13px] !px-4 !py-1.5 !rounded-lg w-full sm:w-auto text-center"
              >
                Abrir Cancioneiro
              </a>
            </div>

            {/* YouTube Card */}
            <div className="flex flex-col items-start group">
              <div className="w-12 h-12 flex items-center justify-center text-red-600 mb-2 group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Braga Boémia</h3>
              <p className="text-foreground/60 mb-8 flex-1">
                Assiste ao videoclip oficial de um dos nossos maiores hinos. Uma homenagem à cidade de Braga e à vida de estudante.
              </p>
              <a 
                href="https://www.youtube.com/watch?v=MUCcxjgVBsw" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-btn !shadow-none text-[13px] !px-4 !py-1.5 !rounded-lg w-full sm:w-auto text-center"
              >
                Ver no YouTube
              </a>
            </div>
          </div>

          <div className="text-left mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              Ouve-nos no Spotify
            </h2>
            <p className="text-foreground/60 max-w-2xl">
              Acompanha os nossos álbuns e atuações ao vivo diretamente na tua plataforma de música favorita.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {spotifyAlbums.map((album) => (
              <div key={album.embedId} className="flex flex-col">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4 text-left">
                  {album.title}
                </h3>
                <div className="rounded-2xl overflow-hidden bg-transparent">
                  <iframe
                    src={`https://open.spotify.com/embed/album/${album.embedId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Spotify link */}
          <div className="text-center pt-12">
            <a
              href="https://open.spotify.com/intl-pt/artist/0kFalW9M0bBIOxvUwNgB6c"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors"
            >
              Ver perfil completo no Spotify 
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
