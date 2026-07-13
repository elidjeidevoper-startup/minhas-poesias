import Link from "next/link";
import { PenTool } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <PenTool className="w-16 h-16 text-ink-light" strokeWidth={1.5} />
        <h1 className="text-4xl font-serif text-ink tracking-tight">Minhas Poesias</h1>
        <p className="text-ink-light text-lg">
          Um espaço minimalista para escrever, guardar e reviver seus versos.
        </p>
        
        <div className="flex gap-4 mt-8 w-full">
          <Link 
            href="/login" 
            className="flex-1 py-2 px-4 text-center bg-transparent border border-ink text-ink hover:bg-parchment-dark transition-colors duration-200"
          >
            Entrar
          </Link>
          <Link 
            href="/cadastro" 
            className="flex-1 py-2 px-4 text-center bg-ink text-parchment hover:bg-ink-light transition-colors duration-200"
          >
            Começar
          </Link>
        </div>
      </div>
    </main>
  );
}