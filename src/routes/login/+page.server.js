import { fail, redirect } from '@sveltejs/kit';
/** @type {import('./$types').Actions} */

export const actions = {
	default: async ({request, locals: { supabase }}) => {
        const data = await request.formData();
        const email = data.get('email')
        const password = data.get('password') 
  
        const res = await supabase.auth.signInWithPassword({email, password})
        
        if(res.error) {
            return fail(422, {
                error: res.error.message
            });
        }

        redirect(302, '/');
	}
};