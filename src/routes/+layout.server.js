import { error } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals: { supabase, getSession} }) {
  const res = await supabase.from("json_table").select().eq('key', 'blog').single();
  if(res.error) return error(500, res.error.message)

  return {
    session: await getSession(),
    blog: res.data.data,
  }
}