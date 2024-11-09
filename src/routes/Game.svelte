<script lang="ts">
	import { Games, type Game, playUrl } from '$lib';

	export let gameId: string;
	export let mode: string;

	export let year: number;
	export let month: number;
	export let day: number;

	$: game = Games[gameId];
	$: modeData = game.modes[mode];

	function sendButton(button: string) {
		const game = document.getElementById('game') as HTMLIFrameElement;
		game?.contentWindow?.postMessage(
			{
				type: 'gstp:keypress',
				data: button
			},
			playUrl
		);
	}

	function undo() {
		const game = document.getElementById('game') as HTMLIFrameElement;
		game?.contentWindow?.postMessage(
			{
				type: 'gstp:command',
				data: 7
			},
			playUrl
		);
	}

	function redo() {
		const game = document.getElementById('game') as HTMLIFrameElement;
		game?.contentWindow?.postMessage(
			{
				type: 'gstp:command',
				data: 8
			},
			playUrl
		);
	}

	function restart() {
		const game = document.getElementById('game') as HTMLIFrameElement;
		game?.contentWindow?.postMessage(
			{
				type: 'gstp:command',
				data: 6
			},
			playUrl
		);
	}
</script>

<div class="mt-6 flex items-center justify-center gap-3">
	<button class="bg-neutral-200 text-neutral-800 px-4 py-1 rounded-xl" on:click={undo}>Undo</button>
	<button class="bg-neutral-200 text-neutral-800 px-4 py-1 rounded-xl" on:click={redo}>Redo</button>
	<button class="bg-neutral-200 text-neutral-800 px-4 py-1 rounded-xl" on:click={restart}
		>Restart</button
	>
</div>

<div
	class="mt-3 w-full max-w-[600px] mx-auto aspect-square relative rounded-xl overflow-hidden bg-neutral-950"
>
	<iframe
		id="game"
		class="responsive-iframe"
		title="Game"
		src={`${playUrl}/${gameId}-kaios.html?origin=${encodeURIComponent(window.location.origin)}&level=${gameId}-${mode}-${year}-${month}-${day}#${encodeURIComponent(`${modeData.config}#${year}${month}${day}`)}`}
	></iframe>
</div>

{#if game.keys}
	{#each game.keys as keyMap}
		<div class="flex mt-3 w-full max-w-[600px] mx-auto gap-2">
			{#each keyMap.split('') as buttonKey}
				<button
					on:click={() => sendButton(buttonKey)}
					class="text-2xl font-light bg-white w-full rounded-lg p-3">{buttonKey}</button
				>
			{/each}
		</div>
	{/each}
{/if}
