<script>
	export let data;
</script>

<h1 class="text-3xl font-bold underline">{data.site}</h1>
<h1 class="text-3xl font-bold underline">{data.email}</h1>
<h1 class="text-3xl font-bold underline">{data.github}</h1>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.red.100);
	}
</style>
