<script>
	export let data;
	import { dateToString } from '$lib/tools';
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
			<div class="">
				<span class="text-gray-500 mr-2">[{dateToString(new Date(post.created_at))}]</span>
				<a href="/post/{post.id}" class="text-2xl">{post.title}</a>
			</div>
		{/each}
	</div>
</section>
