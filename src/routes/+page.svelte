<script>
	export let data;
</script>

<svelte:head>
	<title>{data.blog.site}</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<section class="flex flex-col gap-5">
	<div class="border-b pb-10 border-black">
		<h1 class="text-3xl font-bold text-center">{data.blog.site}</h1>
	</div>

	<div class="my-10 flex flex-col gap-10">
		{#each data.posts as post}
			<a href="/post/{post.id}">{post.title}</a>
		{/each}
	</div>
</section>
