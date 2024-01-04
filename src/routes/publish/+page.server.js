import { fail, redirect, error } from '@sveltejs/kit';

export const actions = {
	default: async ({request, url, locals: { supabase, getSession }}) => {
        const postid = url.searchParams.get('id')
        const data = await request.formData();
        const title = data.get('title')
        const content = data.get('content')
        const author = data.get('author')
        const created_at = data.get('created_at')
        const tags = data.get('tags')

        const session = await getSession()
        const author_id = session?.user?.id
        if(!author_id) return fail(401, {error: 'Unauthorized'});

        if(postid) {
            const res = await supabase.from('blog_post').
            update({
                created_at: new Date(created_at),
                updated_at: new Date(),
                title,
                content,
                author
            }).eq('id', postid).select('id').single()
            
            if(res.error) {
                return fail(422, {
                    error: res.error.message
                });
            }

            redirect(302, `/post/${postid}`);
        } else {
            const res = await supabase.from('blog_post').
            insert({title, content, author_id, author, created_at: new Date(created_at)}).select('id').single()
        
            if(res.error) {
                return fail(422, {
                    error: res.error.message
                });
            }

            redirect(302, `/post/${res.data.id}`);
        }
	}
};

export async function load(event) {
    const {url, locals: { supabase }} = event
	const postid = url.searchParams.get('id')
    if(!postid) return {};

    const res = await supabase.from('blog_post').select().eq('id', postid).single()
    if(res.error) return error(500, res.error.message);

	return {
        post : res.data
	};
}