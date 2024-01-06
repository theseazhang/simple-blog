<script>
	export let data;
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
	let err = null;

	let cancelHandle = async () => {
		//恢复初始值
		if (post.title !== title) post.title = title;
		if (post.author !== author) post.author = author;
		if (post.content !== content) post.content = content;
		if (post.created_at !== created_at) post.created_at = created_at;
		isEditing = false;
	};

	let submitHandle = async () => {
		//验证是否有变更
		if (
			post.title === title &&
			post.author === author &&
			post.content === content &&
			post.created_at === created_at
		) {
			isEditing = false;
			return;
		}

		const { error } = await supabase
			.from('blog_post')
			.update({
				created_at: new Date(post.created_at),
				updated_at: new Date(),
				title: post.title,
				content: post.content,
				author: post.author
			})
			.eq('id', post.id);

		if (error) {
			err = error.message;
		} else {
			//重新加载页面
			if (post.content !== content) {
				alert('文章内容有更新，重新加载页面');
				location.reload();
			}
			isEditing = false;
		}
	};
</script>

<svelte:head>
	<title>{post.title} - {blog.site}</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

{#if isEditing}
	<EditForm {post} {err} {cancelHandle} {submitHandle} />
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

			{#if session?.user?.id === post.author_id}
				<div class="text-gray-700 flex gap-5">
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
				</div>
			{/if}
		</div>

		<div class="prose max-w-none mb-20 my-10">{@html post.html}</div>
	</section>
{/if}
