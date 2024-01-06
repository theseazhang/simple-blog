<script>
	import { enhance } from '$app/forms';
	import { dateToString, getClipboardContents } from '$lib/tools';

	export let data;
	export let form;
	let { blog } = data;
	let today = dateToString(new Date());

	const uploadFile = async () => {
		const file = await getClipboardContents();
		// const res = await supabase.storage
		// 	.from('blogfiles')
		// 	.upload('avatar1.png', decode('base64FileData'), {
		// 		contentType: 'image/png'
		// 	});
		// console.log(res);
	};
</script>

<svelte:head>
	<title>Publish - {blog.site}</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<h1 class="text-3xl font-bold text-center" style="font-family: &quot;Kaiti SC&quot;, KaiTi;">
	日拱一卒，功不唐捐。
</h1>

<section class="mb-20">
	<form class="flex flex-col gap-5" method="POST" use:enhance>
		<div class="flex flex-col gap-2">
			<label for="title">title:</label>
			<input id="title" name="title" required />
		</div>

		<div class="flex flex-col gap-2">
			<div class="flex gap-2">
				<input id="file" class="flex-grow" type="file" value="" />
				<button type="button" class="btn-secondary" on:click={uploadFile}>upload file</button>
			</div>
			<textarea id="content" name="content" required rows="20"></textarea>
		</div>

		<div class="grid grid-cols-4 gap-2">
			<div class="flex flex-col gap-2">
				<label for="created_at">created_at:</label>
				<input id="created_at" name="created_at" required value={today} />
			</div>

			<div class="flex flex-col gap-2">
				<label for="author">author:</label>
				<input id="author" name="author" required value="dylan zhang" />
			</div>

			<div class="flex flex-col gap-2 col-span-2">
				<label for="tags">tags:</label>
				<input id="tags" name="tags" />
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<div class="flex justify-center">
				<button class="btn w-1/4" type="submit">Submit</button>
			</div>

			{#if form?.error}
				<div class="text-red-500">
					{form?.error}
				</div>
			{/if}
		</div>
	</form>
</section>
