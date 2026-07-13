import { createClient } from "../../lib/supabase/server";
import { notFound } from "next/navigation";
import { updatePoem, deletePoem } from "../actions"; // Vamos criar essas actions já já

export default async function PoemPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const supabase = await createClient();

  // Busca a poesia específica
  const { data: poem } = await supabase
    .from("poems")
    .select("*")
    .eq("id", id)
    .single();

  if (!poem) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <form action={updatePoem} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={poem.id} />
        
        <input 
          name="title"
          required
          defaultValue={poem.title}
          className="w-full bg-transparent text-3xl font-serif text-ink outline-none"
        />
        <input 
          name="author"
          defaultValue={poem.author || ""}
          className="w-full bg-transparent text-lg text-ink-light italic outline-none"
        />
        <textarea 
          name="content"
          required
          defaultValue={poem.content}
          className="w-full h-[60vh] bg-transparent resize-none outline-none text-ink text-lg leading-relaxed mt-4"
        />
        
        <div className="flex gap-4">
          <button type="submit" className="px-6 py-2 bg-ink text-parchment hover:bg-ink-light transition-colors">
            Atualizar Poesia
          </button>
          
          <button 
            formAction={deletePoem} 
            className="px-6 py-2 border border-red-800 text-red-800 hover:bg-red-800 hover:text-white transition-colors"
          >
            Excluir
          </button>
        </div>
      </form>
    </div>
  );
}