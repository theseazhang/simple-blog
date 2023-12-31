<script>
	import '../app.css';
	export let data;

	let { supabase } = data;
	$: ({ supabase } = data);

	let logout = async () => {
		await supabase.auth.signOut();
	};
</script>

<header class="container mx-auto my-10 flex gap-5">
	<a href="/">Home</a>
	<a href="/publish">Publish</a>
	<a href="/about">About</a>
	{#if data.session}
		<button on:click={logout}>Logout</button>
	{:else}
		<a href="/login">Login</a>
	{/if}
</header>

<main class="container mx-auto my-10">
	<slot />
</main>

<footer class="container mx-auto my-10 text-center">
	© 2023 {data.blog.copyright}
	<h3 class="text-xl font-bold underline">{data.blog.email}</h3>
	<h3 class="text-xl font-bold underline">{data.blog.github}</h3>
</footer>
