<script>
	export let data;
</script>

<svelte:head>
	<title>{data.blog.site}</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<h1 class="text-3xl font-bold underline">{data.blog.site}</h1>
<h1 class="text-3xl font-bold underline">{data.blog.email}</h1>
<h1 class="text-3xl font-bold underline">{data.blog.github}</h1>
