<script lang="ts">
	import Game from '../../../../../Game.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: {
		if (data.finished) {
			Swal.fire({
				title: 'Level already finished!',
				html: `
					<div class="flex items-center flex-col gap-6">
						<div class="flex items-center justify-cengter gap-4">
							<button onclick="Swal.close();" class="bg-neutral-200 text-neutral-900 rounded-xl px-3 py-2">Play anyway</button>
						</div>

						<div class="flex items-center justify-cengter gap-4">
							<a onclick="Swal.close();" href="/?issue=${data.year}-${data.month}-${data.day}#${data.gameId}"><button class="bg-transparent text-neutral-100 rounded-xl px-3 py-2underline ">Main menu</button></a>
							<a onclick="Swal.close();" href="/games/${data.gameId}/${data.mode}/${data.year}#board"><button class="bg-transparent text-neutral-100 rounded-xl px-3 py-2underline ">Level Selector</button></a>
						</div>
					</div>
				`,
				icon: 'warning',
				showDenyButton: false,
				showCancelButton: false,
				showConfirmButton: false
			});
		}
	}
</script>

<div
	class="bg-neutral-800 mt-3 flex items-center justify-between rounded-xl text-neutral-300 text-sm underline px-4 p-2"
>
	<a href={`/?issue=${data.year}-${data.month}-${data.day}#${data.gameId}`}>Main Menu</a>
	<a href={`/games/${data.gameId}/${data.mode}/${data.year}#board`}>Back to levels</a>
</div>

<div class="mt-6">
	<h1 class="mt-12 mb-2 text-neutral-50 text-3xl text-center font-light font-serif">
		{data.game.name}
	</h1>
	<p class="text-center mb-12 text-sm font-light font-serif text-neutral-200">
		{data.day}.{data.month}.{data.year}
	</p>
</div>

<div class="mt-6">
	<Game gameId={data.gameId} mode={data.mode} year={data.year} month={data.month} day={data.day} />
</div>
