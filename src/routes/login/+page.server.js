import { fail, redirect } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";

export const actions = {
	default: async ({request}) => {
        const data = await request.formData();
        const email = data.get('email')
        const password = data.get('password')
        
        const res = await supabase.from('blog_post').insert({email, password}).select('id').single()
        
        if(res.error) {
            return fail(422, {
                error: res.error
            });
        }
	}
};