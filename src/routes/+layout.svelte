<script>
	import '../app.css';
	import { invalidate, goto } from '$app/navigation';

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

<main class="container mx-auto py-10 min-h-screen flex flex-col max-w-5xl px-5">
	<slot />
	<footer class="container mt-auto mx-auto border-t py-10 flex flex-col items-center gap-5">
		<div>
			© {new Date().getFullYear()}
			<a href="/" class="font-bold">{data.blog.copyright}</a>
		</div>
		<nav class="flex gap-5 text-sm">
			<a href="/about">About</a>
			<a href={data.blog.github}>Github</a>
			<a href="mailto:{data.blog.email}">Contact</a>
			{#if session}
				<a href="/publish">Publish</a>
				<button on:click={logout}>Logout</button>
			{:else}
				<a href="/login" title="Author Login">Login</a>
			{/if}
		</nav>
	</footer>
</main>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
