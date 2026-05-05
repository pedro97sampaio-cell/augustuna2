"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    const templateParams = {
      name: formData.get("name"),
      email: formData.get("email"),
      assunto: formData.get("assunto"),
      message: formData.get("message"),
    };

    try {
      // You can configure this with your actual Service ID, Template ID, and Public Key
      // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_PUBLIC_KEY');
      
      // For now, simulate the request to avoid errors if not configured yet
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSubmitStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Erro ao enviar mensagem via emailjs:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div>
        <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wider">
          O teu Nome
        </label>
        <input
          name="name"
          type="text"
          required
          className="w-full border-b border-primary/20 bg-transparent py-2 focus:outline-none focus:border-primary transition-colors text-foreground"
          placeholder="Insere o teu nome"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wider">
          O teu Email
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full border-b border-primary/20 bg-transparent py-2 focus:outline-none focus:border-primary transition-colors text-foreground"
          placeholder="Insere o teu email"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wider">
          Assunto
        </label>
        <input
          name="assunto"
          type="text"
          required
          className="w-full border-b border-primary/20 bg-transparent py-2 focus:outline-none focus:border-primary transition-colors text-foreground"
          placeholder="Ex: Contratar a tuna..."
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wider">
          Mensagem
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full border-b border-primary/20 bg-transparent py-2 focus:outline-none focus:border-primary transition-colors text-foreground resize-none"
          placeholder="Escreve aqui a tua mensagem..."
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary w-full sm:w-auto px-10 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "A enviar..." : "Enviar Mensagem"}
      </button>

      {submitStatus === "success" && (
        <p className="text-green-600 text-sm mt-4">Mensagem enviada com sucesso! Entraremos em contacto brevemente.</p>
      )}
      {submitStatus === "error" && (
        <p className="text-red-600 text-sm mt-4">Ocorreu um erro ao enviar a mensagem. Por favor, tenta novamente.</p>
      )}
    </form>
  );
}
