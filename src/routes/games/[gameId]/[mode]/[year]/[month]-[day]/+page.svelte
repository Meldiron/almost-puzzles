<script lang="ts">
	import { playUrl } from '$lib';
	import type { PageData } from '../../../../[gameId]-[mode]-[year]/[year]/[date]/$types';

	export let data: PageData;

	function sendButton(button: string) {
		document.getElementById('game').contentWindow.postMessage(
			{
				type: 'gstp:keypress',
				data: button
			},
			playUrl
		);
	}

	function undo() {
		document.getElementById('game').contentWindow.postMessage(
			{
				type: 'gstp:command',
				data: 7
			},
			playUrl
		);
	}

	function redo() {
		document.getElementById('game').contentWindow.postMessage(
			{
				type: 'gstp:command',
				data: 8
			},
			playUrl
		);
	}

	function restart() {
		document.getElementById('game').contentWindow.postMessage(
			{
				type: 'gstp:command',
				data: 6
			},
			playUrl
		);
	}

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
							<a onclick="Swal.close();" href="/#${data.gameId}"><button class="bg-transparent text-neutral-100 rounded-xl px-3 py-2underline ">Main menu</button></a>
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

<div class="bg-neutral-800 mt-3 rounded-xl text-neutral-300 text-sm underline px-4 p-2">
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
		src={`${playUrl}/${data.gameId}-kaios.html?origin=${encodeURIComponent(window.location.origin)}&level=${data.gameId}-${data.mode}-${data.year}-${data.month}-${data.day}#${encodeURIComponent(`${data.game.modes[data.mode].config}#${data.year}${data.month}${data.day}`)}`}
	></iframe>
</div>

{#if data.game.keys}
	<div class="flex mt-3 w-full max-w-[600px] mx-auto gap-2">
		{#each data.game.keys.split('') as buttonKey}
			<button
				on:click={() => sendButton(buttonKey)}
				class="text-2xl font-light bg-white w-full rounded-lg p-3">{buttonKey}</button
			>
		{/each}
	</div>
{/if}
