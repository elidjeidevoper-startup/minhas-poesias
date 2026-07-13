import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
import Link from "next/link";
import { BookOpen, Plus, LogOut } from "lucide-react";

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Busca as poesias deste usuário no Supabase
  const { data: poems } = await supabase
    .from("poems")
    .select("id, title")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    // Alteramos para flex-col no mobile e flex-row no desktop
    <div className="flex flex-col md:flex-row min-h-screen bg-parchment">
      
      {/* Sidebar: w-full no mobile, w-64 no desktop */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-parchment-dark p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="text-ink" />
            <h2 className="font-serif text-xl text-ink">Minhas Poesias</h2>
          </div>
          
          <Link href="/dashboard" className="flex items-center gap-2 text-ink-light hover:text-ink transition-colors mb-6">
            <Plus size={18} />
            <span>Nova Poesia</span>
          </Link>
          
          <nav className="flex flex-col gap-2">
            {poems && poems.length > 0 ? (
              poems.map((poem) => (
                <Link 
                  key={poem.id} 
                  href={`/dashboard/${poem.id}`} 
                  className="text-ink hover:text-ink-light truncate transition-colors"
                >
                  {poem.title}
                </Link>
              ))
            ) : (
              <div className="text-sm text-ink-light/70 italic">Nenhuma poesia salva.</div>
            )}
          </nav>
        </div>

        <form action="/auth/signout" method="post" className="mt-8 md:mt-0">
           <button type="submit" className="flex items-center gap-2 text-ink-light hover:text-red-700 transition-colors text-sm">
             <LogOut size={16} />
             Sair
           </button>
        </form>
      </aside>

      {/* Conteúdo Principal: Ajustado para padding responsivo */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12">
        {children}
      </main>
    </div>
  );
}