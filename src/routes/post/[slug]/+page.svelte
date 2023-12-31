<script>
	export let data;
	let { post, session } = data;
</script>

<svelte:head>
	<title>{post.title} - {data.blog.site}</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

{#if session?.user?.id === post.user_id}
	<section class="my-10">
		<a href="/publish?id={post.id}">edit this post</a>
	</section>
{/if}

<section class="prose">
	<h1>{post.title}</h1>
	<div>{post.content}</div>
</section>
