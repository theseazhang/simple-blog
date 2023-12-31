import { fail, redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export const actions = {
	default: async ({request, url, locals: { supabase }}) => {
        const blogid = url.searchParams.get('id')
        const data = await request.formData();
        const title = data.get('title')
        const content = data.get('detail')
        const tags = data.get('tags')

        if(blogid) {
            const res = await supabase.from('blog_post').
            update({title, content}).eq('id', blogid)

            console.log(res)
            
            if(res.error) {
                return fail(422, {
                    error: res.error.message
                });
            }

            redirect(302, `/post/${blogid}`);
        } else {
            const res = await supabase.from('blog_post').
            insert({title, content}).select('id').single()
        
            if(res.error) {
                return fail(422, {
                    error: res.error
                });
            }

            redirect(302, `/post/${res.data.id}`);
        }
	}
};

export async function load({url, locals: { supabase }}) {
	const id = url.searchParams.get('id')
    if(!id) return {};

    const res = await supabase.from('blog_post').select().eq('id', id).single()
    if(res.error) return error(500, res.error.message);

	return {
		title: res.data.title,
        content: res.data.content,
        id
	};
}