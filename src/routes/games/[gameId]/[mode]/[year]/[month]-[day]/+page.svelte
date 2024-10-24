<script lang="ts">
	import { playUrl } from '$lib';
	import type { PageData } from '../../../../[gameId]-[mode]-[year]/[year]/[date]/$types';

	export let data: PageData;
</script>

<div class="bg-neutral-800 mt-3 rounded-xl text-neutral-300 text-sm underline px-4 p-2">
	<a href={`/games/${data.gameId}/${data.mode}/${data.year}`}>Back to levels</a>
</div>

<div class="mt-6">
	<h1 class="mt-12 mb-2 text-neutral-50 text-3xl text-center font-light font-serif">
		{data.game.name}
	</h1>
	<p class="text-center mb-12 text-sm font-light font-serif text-neutral-200">
		{data.day}.{data.month}.{data.year}
	</p>
</div>

<div
	class="mt-6 w-full max-w-[600px] mx-auto aspect-square relative rounded-xl overflow-hidden bg-neutral-950"
>
	<iframe
		class="responsive-iframe"
		title="Game"
		src={`${playUrl}/${data.gameId}-kaios.html?origin=${encodeURIComponent(window.location.origin)}&level=${data.gameId}-${data.mode}-${data.year}-${data.month}-${data.day}#${encodeURIComponent(`${data.game.modes[data.mode].config}#${data.year}${data.month}${data.day}`)}`}
	></iframe>
</div>
