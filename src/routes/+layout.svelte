<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { Backend } from '$lib/backend';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	window.addEventListener('message', async function (message) {
		if (message.data.type === 'gstp:status') {
			const level = message.data.data;
			const [gameId, mode, year, month, day] = level.split('-', 5);

			Swal.fire({
				didOpen: async () => {
					Swal.showLoading();

					await Backend.addFinish(data.user.$id, gameId, mode, +year, +month, +day);
					await invalidateAll();

					const date = new Date(+year, +month - 1, +day);
					date.setHours(date.getHours() + 24);
					const nextLevel = `${date.getMonth() + 1}-${date.getDate()}`;
					date.setHours(date.getHours() - 24);
					date.setHours(date.getHours() - 24);
					const previousLevel = `${date.getMonth() + 1}-${date.getDate()}`;

					Swal.fire({
						title: 'Level completed!',
						html: `
								<div class="flex items-center flex-col gap-6">
									<div class="flex items-center justify-cengter gap-4">
										<a onclick="Swal.close();" href="/games/${gameId}/${mode}/${year}/${previousLevel}"><button class="bg-neutral-200 text-neutral-900 rounded-xl px-3 py-2">Previous level</button></a>
										<a onclick="Swal.close();" href="/games/${gameId}/${mode}/${year}/${nextLevel}"><button class="bg-neutral-200 text-neutral-900 rounded-xl px-3 py-2">Next level</button></a>
									</div>

									<div class="flex items-center justify-cengter gap-4">
										<a onclick="Swal.close();" href="/games/${gameId}/${mode}/${year}#board"><button class="bg-transparent text-neutral-100 rounded-xl px-3 py-2underline ">Level Selector</button></a>
									</div>
								</div>
							`,
						icon: 'success',
						showDenyButton: false,
						showCancelButton: false,
						showConfirmButton: false
					});
				}
			});
		}
	});
</script>

<div class="mx-auto max-w-4xl w-full px-4 mb-10">
	<slot />
</div>
