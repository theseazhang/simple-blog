<script>
	import { enhance } from '$app/forms';
	import { dateToString } from '$lib/tools';
	export let data;
	export let form;
	let { post, blog } = data;
	let today = dateToString(new Date());
	if (post.created_at) {
		today = dateToString(new Date(post.created_at));
	}
</script>

<svelte:head>
	<title>Publish - {blog.site}</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<h1 class="text-3xl font-bold">Publish a new post</h1>

<section class="my-10">
	<form class="flex flex-col gap-5" method="POST" use:enhance>
		<div class="flex flex-col gap-2">
			<label for="title">title:</label>
			<input id="title" name="title" required value={post?.title || ''} />
		</div>

		<div class="flex flex-col gap-2">
			<label for="created_at">created_at:</label>
			<input id="created_at" name="created_at" value={today} />
		</div>

		<div class="flex flex-col gap-2">
			<label for="author">author:</label>
			<input id="author" name="author" value={post.author || 'dylan zhang'} />
		</div>

		<div class="flex flex-col gap-2">
			<label for="content">content:</label>
			<textarea id="content" name="content" required rows="10">{post?.content || ''}</textarea>
		</div>

		<div class="flex flex-col gap-2">
			<label for="tags">tags:</label>
			<input id="tags" name="tags" />
		</div>

		<div class="flex flex-col gap-2">
			<div>
				<button class="border px-4 py-2 font-bold" type="submit">Submit</button>
			</div>

			{#if form?.error}
				<div class="text-red-500">
					{form?.error}
				</div>
			{/if}
		</div>
	</form>
</section>
