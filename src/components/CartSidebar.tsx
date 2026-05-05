"use client";

import { useCart } from "./CartProvider";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";
export default function CartSidebar() {
  const { isCartOpen, setIsCartOpen, items, removeFromCart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<"cart" | "form" | "success">("cart");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", notes: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Reset to cart step when sidebar closes or opens empty
  useEffect(() => {
    if (!isCartOpen) {
      setTimeout(() => setStep("cart"), 300); // reset after animation
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const orderDetails = items.map(i => `${i.quantidade}x ${i.nome} ${i.tamanho ? `(Tam: ${i.tamanho})` : ''} - ${(i.preco * i.quantidade).toFixed(2)}€`).join('\n');

    const templateParams = {
      name: formData.name,
      nome_cliente: formData.name,
      email: formData.email,
      telefone: formData.phone,
      morada: formData.address,
      notas: formData.notes,
      message: formData.notes || "Encomenda via Loja Online",
      detalhes_carrinho: orderDetails,
      valor_total: `${cartTotal.toFixed(2)}€`
    };

    try {
      await emailjs.send('service_4cidzzm', 'template_wemhxna', templateParams, '4GmdocNDaZch7KCVE');
      setStep("success");
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#8B0000', '#FFFFFF']
      });
      clearCart();
      setFormData({ name: "", email: "", phone: "", address: "", notes: "" });
    } catch (error) {
      console.error("Erro ao enviar encomenda via emailjs:", error);
      alert("Ocorreu um erro ao processar o seu pedido. Por favor tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-[60] transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-[450px] max-w-[100vw] bg-surface shadow-2xl z-[70] flex flex-col transform transition-transform border-l border-primary/5">
        
        {/* Header */}
        <div className="p-6 border-b border-foreground/5 flex items-center justify-between bg-background">
          <div className="flex items-center gap-4">
            {step === "form" && (
              <button onClick={() => setStep("cart")} className="text-foreground/50 hover:text-foreground text-sm flex items-center gap-1">
                <span className="text-lg">←</span> Voltar
              </button>
            )}
            <h2 className="font-display text-xl font-bold text-foreground">
              {step === "cart" && "O teu Carrinho"}
              {step === "form" && "Finalizar Encomenda"}
              {step === "success" && "Sucesso"}
            </h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-primary/5 rounded-full text-foreground/50 hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* STEP 1: CART ITEMS */}
          {step === "cart" && (
            <>
              {items.length === 0 ? (
                <div className="text-center text-foreground/40 mt-10">
                  O teu carrinho está vazio.
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-background rounded-xl border border-primary/5 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl opacity-20">🛒</span>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h4 className="font-serif font-semibold text-foreground/90">{item.nome}</h4>
                      <div className="text-sm text-foreground/50 mt-1 font-sans flex items-center justify-between">
                        <span>Qtd: {item.quantidade} {item.tamanho && `| Tam: ${item.tamanho}`}</span>
                        <span className="text-secondary font-semibold font-serif">
                          {(item.preco * item.quantidade).toFixed(2)}€
                        </span>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-500 hover:text-red-600 self-start mt-auto font-sans pt-2"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {/* STEP 2: CHECKOUT FORM */}
          {step === "form" && (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="flex flex-col gap-4 font-sans">
              <div>
                <label className="block text-sm text-foreground/70 mb-1">Nome Completo *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 rounded-lg bg-background border border-foreground/10 focus:outline-none focus:border-secondary" />
              </div>
              <div>
                <label className="block text-sm text-foreground/70 mb-1">E-mail *</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 rounded-lg bg-background border border-foreground/10 focus:outline-none focus:border-secondary" />
              </div>
              <div>
                <label className="block text-sm text-foreground/70 mb-1">Telefone *</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 rounded-lg bg-background border border-foreground/10 focus:outline-none focus:border-secondary" />
              </div>
              <div>
                <label className="block text-sm text-foreground/70 mb-1">Morada de Envio *</label>
                <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full p-3 rounded-lg bg-background border border-foreground/10 focus:outline-none focus:border-secondary text-sm" placeholder="Rua, Código Postal, Localidade" />
              </div>
              <div>
                <label className="block text-sm text-foreground/70 mb-1">Observações (opcional)</label>
                <textarea rows={3} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full p-3 rounded-lg bg-background border border-foreground/10 focus:outline-none focus:border-secondary text-sm resize-none" placeholder="Indicações adicionais..." />
              </div>
            </form>
          )}

          {/* STEP 3: SUCCESS */}
          {step === "success" && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-hero-fade-up">
              <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-full flex items-center justify-center text-4xl mb-4">
                ✓
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">Encomenda Recebida!</h3>
              <p className="text-foreground/60 font-sans text-sm max-w-[250px]">
                Obrigado pelo teu pedido. Irás receber brevemente um e-mail com as instruções de pagamento.
              </p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="btn btn-outline w-full mt-6"
              >
                Continuar a Navegar
              </button>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        {step === "cart" && items.length > 0 && (
          <div className="p-6 border-t border-foreground/5 bg-background">
            <div className="flex items-center justify-between font-serif text-lg font-bold text-foreground mb-6">
              <span>Total Estimado</span>
              <span>{cartTotal.toFixed(2)}€</span>
            </div>
            <button 
              className="btn btn-primary w-full shadow-lg h-14"
              onClick={() => setStep("form")}
            >
              Finalizar Encomenda
            </button>
          </div>
        )}

        {step === "form" && (
           <div className="p-6 border-t border-foreground/5 bg-background">
           <div className="flex items-center justify-between font-serif text-lg font-bold text-foreground mb-6 opacity-70 cursor-not-allowed">
             <span>Total a Pagar</span>
             <span>{cartTotal.toFixed(2)}€</span>
           </div>
           <button 
             type="submit"
             form="checkout-form"
             disabled={isLoading}
             className="btn btn-gold w-full shadow-lg h-14 flex items-center justify-center gap-2"
           >
             {isLoading ? "A processar..." : "Confirmar Encomenda"}
           </button>
         </div>
        )}
      </div>
    </>
  );
}
