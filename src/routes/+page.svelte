<script lang="ts">
	import { Games } from '$lib';
	import type { PageData } from './$types';
	import { Backend } from '$lib/backend';
	import { goto, invalidateAll } from '$app/navigation';
	import { onMount, tick } from 'svelte';

	export let data: PageData;

	const monthNamesShort = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	let calendarMonth = new Date().getMonth();
	let calendarYear = new Date().getFullYear();
	let currentCalendar = data.calendar[`${calendarYear}-${calendarMonth + 1}`];

	async function nextCalendar() {
		calendarMonth++;

		if (calendarMonth > 11) {
			calendarYear++;
			calendarMonth = 0;
		}

		currentCalendar = data.calendar[`${calendarYear}-${calendarMonth + 1}`] ?? [];

		await tick();
		calendarHeight = calendarEl ? calendarEl.clientHeight : 0;
	}

	onMount(() => {
		calendarHeight = calendarEl ? calendarEl.clientHeight : 0;
	});

	async function previousCalendar() {
		calendarMonth--;

		if (calendarMonth < 0) {
			calendarYear--;
			calendarMonth = 11;
		}

		currentCalendar = data.calendar[`${calendarYear}-${calendarMonth + 1}`] ?? [];

		await tick();
		calendarHeight = calendarEl ? calendarEl.clientHeight : 0;
	}

	let calendarHeight = 0;
	let calendarEl;

	function setIssue(day: number) {
		goto(`/?issue=${calendarYear}-${calendarMonth + 1}-${day}`, { replaceState: true });
	}

	async function logout() {
		await Backend.logout();
		await invalidateAll();
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

	<div class="grid grid-cols-6 sm:grid-cols-12 gap-4" bind:this={calendarEl}>
		<div class={`col-span-6 p-3 border rounded-2xl bg-neutral-800 border-neutral-600`}>
			<div class="flex items-center justify-between mb-3">
				<div>
					<button
						on:click={previousCalendar}
						class="text-neutral-200 bg-neutral-700 rounded-md py-4 px-2"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 19.5 8.25 12l7.5-7.5"
							/>
						</svg>
					</button>
				</div>
				<div class="flex items-center flex-col w-full justify-center gap-1">
					<span class="text-base font-medium text-white">Puzzle calendar</span>
					<span class="text-base text-neutral-400">{monthNames[calendarMonth]} {calendarYear}</span>
				</div>

				<div>
					<button
						on:click={nextCalendar}
						class="text-neutral-200 bg-neutral-700 rounded-md py-4 px-2"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
						</svg>
					</button>
				</div>
			</div>
			{#if currentCalendar.length === 0}
				<p class="mt-6 text-center text-neutral-200">This month is not available.</p>
			{/if}
			<div class="grid grid-cols-7 gap-4 py-3">
				{#each currentCalendar as calendarDay, index}
					<button
						on:click={() => setIssue(index + 1)}
						class="hover:scale-110 transition-all duration-250 transform rounded-full col-span-1 flex items-center justify-center text-center text-neutral-300 relative"
					>
						<div class="relative w-full">
							<div class="absolute inset-0 z-[2] flex items-center justify-center text-center">
								<p>{index + 1}</p>
							</div>
							<svg
								class="size-full -rotate-90"
								viewBox="0 0 36 36"
								xmlns="http://www.w3.org/2000/svg"
							>
								<!-- Background Fill -->
								<circle
									cx="18"
									cy="18"
									r="16"
									fill="currentColor"
									class={`${calendarDay.finishesSameDayPercentage === 100 ? 'text-green-900' : calendarDay.finishesPercentage === 100 ? 'text-blue-900' : 'text-neutral-800'}`}
								></circle>

								<!-- Background -->
								<circle
									cx="18"
									cy="18"
									r="16"
									fill="none"
									class="stroke-current text-neutral-700"
									stroke-width="2"
								></circle>
								<!-- Any day -->
								{#if calendarDay.finishesPercentage > 0}
									<circle
										cx="18"
										cy="18"
										r="16"
										fill="none"
										class="stroke-current text-blue-500"
										stroke-width="2"
										stroke-dasharray="100"
										stroke-dashoffset={100 - calendarDay.finishesPercentage}
										stroke-linecap="round"
									></circle>
								{/if}
								<!-- Same day -->

								{#if calendarDay.finishesSameDayPercentage > 0}
									<circle
										cx="18"
										cy="18"
										r="16"
										fill="none"
										class="stroke-current text-green-500"
										stroke-width="2"
										stroke-dasharray="100"
										stroke-dashoffset={100 - calendarDay.finishesSameDayPercentage}
										stroke-linecap="round"
									></circle>
								{/if}
							</svg>
						</div>
					</button>
				{/each}
			</div>
		</div>
	</div>

	<h1 class="mt-12 mb-8 text-neutral-50 text-3xl text-center font-light font-serif">
		Levels on {data.issueDay}
		{monthNamesShort[data.issueMonth - 1]}
		{data.issueYear}
	</h1>

	<div
		class={`mt-0 z-[5] mx-auto w-full max-w-md sticky top-3 p-3 border rounded-2xl ${getPercentage(data.issueFinished, data.issueTotal) >= 100 ? 'bg-neutral-800 border-neutral-600' : 'bg-neutral-800 border-neutral-600'}`}
	>
		<div class="flex justify-between mb-3">
			<span class="text-base font-medium text-white"
				>Finishes on {data.issueDay} {monthNamesShort[data.issueMonth - 1]} {data.issueYear}
			</span>
			<span
				class={`transform translate-y-2 text-sm font-medium font-light ${getPercentage(data.issueFinished, data.issueTotal) >= 100 ? 'text-blue-300' : 'text-blue-300'}`}
				>{getPercentage(data.issueFinished, data.issueTotal)}%</span
			>
		</div>
		<div class="w-full bg-neutral-700 rounded-full h-2.5">
			<div
				class={`h-2.5 rounded-full ${getPercentage(data.issueFinished, data.issueTotal) >= 100 ? 'bg-blue-500' : 'bg-blue-500'}`}
				style={`width: ${getPercentage(data.issueFinished, data.issueTotal)}%`}
			></div>
		</div>
	</div>

	<div class="mt-3 grid grid-cols-6 sm:grid-cols-9 md:grid-cols-12 mt-6 gap-4">
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
							Game modes
						</div>
					</div>
				</div>

				<div class="grid grid-cols-12 mt-3 gap-2">
					{#each Object.keys(game.modes) as mode}
						{@const modeData = game.modes[mode]}
						<div class="col-span-4">
							<p class="text-sm text-neutral-400 text-center w-full mb-2">{modeData.name}</p>
							<a href={`/games/${gameId}/${mode}/${data.issuePath}#game`}>
								<button
									disabled={data.issueFinishes[`${gameId}-${mode}`]}
									class={`w-full flex items-center justify-center p-2 rounded-xl ${data.issueFinishes[`${gameId}-${mode}`] ? 'bg-neutral-700 text-neutral-400' : 'bg-green-500 text-white'}`}
								>
									{#if data.issueFinishes[`${gameId}-${mode}`]}
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
