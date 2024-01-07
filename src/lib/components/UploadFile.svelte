<script>
	export let supabase;
	let files;
	let ossPath = '';
	let uploading = false;

	const uploadFile = async () => {
		if (!files || files.length === 0) return;
		const file = files[0];

		try {
			uploading = true;
			const res = await supabase.storage.from('blogfiles').upload(file.name, file);

			if (res.error) {
				alert(res.error.message);
			} else {
				ossPath = `https://phtdanklclzeaymjezeh.supabase.co/storage/v1/object/public/blogfiles/${res.data.path}`;
			}

			uploading = false;
		} catch (error) {
			console.error(error);
		}
	};
</script>

<div class="flex gap-2">
	<input type="text" class="flex-grow" value={ossPath} />
	<label for="file" class="btn-secondary {uploading && 'cursor-progress'}">upload file</label>
	<input
		id="file"
		class="hidden"
		type="file"
		disabled={uploading}
		bind:files
		on:change={uploadFile}
	/>
</div>
