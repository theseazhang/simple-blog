/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals: { supabase, getSession} }) {
  const { data } = await supabase.from("json_table").select().eq('key', 'blog').single();
  return {
    session: await getSession(),
    blog: data.data,
  }
}