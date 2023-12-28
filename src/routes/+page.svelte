<script>
	export let data;
</script>

<svelte:head>
	<title>{data.site}</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<h1 class="text-3xl font-bold underline">{data.site}</h1>
<h1 class="text-3xl font-bold underline">{data.email}</h1>
<h1 class="text-3xl font-bold underline">{data.github}</h1>
