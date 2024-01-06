<script>
	export let post;
	export let err;
	export let cancelHandle;
	export let submitHandle;
</script>

<section class="mb-20">
	<form class="flex flex-col gap-5">
		<div class="flex flex-col gap-2">
			<label for="title">title:</label>
			<input id="title" name="title" required bind:value={post.title} />
		</div>

		<div class="flex flex-col gap-2">
			<label for="created_at">created_at:</label>
			<input id="created_at" name="created_at" bind:value={post.created_at} />
		</div>

		<div class="flex flex-col gap-2">
			<label for="author">author:</label>
			<input id="author" name="author" bind:value={post.author} />
		</div>

		<div class="flex flex-col gap-2">
			<label for="content">content:</label>
			<textarea id="content" name="content" required rows="20" bind:value={post.content}></textarea>
		</div>

		<div class="flex flex-col gap-2">
			<label for="tags">tags:</label>
			<input id="tags" name="tags" />
		</div>

		<div class="flex flex-col gap-2">
			<div class="flex gap-5 justify-center">
				<button class="btn w-1/4" type="button" on:click|preventDefault={submitHandle}
					>Submit</button
				>
				<button class="btn-secondary w-1/4" type="button" on:click={cancelHandle}>Cancel</button>
			</div>

			{#if err}
				<div class="text-red-500">{err}</div>
			{/if}
		</div>
	</form>
</section>
