<script>
	import { Games } from '$lib';
</script>

<div class="mt-6">
	<h1 class="mt-12 mb-12 text-neutral-50 text-3xl text-center font-light font-serif">
		Gamified Simon Tatham's Puzzles
	</h1>

	<div class="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-12 mt-6 gap-4">
		{#each Object.keys(Games) as gameId}
			{@const game = Games[gameId]}
			<a
				href={`/games/${gameId}`}
				class="group col-span-3 p-3 bg-neutral-800 border rounded-2xl border-neutral-600"
			>
				<h2 class="group-hover:underline text-center text-lg font-semibold text-neutral-200 mb-3">
					{game.name}
				</h2>
				<div class="rounded-2xl bg-black w-full aspect-square"></div>
			</a>
		{/each}
	</div>
</div>
