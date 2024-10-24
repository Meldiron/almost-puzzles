<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { Backend } from '$lib/backend';
	import '../app.css';

	window.addEventListener('message', async function (message) {
		if (message.data.type === 'gstp:status') {
			const level = message.data.data;
			const [gameId, mode, year, month, day] = level.split('-', 5);
			await Backend.addFinish(gameId, mode, year, month, day);
			// TODO: Show alert
			await invalidateAll();
			await goto(`/games/${gameId}/${mode}/${year}`);
		}
	});
</script>

<div class="mx-auto max-w-4xl w-full px-4 mb-10">
	<slot />
</div>
