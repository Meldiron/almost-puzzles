<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="bg-neutral-800 mt-3 rounded-xl text-neutral-300 text-sm underline px-4 p-2">
	<a href="/#{data.gameId}">Main Menu</a>
</div>

<h1>Page</h1>

<p>
	{JSON.stringify(data)}
</p>
