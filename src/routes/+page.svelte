<script>
	export let data;
</script>

<svelte:head>
	<title>{data.blog.site}</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<section class="my-10 flex flex-col gap-5">
	<h1 class="text-3xl font-bold underline text-center">{data.blog.site}</h1>

	<hr />
	{#each data.posts as post}
		<a href="/post/{post.id}">{post.title}</a>
	{/each}
</section>
