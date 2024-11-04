<script lang="ts">
	import { Games } from '$lib';
	import type { PageData } from './$types';
	import { Backend } from '$lib/backend';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;

	async function logout() {
		await Backend.logout();
		await invalidateAll();
	}

	const currentMonthVerbose = new Date().toLocaleString('default', { month: 'long' });

	let totalDaily = 0;
	let finishedDaily = 0;

	for(const gameId of Object.keys(Games)) {
		const game = Games[gameId];

		for(const mode of Object.keys(game.modes)) {
			const key = `${gameId}-${mode}`;
			if(data.todayFinishes[key]) {
				finishedDaily++;
			}

			totalDaily++;
		}
	}

	function getPercentage(current: number, total: number) {
		if (current >= total) {
			return 100;
		}

		return Math.floor((current / total) * 100);
	}
</script>

<div
	class="bg-neutral-800 mt-3 flex items-center justify-between rounded-xl text-neutral-300 text-sm underline px-4 p-2"
>
	<a href="/profiles/me">My Profile</a>
	<button on:click={logout}>Log out</button>
</div>

<div class="mt-6">
	<h1 class="mt-12 mb-12 text-neutral-50 text-3xl text-center font-light font-serif">
		Gamified Simon Tatham's Puzzles
	</h1>

<div class="grid grid-cols-12 gap-4">
	<div class={`col-span-6 p-3 border rounded-2xl ${getPercentage(finishedDaily, totalDaily) >= 100 ? 'bg-green-950 border-green-800' : 'bg-neutral-800 border-neutral-600'}`}>
		<div class="flex justify-between mb-3">
			<div class="flex items-center w-full justify-between gap-3">
				<span class="text-base font-medium text-white">Daily calendar</span>
				<span class="text-base text-neutral-300">{currentMonthVerbose}</span>
			</div>
		</div>
	</div>
	<div class={`col-span-6 p-3 border rounded-2xl ${getPercentage(finishedDaily, totalDaily) >= 100 ? 'bg-green-950 border-green-800' : 'bg-neutral-800 border-neutral-600'}`}>
		<div class="flex justify-between mb-3">
			<span class="text-base font-medium text-white">Daily levels finished</span>
			<span
				class={`transform translate-y-2 text-sm font-medium font-light ${getPercentage(finishedDaily, totalDaily) >= 100 ? 'text-green-300' : 'text-green-300'}`}
				>{getPercentage(finishedDaily, totalDaily)}%</span
			>
		</div>
		<div class="w-full bg-neutral-700 rounded-full h-2.5">
			<div
				class={`h-2.5 rounded-full ${getPercentage(finishedDaily, totalDaily) >= 100 ? 'bg-green-500' : 'bg-green-500'}`}
				style={`width: ${getPercentage(finishedDaily, totalDaily)}%`}
			></div>
		</div>
	</div>
</div>

	<div class="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-12 mt-6 gap-4">
		{#each Object.keys(Games) as gameId}
			{@const game = Games[gameId]}
			<a
				id={gameId}
				href={`/games/${gameId}`}
				class="group col-span-3 p-3 bg-neutral-800 border rounded-2xl border-neutral-600"
			>
				<h2 class="group-hover:underline text-center text-lg font-semibold text-neutral-200 mb-3">
					{game.name}
				</h2>
				<div class="rounded-2xl bg-black w-full aspect-square">
					<img
						class="w-full h-full object-cover object-center rounded-lg"
						src={`/screenshots/${gameId}.png`}
						alt="Game preview"
					/>
				</div>

				<div class="h-[2px] w-full rounded-full bg-neutral-500 mt-5 mb-4 relative">
					<div class="absolute w-full flex justify-center items-center left-0">
						<div
							class="transform -translate-y-1/2 mt-[1px] bg-neutral-800 px-3 text-sm text-neutral-300"
						>
							Daily levels
						</div>
					</div>
				</div>

				<div class="grid grid-cols-12 mt-3 gap-2">
					{#each Object.keys(game.modes) as mode}
						{@const modeData = game.modes[mode]}
						<div class="col-span-4">
							<p class="text-sm text-neutral-400 text-center w-full mb-2">{modeData.name}</p>
							<a href={`/games/${gameId}/${mode}/${data.todayPath}#game`}>
								<button
									disabled={data.todayFinishes[`${gameId}-${mode}`]}
									class={`w-full flex items-center justify-center p-2 rounded-xl ${data.todayFinishes[`${gameId}-${mode}`] ? 'bg-neutral-700 text-neutral-400' : 'bg-green-500 text-white'}`}
								>
									{#if data.todayFinishes[`${gameId}-${mode}`]}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="3"
											stroke="currentColor"
											class="size-5"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="m4.5 12.75 6 6 9-13.5"
											/>
										</svg>
									{:else}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											class="size-5"
										>
											<path
												fill-rule="evenodd"
												d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
												clip-rule="evenodd"
											/>
										</svg>
									{/if}
								</button>
							</a>
						</div>
					{/each}
				</div>
			</a>
		{/each}
	</div>
</div>
