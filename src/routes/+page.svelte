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
						class="w-full h-full object-cover object-center"
						src={`/screenshots/${gameId}.png`}
						alt="Game preview"
					/>
				</div>

				<div class="grid grid-cols-12 mt-3 gap-2">
					{#each Object.keys(game.modes) as mode}
						{@const modeData = game.modes[mode]}
						<div class="col-span-4">
							<a href={`/games/${gameId}/${mode}/${data.todayPath}#game`}>
								<button
									class={`w-full flex items-center justify-center p-2 rounded-xl ${data.todayFinishes[`${gameId}-${mode}`] ? 'bg-neutral-700 text-neutral-400' : 'bg-green-500 text-white'}`}
								>
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
								</button>
							</a>
						</div>
					{/each}
				</div>
			</a>
		{/each}
	</div>
</div>
