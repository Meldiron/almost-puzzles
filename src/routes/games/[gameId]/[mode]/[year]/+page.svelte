<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from '../../../[gameId]-[mode]-[year]/[year]/$types';

	export let data: PageData;

	const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
	const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	const year = data.year;
	const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	if (isLeapYear) {
		daysInMonths[1] = 29;
	}

	function isInFuture(year: number, month: number, day: number) {
		const now = Date.now();
		const futureNow = new Date(year, month - 1, day).getTime();
		return futureNow > now;
	}

	let updated = Date.now();
</script>

<div class="bg-neutral-800 mt-3 rounded-xl text-neutral-300 text-sm underline px-4 p-2">
	<a href="/">Back to selection</a>
</div>

{#key updated}
	<div class="w-full flex justify-center">
		<div class="w-full flex items-center flex-col mb-10">
			<div>
				<h1 class="mt-6 mb-3 text-neutral-50 text-center text-3xl font-light font-serif">
					{data.game.name}
				</h1>
				<div class="mb-2 flex items-center justify-center gap-3">
					{#each Object.keys(data.game.modes) as mode}
						{@const modeData = data.game.modes[mode]}

						{#if mode === data.mode}
							<p class="text-sm text-neutral-300">{modeData.name}</p>
						{:else}
							<a
								on:click={() => {
									invalidateAll();
									updated = Date.now();
								}}
								href={`/games/${data.gameId}/${mode}/${data.year}`}
								class="text-sm text-neutral-600 underline">{modeData.name}</a
							>
						{/if}
					{/each}
				</div>
				<div class="mb-6 flex items-center justify-center gap-3">
					<a
						on:click={() => {
							invalidateAll();
							updated = Date.now();
						}}
						href={`/games/${data.gameId}/${data.mode}/${data.year - 1}`}
						class="text-sm text-neutral-600 underline">{data.year - 1}</a
					>
					<p class="text-sm text-neutral-300">{data.year}</p>
					<a
						on:click={() => {
							invalidateAll();
							updated = Date.now();
						}}
						href={`/games/${data.gameId}/${data.mode}/${data.year + 1}`}
						class="text-sm text-neutral-600 underline">{data.year + 1}</a
					>
				</div>
			</div>
			<div class="max-w-[500px] w-full">
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
										href={`/games/${data.gameId}/${data.mode}/${data.year}/${month}-${day}`}
									>
										{#if data.finishes.includes(`${month}-${day}`)}
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
