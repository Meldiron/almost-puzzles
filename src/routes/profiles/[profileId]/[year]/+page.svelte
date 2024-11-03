<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Games, isLeapYear } from '$lib';
	import type { PageData } from '../$types';

	export let data: PageData;

	let updated = Date.now();

	$: {
		data;

		updated = Date.now();
	}

	function getAllExistingModes() {
		const modes = [];

		for (const game of Object.keys(Games)) {
			for (const mode of Object.keys(Games[game].modes)) {
				if (!modes[mode]) {
					modes[mode] = {
						...Games[game].modes[mode]
					};
				}
			}
		}

		return modes;
	}

	function getOverallThisYear(year: number) {
		const total = data.finishes
			.filter((finish) => finish.year === year)
			.reduce((acc, finish) => {
				return acc + finish.levels.length;
			}, 0);

		return total;
	}

	function getOverallTotal() {
		const total = data.finishes.reduce((acc, finish) => {
			return acc + finish.levels.length;
		}, 0);

		return total;
	}

	function getOverallPercentage(year: number, mode: string) {
		const current = data.finishes
			.filter((finish) => finish.year === year && finish.mode === mode)
			.reduce((acc, finish) => {
				return acc + finish.levels.length;
			}, 0);

		const gamesWithMode = Object.keys(Games).filter((game) => Games[game].modes[mode]).length;

		const total = availableThisYear(year) * gamesWithMode;

		return getPercentage(current, total);
	}

	function thisYearCompletedAllGamemodes(gameId: string) {
		let allFinished = true;

		const game = Games[gameId];
		for (const mode of Object.keys(game.modes)) {
			const current = getGamemodeThisYearFinishes(gameId, mode, data.year);
			const total = availableThisYear(data.year);

			if (current < total) {
				allFinished = false;
				break;
			}
		}

		return allFinished;
	}

	function overallCompletedAll() {
		for (const game of Object.keys(Games)) {
			if (!thisYearCompletedAllGamemodes(game)) {
				return false;
			}
		}

		return true;
	}

	function getSortedGames() {
		return Object.keys(Games).sort((a, b) => {
			const aFinishes = getTotalFinished(a);
			const bFinishes = getTotalFinished(b);

			return bFinishes >= aFinishes ? 1 : -1;
		});
	}

	function getTotalFinished(gameId: string) {
		let total = 0;
		const records = data.finishes.filter((finish) => finish.gameId === gameId);

		for (const record of records) {
			total += record.levels.length;
		}

		return total;
	}

	function getThisYearFinishes(gameId: string, year: number) {
		let total = 0;
		const records = data.finishes.filter(
			(finish) => finish.gameId === gameId && finish.year === year
		);

		for (const record of records) {
			total += record.levels.length;
		}

		return total;
	}

	function getGamemodeThisYearFinishes(gameId: string, mode: string, year: number) {
		let total = 0;
		const records = data.finishes.filter(
			(finish) => finish.gameId === gameId && finish.year === year && finish.mode === mode
		);

		for (const record of records) {
			total += record.levels.length;
		}

		return total;
	}

	function availableThisYear(year: number) {
		let available = 0;
		if (+year === new Date().getFullYear()) {
			const firstDayOfYear = new Date(year, 0, 1);
			const now = new Date();
			const diffInSeconds = now.getTime() - firstDayOfYear.getTime();
			available = Math.ceil(diffInSeconds / (1000 * 60 * 60 * 24));
		} else {
			available = isLeapYear(+year) ? 366 : 365;
		}

		return available;
	}

	function getPercentage(current: number, total: number) {
		if (current >= total) {
			return 100;
		}

		return Math.floor((current / total) * 100);
	}
</script>

<div class="bg-neutral-800 mt-3 rounded-xl text-neutral-300 text-sm underline px-4 p-2">
	<a href="/#{data.gameId}">Main Menu</a>
</div>

{#key updated}
	<div class="w-full flex justify-center">
		<div class="w-full flex items-center flex-col">
			<div>
				<h1 class="mt-12 mb-9 text-neutral-50 text-center text-3xl font-light font-serif">
					Profile
				</h1>
				<div class="mb-12 flex items-center justify-center gap-3">
					{#if data.year - 1 >= 2014}
						<a
							on:click={() => {
								invalidateAll();
								updated = Date.now();
							}}
							href={`/profiles/${data.profileId}/${data.year - 1}`}
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
							href={`/profiles/${data.profileId}/${data.year + 1}`}
							class="text-md text-neutral-100 underline">{data.year + 1}</a
						>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/key}

<div class="grid grid-cols-6 md:grid-cols-12 mt-0 gap-4">
	<div
		class={`flex flex-col justify-between col-span-6 p-3 px-4 border border rounded-2xl ${overallCompletedAll() ? 'border-amber-500 bg-amber-950 bg-opacity-50' : 'border-neutral-600 bg-neutral-900 border-neutral-800'}`}
	>
		<div class="flex items-start justify-between gap-4">
			<div class="w-full flex flex-col items-center mt-3">
				<h2
					class={`group-hover:underline text-xl font-semibold mb-1 ${overallCompletedAll() ? 'text-amber-500' : 'text-white'}`}
				>
					Overall statistics
				</h2>
				<p class="text-neutral-400 text-sm">
					<span class="text-xl text-neutral-200 font-bold">{getOverallTotal()}</span> total finishes
				</p>
				<p class="text-neutral-400 text-sm">
					<span class="text-xl text-neutral-200 font-bold">{getOverallThisYear(data.year)}</span>
					in year {data.year}
				</p>
			</div>
		</div>

		<div class="mt-3 flex flex-col gap-5 mb-2">
			{#each Object.keys(getAllExistingModes()) as mode}
				{@const modeData = getAllExistingModes()[mode]}
				{@const percentage = getOverallPercentage(data.year, mode)}
				<div class="">
					<div class="flex justify-between mb-1">
						<span class="group-hover:underline text-base font-medium text-white"
							>{modeData.name}</span
						>
						<span
							class={`text-sm font-medium font-light ${percentage >= 100 ? 'text-amber-400' : 'text-neutral-300'}`}
							>{percentage}%</span
						>
					</div>
					<div class="w-full bg-neutral-700 rounded-full h-2.5">
						<div
							class={`h-2.5 rounded-full ${percentage >= 100 ? 'bg-amber-500' : 'bg-neutral-200'}`}
							style={`width: ${percentage}%`}
						></div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	{#each getSortedGames(data.finishes) as gameId}
		{@const game = Games[gameId]}
		<div
			id={gameId}
			class={`col-span-6 p-3 px-4 border border rounded-2xl ${thisYearCompletedAllGamemodes(gameId) ? 'border-amber-500 bg-amber-950 bg-opacity-50' : 'border-neutral-600 bg-neutral-800'}`}
		>
			<a class="group" href={`/games/${gameId}`}>
				<div class="flex items-start justify-between gap-4">
					<div class="h-32 aspect-square bg-black">
						<img
							class="w-full h-full object-cover object-center rounded-lg"
							src={`/screenshots/${gameId}.png`}
							alt="Game preview"
						/>
					</div>
					<div class="w-full">
						<h2
							class={`group-hover:underline text-xl font-semibold mb-1 ${thisYearCompletedAllGamemodes(gameId) ? 'text-amber-500' : 'text-white'}`}
						>
							{game.name}
						</h2>
						<p class="text-neutral-400 text-sm">
							<span class="text-xl text-neutral-200 font-bold">{getTotalFinished(gameId)}</span> total
							finishes
						</p>
						<p class="text-neutral-400 text-sm">
							<span class="text-xl text-neutral-200 font-bold"
								>{getThisYearFinishes(gameId, data.year)}</span
							>
							in year {data.year}
						</p>
					</div>
				</div>
			</a>

			<div class="mt-3 flex flex-col gap-5 mb-2">
				{#each Object.keys(game.modes) as mode}
					{@const modeData = game.modes[mode]}
					{@const percentage = getPercentage(
						getGamemodeThisYearFinishes(gameId, mode, data.year),
						availableThisYear(data.year)
					)}
					<a href={`/games/${gameId}/${mode}/${data.year}`} class="group">
						<div class="flex justify-between mb-1">
							<span class="group-hover:underline text-base font-medium text-white"
								>{modeData.name}</span
							>
							<span
								class={`text-sm font-medium font-light ${percentage >= 100 ? 'text-amber-400' : 'text-neutral-300'}`}
								>{percentage}%</span
							>
						</div>
						<div class="w-full bg-neutral-700 rounded-full h-2.5">
							<div
								class={`h-2.5 rounded-full ${percentage >= 100 ? 'bg-amber-500' : 'bg-neutral-200'}`}
								style={`width: ${percentage}%`}
							></div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	{/each}
</div>
