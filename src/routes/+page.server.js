import { error } from '@sveltejs/kit';

export async function load({locals: { supabase }}) {
    const res = await supabase.from('blog_post').select('*').order('created_at', { ascending: false })

    if(res.error) return error(500, res.error.message)

	return {
		posts: res.data
	};
}