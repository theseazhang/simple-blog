import { supabase } from "$lib/supabaseClient";
import { error } from '@sveltejs/kit';

export async function load({params}) {
	const id = params.slug

    const res = await supabase.from('blog_post').select().eq('id', id).single()

    if(res.error) return error(500, res.error.message)

	return {
		title: res.data.title,
        content: res.data.content,
        id
	};
}