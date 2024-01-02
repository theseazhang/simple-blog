import { error } from '@sveltejs/kit';
import { compile } from 'mdsvex';

export async function load({params, locals: { supabase }}) {
	const id = params.slug

    const res = await supabase.from('blog_post').select().eq('id', id).single()
    if(res.error) return error(res.status || 500, res.error.message)

	const html = await compile(res.data.content)

	return {
		post: {...res.data, html},
	};
}