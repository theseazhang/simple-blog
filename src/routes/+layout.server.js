import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data } = await supabase.from("json_table").select().eq('key', 'blog').single();
  return {
    blog: data.data,
  }
}