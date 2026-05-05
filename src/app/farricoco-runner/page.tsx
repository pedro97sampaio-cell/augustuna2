import FarricocoRunner from "@/components/FarricocoRunner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erro 404 - Farricoco Runner | Augustuna",
  description: "Página não encontrada — mas encontrámos um jogo! Farricoco Runner, o jogo oficial da Augustuna.",
};

export default function GamePage() {
  return <FarricocoRunner />;
}
