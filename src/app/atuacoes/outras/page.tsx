"use client";

import { useState, useMemo } from "react";
import atuacoes from "@/data/atuacoes.json";

export default function OutrasPage() {
  const [selectedYear, setSelectedYear] = useState<string>("Todos");

  const years = useMemo(() => {
    const allYears = atuacoes.outras.map(a => a.data.match(/\d{4}/)?.[0] || "Desconhecido");
    return [...new Set(allYears)].filter(y => y !== "Desconhecido").sort((a, b) => b.localeCompare(a));
  }, []);

  const filteredAtuações = useMemo(() => {
    return atuacoes.outras.filter(a => {
      if (selectedYear === "Todos") return true;
      const year = a.data.match(/\d{4}/)?.[0] || "Desconhecido";
      return year === selectedYear;
    });
  }, [selectedYear]);

  return (
    <>
      <section className="page-hero relative">
        <div className="absolute inset-0 bg-[url('/fotos/rua.jpg')] bg-cover bg-center opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="page-hero-label">Atuações</span>
          <h1 className="page-hero-title">
            Outras <span className="gold-accent">Atuações</span>
          </h1>
          <p className="page-hero-subtitle">
            Serenatas, eventos solidários, casamentos e mais
          </p>
        </div>
      </section>

      <section className="section-padding bg-background min-h-[50vh]">
        <div className="max-w-3xl mx-auto px-6">
          
          {/* Dropdown Filter */}
          <div className="mb-12 flex flex-col sm:flex-row items-center gap-4 bg-surface p-6 rounded-2xl border border-primary/5">
            <label className="font-serif text-lg text-foreground font-semibold">
              Filtrar por Ano:
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl bg-background border border-primary/10 text-foreground text-sm focus:outline-none focus:border-primary/30 transition-all cursor-pointer"
            >
              <option value="Todos">Todos os Anos</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-10">
            {filteredAtuações.length === 0 ? (
              <p className="text-center text-foreground/40 font-sans py-10">
                Nenhuma atuação encontrada para o ano selecionado.
              </p>
            ) : (
              filteredAtuações.map((a) => (
                <div key={a.id} className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                      {a.data}
                    </span>
                    <span className="w-px h-3 bg-foreground/10" />
                    <span className="text-xs text-foreground/40">{a.localizacao}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {a.titulo}
                  </h3>
                  <p className="text-foreground/50 text-sm">{a.descricao}</p>
                  <div className="mt-6 w-full h-px bg-foreground/5" />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
