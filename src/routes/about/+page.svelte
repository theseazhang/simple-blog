<script>
	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);
</script>

<svelte:head>
	<title>About - {data.blog.site}</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<h1 class="text-3xl font-bold underline">About</h1>
