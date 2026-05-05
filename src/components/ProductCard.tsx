"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

type Produto = {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
  tamanhos: string[];
};

export default function ProductCard({ produto }: { produto: Produto }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(
    produto.tamanhos?.length > 0 ? produto.tamanhos[0] : ""
  );

  const handleBuy = () => {
    if (produto.tamanhos?.length > 0 && !selectedSize) {
      alert("Por favor, selecione um tamanho.");
      return;
    }

    addToCart({
      productId: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      tamanho: selectedSize || undefined,
      quantidade: 1,
    });
  };

  return (
    <div className="group flex flex-col h-full">
      {/* Image placeholder — aspect ratio container */}
      <div className="aspect-square bg-surface border border-primary/5 rounded-2xl mb-5 flex items-center justify-center overflow-hidden">
        {produto.imagem ? (
          <img 
            src={produto.imagem} 
            alt={produto.nome}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="text-6xl opacity-10 transition-transform duration-500 group-hover:scale-110">
            👕
          </span>
        )}
      </div>
      
      <div className="flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 pr-4">
            <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {produto.nome}
            </h3>
            
            <div className="flex flex-col gap-3 mt-2">
              {produto.descricao && (
                <p className="text-foreground/45 text-sm leading-relaxed">{produto.descricao}</p>
              )}
              
              {/* Size Dropdown inline with description flow */}
              {produto.tamanhos?.length > 0 && (
                <div className="self-start">
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="px-4 py-1.5 rounded-xl bg-background border border-primary/10 text-foreground text-sm focus:outline-none focus:border-primary/30 transition-all font-sans cursor-pointer"
                  >
                    <option value="" disabled>Tamanho</option>
                    {produto.tamanhos.map((tam) => (
                      <option key={tam} value={tam}>{tam}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
          <span className="font-serif text-xl font-bold text-secondary whitespace-nowrap pl-4">
            {produto.preco.toFixed(2)}€
          </span>
        </div>

        <div className="mt-auto pt-4 flex items-center">
          <button 
            onClick={handleBuy}
            className="w-full btn btn-primary flex-1 shadow-md group-hover:shadow-lg transition-all"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
