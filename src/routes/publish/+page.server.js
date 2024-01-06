import { fail, redirect, error } from '@sveltejs/kit';

export const actions = {
	default: async ({request, locals: { supabase, getSession }}) => {
        const data = await request.formData();
        const title = data.get('title')
        const content = data.get('content')
        const author = data.get('author')
        const created_at = data.get('created_at')
        const tags = data.get('tags')

        const session = await getSession()
        const author_id = session?.user?.id

        if(!author_id) {
            return fail(422, {
                error: "You must be logged in to publish a post."
            });
        }
        
        const res = await supabase.from('blog_post').
            insert({title, content, author_id, author, created_at: new Date(created_at)}).select('id').single()
        
        if(res.error) {
            return fail(422, {
                error: res.error.message
            });
        }

        redirect(302, `/post/${res.data.id}`);
	}
};