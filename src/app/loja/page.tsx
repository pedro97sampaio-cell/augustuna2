import loja from "@/data/loja.json";
import ProductCard from "@/components/ProductCard";

export const metadata = { title: "Loja — Augustuna" };

export default function LojaPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero relative">
        <div className="absolute inset-0 bg-[url('/fotos/uunm.jpg')] bg-cover bg-[center_10%] opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="page-hero-label">Merchandising</span>
          <h1 className="page-hero-title">
            <span className="gold-accent">Loja</span>
          </h1>
          <p className="page-hero-subtitle">
            Leva um bocado da Augustuna contigo — edições comemorativas dos 30 anos
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {loja.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>

          {/* Info text */}
          <div className="mt-20 text-center">
            <p className="text-foreground/40 text-sm font-sans">
              Para encomendar, entra em contacto connosco através do{" "}
              <a href="mailto:augustunataum@gmail.com" className="text-primary hover:underline">
                email
              </a>{" "}
              ou das nossas redes sociais.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
