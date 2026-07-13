'use server'

import { createClient } from '../lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function savePoem(formData: FormData) {
  const supabase = await createClient()
  
  // Pegar o usuário logado
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Usuário não autenticado' }

  const title = formData.get('title') as string
  const author = formData.get('author') as string
  const content = formData.get('content') as string

  // Inserir no Supabase
  const { error } = await supabase.from('poems').insert([
    { 
      user_id: user.id, 
      title, 
      author, 
      content 
    },
  ])

  if (error) return { error: error.message }

  // Atualizar a página para mostrar a nova poesia na sidebar
  revalidatePath('/dashboard')
  return { success: true }
}

export async function updatePoem(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const content = formData.get('content') as string;

  await supabase.from('poems').update({ title, author, content }).eq('id', id);
  revalidatePath('/dashboard');
}

export async function deletePoem(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;

  await supabase.from('poems').delete().eq('id', id);
  revalidatePath('/dashboard');
  redirect('/dashboard'); // Volta para a tela principal
}