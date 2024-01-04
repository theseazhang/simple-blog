import { error } from '@sveltejs/kit';
import { compile } from 'mdsvex';
import { dateToString } from '$lib/tools';

export async function load({params, locals: { supabase }}) {
	const id = params.slug

    const res = await supabase.from('blog_post').select().eq('id', id).single()
    if(res.error) return error(res.status || 500, res.error.message)

	const mdx = await compile(res.data.content)
	
	res.data.created_at = dateToString(new Date(res.data.created_at));

	return {
		post: {html:mdx.code, ...res.data},
	};
}