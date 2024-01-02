<script>
	export let data;
	let { blog, post, session, supabase } = data;

	import { goto } from '$app/navigation';

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

{#if session?.user?.id === post.author_id}
	<section class="my-10 flex gap-5">
		<a href="/publish?id={post.id}">edit</a>
		<button on:click={deletePost}>delete</button>
	</section>
{/if}

<section class="prose max-w-none">
	<h1>{post.title}</h1>
	<div>{@html post.html.code}</div>
</section>
