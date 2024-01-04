<script>
	export let data;
	export let form;
	let { blog, session, supabase, post } = data;
	const { title, author, content, created_at } = data.post;
	$: ({ supabase, session } = data);

	import { goto } from '$app/navigation';
	import { Calendar, User, Pencil, Trash, Heart, Users } from 'lucide-svelte';
	import EditForm from '$lib/components/EditForm.svelte';

	const deletePost = async () => {
		const { error } = await supabase.from('blog_post').delete().eq('id', post.id);
		if (error) {
			console.error(error.message);
		} else {
			goto('/');
		}
	};

	let isEditing = false;

	let cancelHandle = async () => {
		//恢复初始值
		if (post.title !== title) post.title = title;
		if (post.author !== author) post.author = author;
		if (post.content !== content) post.content = content;
		if (post.created_at !== created_at) post.created_at = created_at;
		isEditing = false;
	};

	let submitHandle = async () => {
		console.log(post);
		return;
		const res = await supabase
			.from('blog_post')
			.update({
				created_at: new Date(data.get('created_at')),
				updated_at: new Date(),
				title: data.get('title'),
				content: data.get('content'),
				author: data.get('author')
			})
			.eq('id', post.id)
			.select('id')
			.single();

		if (res.error) {
			return fail(422, {
				error: res.error.message
			});
		}
	};
</script>

<svelte:head>
	<title>{post.title} - {blog.site}</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

{#if isEditing}
	<EditForm {post} {form} {cancelHandle} {submitHandle} />
{:else}
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
					{post.created_at}
				</div>
			</div>

			<div class="text-gray-700 flex gap-5">
				<div class="flex gap-1 items-center">
					<Users size="20" /> 3257
				</div>
				<div class="flex gap-1 items-center">
					<Heart size="20" /> 85
				</div>
				{#if session?.user?.id === post.author_id}
					<div class="flex gap-1 items-center">
						<button
							on:click={() => {
								isEditing = !isEditing;
							}}
						>
							<Pencil size="20" />
						</button>
					</div>
					<div class="flex gap-1 items-center">
						<button on:click={deletePost}><Trash size="20" /></button>
					</div>
				{/if}
			</div>
		</div>

		<div class="prose max-w-none mb-20 my-10">{@html post.html}</div>
	</section>
{/if}
