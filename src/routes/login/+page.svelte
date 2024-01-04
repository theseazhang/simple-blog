<script>
	import { enhance } from '$app/forms';
	export let data;
	export let form;
</script>

<svelte:head>
	<title>Login - {data.blog.site}</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<h1 class="text-3xl font-bold text-center" style="font-family: &quot;Kaiti SC&quot;, KaiTi;">
	日拱一卒，功不唐捐。
</h1>

<section class="my-20">
	<form class="flex flex-col gap-5 max-w-sm mx-auto" method="POST" use:enhance>
		<div class="flex flex-col gap-2">
			<label for="email">Email:</label>
			<input id="email" name="email" type="email" required />
		</div>

		<div class="flex flex-col gap-2">
			<label for="password">Password:</label>
			<input id="password" name="password" type="password" required />
		</div>

		<div class="flex flex-col gap-2">
			<button class="px-4 py-2 font-bold bg-gray-900 text-white" type="submit">Submit</button>

			{#if form?.error}
				<div class="text-red-500">
					{form?.error}
				</div>
			{/if}
		</div>
	</form>
</section>
