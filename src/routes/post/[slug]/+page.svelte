<script>
	export let data;
	let { blog, post, session, supabase } = data;
	$: ({ supabase, session } = data);

	import { goto } from '$app/navigation';
	import { dateToString } from '$lib/tools';
	import { Calendar, User, Pencil, Trash, Heart, Users } from 'lucide-svelte';

	const deletePost = async () => {
		const { error } = await supabase.from('blog_post').delete().eq('id', post.id);
		if (error) {
			console.error(error.message);
		} else {
			goto('/');
		}
	};
</script>

<svelte:head>
	<title>{post.title} - {blog.site}</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<section class="flex flex-col gap-5">
	<div class="border-b pb-10 border-black">
		<h1 class="text-4xl font-bold">{post.title}</h1>
	</div>

	<div class="flex flex-col justify-between gap-5 md:flex-row">
		<div class="text-gray-700 flex gap-5">
			<div class="flex gap-1 items-center">
				<User size="20" />
				{post.author}
			</div>
			<div class="flex gap-1 items-center">
				<Calendar size="20" />
				{dateToString(new Date(post.created_at))}
			</div>
		</div>

		<div class="text-gray-700 flex gap-5">
			{#if session?.user?.id === post.author_id}
				<div class="flex gap-1 items-center">
					<Pencil size="20" />
				</div>
				<div class="flex gap-1 items-center">
					<button on:click={deletePost}><Trash size="20" /></button>
				</div>
			{:else}
				<div class="flex gap-1 items-center">
					<Users size="20" /> 3257
				</div>
				<div class="flex gap-1 items-center">
					<Heart size="20" /> 85
				</div>
			{/if}
		</div>
	</div>

	<div class="prose max-w-none mb-20 my-10">{@html post.html.code}</div>
</section>
