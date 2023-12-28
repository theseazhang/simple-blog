<script>
	import { enhance } from '$app/forms';
	export let data;
	export let form;
</script>

<svelte:head>
	<title>Publish a new post - {data.blog.site}</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<h1 class="text-3xl font-bold">Publish a new post</h1>

<section class="my-10">
	<form class="flex flex-col gap-5" method="POST" use:enhance>
		<div class="flex flex-col gap-2">
			<label for="title">title:</label>
			<input id="title" name="title" required />
		</div>

		<div class="flex flex-col gap-2">
			<label for="detail">detail:</label>
			<textarea id="detail" name="detail" required rows="10"></textarea>
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
