import { savePoem } from "./actions";

export default function DashboardPage() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* @ts-ignore */}
     <form action={savePoem} className="flex flex-col gap-4">  <input 
          name="title"
          required
          placeholder="Título da poesia..." 
          className="w-full bg-transparent text-3xl font-serif text-ink outline-none placeholder:text-ink-light/50"
        />
        <input 
          name="author"
          placeholder="Autor" 
          className="w-full bg-transparent text-lg text-ink-light italic outline-none"
        />
        <textarea 
          name="content"
          required
          placeholder="Escreva seus versos aqui..." 
          className="w-full h-[60vh] bg-transparent resize-none outline-none text-ink text-lg leading-relaxed mt-4 placeholder:text-ink-light/50"
        />
        <button 
          type="submit" 
          className="px-6 py-2 bg-ink text-parchment w-fit hover:bg-ink-light transition-colors"
        >
          Salvar Poesia
        </button>
      </form>
    </div>
  );
}