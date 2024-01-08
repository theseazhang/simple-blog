<script>
	import '../app.css';
	import { invalidate, goto } from '$app/navigation';
	import { Mail, Github, LogIn, LogOut, PenSquare, UserRound } from 'lucide-svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	let logout = async () => {
		await supabase.auth.signOut();
		let res = await supabase.auth.getSession();
		data.session = res.data.session;
		// invalidate('supabase:auth');
		goto('/');
	};
</script>

<main class="container mx-auto flex min-h-screen max-w-5xl flex-col px-5 py-10">
	<slot />
</main>

<footer class="flex flex-col items-center gap-10 bg-blue-600 py-10 text-white/90 md:py-16 lg:py-20">
	<div class="flex items-center gap-2 text-lg">
		<div>© {new Date().getFullYear()}</div>
		<a href="/" class="hover:text-white">{data.blog.copyright}</a>
	</div>
	<nav class="flex gap-10 text-sm sm:gap-12 lg:gap-20">
		<a href="/about" class="hover:text-white"><UserRound /></a>
		<a href={data.blog.github} class="hover:text-white"><Github /></a>
		<a href="mailto:{data.blog.email}" class="hover:text-white"><Mail /></a>
		{#if session}
			<a href="/publish" class="hover:text-white"><PenSquare /></a>
			<button on:click={logout} class="hover:text-white"><LogOut /></button>
		{:else}
			<a href="/login" title="Author Login" class="hover:text-white"><LogIn /></a>
		{/if}
	</nav>
</footer>
