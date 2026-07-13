import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { signup } from "../actions";

export default async function CadastroPage(
  props: Readonly<{ searchParams: Promise<{ erro?: string }> }>
) {
  const searchParams = await props.searchParams;
  const erro = searchParams?.erro;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="w-full max-w-md flex flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 text-ink-light hover:text-ink transition-colors w-fit">
          <ArrowLeft size={20} strokeWidth={1.5} />
          <span>Voltar para a capa</span>
        </Link>
        
        <div className="flex flex-col gap-2 text-center mt-4">
          <h1 className="text-3xl font-serif text-ink tracking-tight">Criar Conta</h1>
          <p className="text-ink-light">Inicie o seu novo caderno de poesias</p>
        </div>

        <form action={signup} className="flex flex-col gap-4 mt-4">
          {erro && (
            <p className="text-red-700 text-sm text-center bg-red-100/50 p-2 border border-red-200">
              Ocorreu um erro ao criar a conta. A senha deve ter no mínimo 6 caracteres.
            </p>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-ink-light">E-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required
              className="w-full p-2 bg-transparent border border-ink-light focus:border-ink outline-none transition-colors"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-ink-light">Senha (mínimo 6 caracteres)</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required
              minLength={6}
              className="w-full p-2 bg-transparent border border-ink-light focus:border-ink outline-none transition-colors"
            />
          </div>

          <button 
            type="submit" 
            className="w-full mt-6 py-2 bg-ink text-parchment hover:bg-ink-light transition-colors duration-200"
          >
            Registrar e Entrar
          </button>
        </form>

        <p className="text-center text-sm text-ink-light mt-4">
          Já tem uma conta? <Link href="/login" className="text-ink underline hover:text-ink-light">Entrar</Link>
        </p>
      </div>
    </main>
  );
}