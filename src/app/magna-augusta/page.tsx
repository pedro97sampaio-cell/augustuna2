"use client";

import { useState } from "react";
import institucional from "@/data/institucional.json";
import eventos from "@/data/eventos.json";

const { magna_augusta } = institucional.eventos_institucionais;
const magnaEditions = eventos.magna_augusta;

export default function MagnaAugustaPage() {
  const [selectedEditionIdx, setSelectedEditionIdx] = useState(0);
  const selectedEdition = magnaEditions[selectedEditionIdx];

  return (
    <>
      {/* Hero */}
      <section className="page-hero relative">
        <div className="absolute inset-0 bg-[url('/fotos/mg.jpg')] bg-cover bg-[center_60%] opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="page-hero-label">Evento Institucional</span>
          <h1 className="page-hero-title">
            <span className="gold-accent">{magna_augusta.nome}</span>
          </h1>
          <p className="page-hero-subtitle">
            {magna_augusta.subtitulo}
          </p>
        </div>
      </section>

      {/* Dropdown Filter & Content */}
      <section className="section-padding bg-background min-h-[50vh]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12 flex flex-col sm:flex-row items-center gap-4 border-b border-primary/10 pb-8">
            <label className="font-serif text-lg text-foreground font-semibold">
              Selecionar Edição:
            </label>
            <select
              value={selectedEditionIdx}
              onChange={(e) => setSelectedEditionIdx(Number(e.target.value))}
              className="flex-1 max-w-xs px-4 py-2 rounded-xl bg-transparent border border-primary/20 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-all cursor-pointer"
            >
              {magnaEditions.map((ed, idx) => (
                <option key={idx} value={idx}>
                  Edição {ed.edicao} ({ed.ano})
                </option>
              ))}
            </select>
          </div>

          <div className="animate-fade-in">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              Edição {selectedEdition.edicao} <span className="text-primary/60 text-2xl font-sans">({selectedEdition.ano})</span>
            </h2>
            <div className="w-16 h-1 bg-secondary mb-8 rounded-full" />
            
            <div className="flex flex-col md:flex-row gap-12 mb-16">
              <div className="flex-1">
                <p className="text-foreground/80 leading-relaxed text-lg">
                  {selectedEdition.descricao || "Mais informações sobre esta edição em breve."}
                </p>
              </div>
              
              {/* Espaço para o Cartaz */}
              <div className="w-full md:w-1/3 shrink-0">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-transparent flex items-center justify-center relative">
                  {selectedEdition.imagem ? (
                    <img 
                      src={`/${selectedEdition.imagem}`} 
                      alt={`Cartaz Edição ${selectedEdition.edicao}`} 
                      className="w-full h-full object-cover shadow-lg rounded-2xl"
                    />
                  ) : (
                    <span className="text-foreground/30 font-serif italic">Cartaz indisponível</span>
                  )}
                </div>
              </div>
            </div>

            {/* Tunas Participantes e Prémios */}
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <span className="w-8 h-px bg-secondary"></span>
                  Tunas Participantes
                </h3>
                <ul className="space-y-4">
                  {selectedEdition.tunas_participantes && selectedEdition.tunas_participantes.length > 0 ? (
                    selectedEdition.tunas_participantes.map((tuna: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/80">
                        <span className="material-symbols-outlined text-secondary mt-0.5 text-lg">music_note</span>
                        {tuna}
                      </li>
                    ))
                  ) : (
                    <li className="text-foreground/50 italic text-sm">Informação a ser atualizada.</li>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <span className="w-8 h-px bg-secondary"></span>
                  Prémios
                </h3>
                <ul className="space-y-4">
                  {selectedEdition.premios && selectedEdition.premios.length > 0 ? (
                    selectedEdition.premios.map((premio: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/80">
                        <span className="material-symbols-outlined text-secondary mt-0.5 text-lg">emoji_events</span>
                        {premio}
                      </li>
                    ))
                  ) : (
                    <li className="text-foreground/50 italic text-sm">Informação a ser atualizada.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
