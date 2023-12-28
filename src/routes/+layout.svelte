<script>
	import '../app.css';
	export let data;
</script>

<header class="container mx-auto my-10 flex gap-5">
	<a href="/">Home</a>
	<a href="/publish">Publish</a>
	<a href="/about">About</a>
</header>

<main class="container mx-auto my-20">
	<slot />
</main>

<footer class="container mx-auto my-20 text-center">
	© 2023 {data.copyright}
</footer>
