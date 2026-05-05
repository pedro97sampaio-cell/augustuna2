"use client";

import { useState, useMemo } from "react";
import membros from "@/data/membros.json";

const allMembers = membros.geracoes.flatMap((gen) =>
  gen.elementos.map((m) => ({ ...m, geracao: gen.nome }))
);

// Extract unique filter values
const geracoes = membros.geracoes.map((g) => g.nome);
const instrumentos = [...new Set(allMembers.map((m) => m.instrumento))].sort();

export default function MembrosPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGeracao, setSelectedGeracao] = useState<string>("Todas");
  const [selectedInstrumento, setSelectedInstrumento] = useState<string>("Todos");

  const filteredMembers = useMemo(() => {
    return allMembers.filter((m) => {
      const matchesSearch =
        searchQuery === "" ||
        m.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.alcunha && m.alcunha.toLowerCase().includes(searchQuery.toLowerCase())) ||
        m.instrumento.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.curso.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesGeracao =
        selectedGeracao === "Todas" || m.geracao === selectedGeracao;

      const matchesInstrumento =
        selectedInstrumento === "Todos" || m.instrumento === selectedInstrumento;

      return matchesSearch && matchesGeracao && matchesInstrumento;
    });
  }, [searchQuery, selectedGeracao, selectedInstrumento]);

  // Group filtered members by generation
  const groupedMembers = useMemo(() => {
    const groups: Record<string, typeof allMembers> = {};
    filteredMembers.forEach((m) => {
      if (!groups[m.geracao]) groups[m.geracao] = [];
      groups[m.geracao].push(m);
    });
    // Maintain original order
    return geracoes
      .filter((g) => groups[g])
      .map((g) => ({ nome: g, elementos: groups[g] }));
  }, [filteredMembers]);

  return (
    <>
      {/* Hero */}
      <section className="page-hero relative">
        <div className="absolute inset-0 bg-[url('/fotos/xxv_fitab-53.jpg')] bg-cover bg-[center_25%] opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="page-hero-label">A Família</span>
          <h1 className="page-hero-title">
            Os <span className="gold-accent">Augustunos</span>
          </h1>
          <p className="page-hero-subtitle">
            {membros.geracoes.length} gerações de músicos, boémios e amigos
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-10 bg-surface sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6">
          {/* Search bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Procurar por nome, alcunha, instrumento ou curso..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-background border border-primary/10 text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/5 transition-all"
            />
          </div>

          {/* Filter pills */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Generation filter */}
            <div className="flex-1">
              <label className="text-xs text-foreground/40 uppercase tracking-wider mb-2 block font-sans">
                Geração
              </label>
              <select
                value={selectedGeracao}
                onChange={(e) => setSelectedGeracao(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-background border border-primary/10 text-foreground text-sm focus:outline-none focus:border-primary/30 transition-all cursor-pointer"
              >
                <option value="Todas">Todas as gerações</option>
                {geracoes.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Instrument filter */}
            <div className="flex-1">
              <label className="text-xs text-foreground/40 uppercase tracking-wider mb-2 block font-sans">
                Instrumento
              </label>
              <select
                value={selectedInstrumento}
                onChange={(e) => setSelectedInstrumento(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-background border border-primary/10 text-foreground text-sm focus:outline-none focus:border-primary/30 transition-all cursor-pointer"
              >
                <option value="Todos">Todos os instrumentos</option>
                {instrumentos.map((inst) => (
                  <option key={inst} value={inst}>
                    {inst}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="mt-4 text-xs text-foreground/30">
            {filteredMembers.length} membro{filteredMembers.length !== 1 ? "s" : ""} encontrado{filteredMembers.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* Member listing */}
      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto px-6 space-y-24">
          {groupedMembers.length === 0 ? (
            <p className="text-center text-foreground/40 font-sans py-20">
              Nenhum membro encontrado com os filtros selecionados.
            </p>
          ) : (
            groupedMembers.map((gen) => (
              <div key={gen.nome}>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                  {gen.nome}
                </h2>
                <div className="w-12 h-0.5 bg-secondary mb-10" />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
                  {gen.elementos.map((membro, idx) => (
                    <div key={idx} className="group flex flex-col">
                      {/* Photo Placeholder/Image */}
                      <div className="aspect-square bg-surface rounded-2xl mb-4 overflow-hidden border border-primary/5 flex items-center justify-center relative">
                        {/* 
                          When pictures are added to membros.json as "foto": "/images/membros/nome.jpg",
                          an <img src={membro.foto} ... /> could be rendered here safely.
                        */}
                        {/* @ts-ignore : allow potential future typing without crashing */}
                        {membro.foto ? (
                          <img
                            // @ts-ignore
                            src={membro.foto}
                            alt={membro.nome}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <span className="text-5xl opacity-10 group-hover:scale-110 transition-transform duration-500">
                            👤
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-col flex-1">
                        <p className="font-serif text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                          {membro.alcunha ? `"${membro.alcunha}"` : membro.nome}
                        </p>
                        <p className="text-sm text-foreground/45 mt-0.5 mb-2 line-clamp-1">
                          {membro.nome}
                        </p>
                        
                        <div className="flex-1" />
                        
                        <div className="flex flex-col gap-1 text-xs text-foreground/40 mt-auto">
                          <p className="font-medium text-primary/60">{membro.instrumento}</p>
                          <p className="truncate">{membro.curso}</p>
                          {membro.evento && (
                            <p className="text-secondary/60 mt-1">
                              {membro.evento}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
