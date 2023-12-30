<script>
	export let data;
</script>

<svelte:head>
	<title>{data.title} - {data.blog.site}</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<section class="my-10">
	<a href="/publish?id={data.id}">edit this post</a>
</section>

<section class="prose">
	<h1>{data.title}</h1>
	<div>{data.content}</div>
</section>
