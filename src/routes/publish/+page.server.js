import { fail, redirect } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";

export const actions = {
	default: async ({request}) => {
        const data = await request.formData();
        const title = data.get('title')
        const content = data.get('detail')
        const tags = data.get('tags')

        const res = await supabase.from('blog_post').
        insert([{ title, content }]).
        select('id').single()
        
        if(res.error) {
            return fail(422, {
				description: data.get('description'),
				error: res.error
			});
        }

		redirect(302, `/post/${res.data.id}`);
	}
};