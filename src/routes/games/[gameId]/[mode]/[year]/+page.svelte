<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { isInFuture, isLeapYear } from '$lib';
	import type { PageData } from './$types';

	export let data: PageData;

	const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
	const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	const year = data.year;
	if (isLeapYear(year)) {
		daysInMonths[1] = 29;
	}

	let updated = Date.now();
</script>

<div class="bg-neutral-800 mt-3 rounded-xl text-neutral-300 text-sm underline px-4 p-2">
	<a href={`/#${data.gameId}`}>Main Menu</a>
</div>

{#key updated}
	<div class="w-full flex justify-center">
		<div class="w-full flex items-center flex-col mb-10">
			<div>
				<h1 class="mt-6 mb-9 text-neutral-50 text-center text-3xl font-light font-serif">
					{data.game.name}
				</h1>
				<div class="mb-4 flex items-center justify-center gap-3">
					{#each Object.keys(data.game.modes) as mode}
						{@const modeData = data.game.modes[mode]}

						{#if mode === data.mode}
							<p class="text-md text-neutral-800 bg-neutral-300 rounded-full px-3 py-1">
								{modeData.name}
							</p>
						{:else}
							<a
								on:click={() => {
									invalidateAll();
									updated = Date.now();
								}}
								href={`/games/${data.gameId}/${mode}/${data.year}`}
								class="text-md text-neutral-100 underline">{modeData.name}</a
							>
						{/if}
					{/each}
				</div>
				<div class="mb-12 flex items-center justify-center gap-3">
					{#if data.year - 1 >= 2014}
						<a
							on:click={() => {
								invalidateAll();
								updated = Date.now();
							}}
							href={`/games/${data.gameId}/${data.mode}/${data.year - 1}`}
							class="text-md text-neutral-100 underline">{data.year - 1}</a
						>
					{/if}
					<p class="text-md text-neutral-800 bg-neutral-300 rounded-full px-3 py-1">{data.year}</p>
					{#if data.year + 1 <= new Date().getFullYear()}
						<a
							on:click={() => {
								invalidateAll();
								updated = Date.now();
							}}
							href={`/games/${data.gameId}/${data.mode}/${data.year + 1}`}
							class="text-md text-neutral-100 underline">{data.year + 1}</a
						>
					{/if}
				</div>
			</div>
			<div class="max-w-[500px] w-full" id="board">
				<div class="grid w-full" style="grid-template-columns: repeat(13, minmax(0, 1fr));">
					<div class="col-span-1">
						<div class=" w-full aspect-square flex items-center justify-center">
							<p class="opacity-0 text-sm text-neutral-200 font-serif">0</p>
						</div>
						{#each Array.from({ length: 31 }, (_, i) => i + 1) as day}
							<div class=" w-full aspect-square flex items-center justify-center">
								{#if day % 5 === 0 || day === 1}
									<p class="text-sm text-neutral-200 font-serif">{day}</p>
								{:else}
									<p class="text-xs text-neutral-500 font-serif">{day}</p>
								{/if}
							</div>
						{/each}
					</div>
					{#each Array.from({ length: 12 }, (_, i) => i + 1) as month}
						<div class="col-span-1">
							<div class=" w-full aspect-square flex items-center justify-center">
								<p class="text-sm text-neutral-200 font-serif">{months[month - 1]}</p>
							</div>

							{#each Array.from({ length: 31 }, (_, i) => i + 1) as day}
								{#if daysInMonths[month - 1] < day || isInFuture(data.year, month, day)}
									<div
										class={`w-full  aspect-square border border-neutral-800 border-l-0 border-t-0 bg-neutral-800 flex items-center justify-center text-neutral-700`}
									>
										~
									</div>
								{:else}
									<a
										class="group"
										href={`/games/${data.gameId}/${data.mode}/${data.year}/${month}-${day}#game`}
									>
										{#if data.finishes.levels.includes(`${month}-${day}`)}
											<div
												class={`group-hover:border-neutral-300 group-hover:border-l group-hover:border-t w-full flex flex-col items-center justify-center aspect-square border border-neutral-800 ${month === 1 ? '' : 'border-l-0'} ${day === 1 ? '' : 'border-t-0'} bg-green-500`}
											></div>
										{:else}
											<div
												class={`group-hover:border-neutral-300 group-hover:border-l group-hover:border-t w-full flex flex-col items-center justify-center aspect-square border border-neutral-800 ${month === 1 ? '' : 'border-l-0'} ${day === 1 ? '' : 'border-t-0'}  bg-neutral-950 ${day % 2 === (month % 2 === 0 ? 0 : 1) ? 'bg-opacity-50' : 'bg-opacity-25'}`}
											></div>
										{/if}
									</a>
								{/if}
							{/each}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/key}
