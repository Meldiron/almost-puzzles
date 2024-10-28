<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { isLeapYear } from '$lib';
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

					const finishes = await Backend.addFinish(
						data.user.$id,
						gameId,
						mode,
						+year,
						+month,
						+day
					);
					await invalidateAll();

					const date = new Date(+year, +month - 1, +day);
					date.setHours(date.getHours() + 24);
					const nextLevel = `${date.getMonth() + 1}-${date.getDate()}`;
					date.setHours(date.getHours() - 24);
					date.setHours(date.getHours() - 24);
					const previousLevel = `${date.getMonth() + 1}-${date.getDate()}`;

					const completed = finishes.levels.length;
					const total = isLeapYear(+year) ? 366 : 365;
					const halfPercentage = Math.ceil(((completed / total) * 100) / 2);

					Swal.fire({
						title: 'Level completed!',
						html: `
								<div class="flex w-full items-center justify-center">
									<div class="relative size-40">
										<svg class="size-full rotate-180" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
											<circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-green-900" stroke-width="3" stroke-dasharray="50 100" stroke-linecap="round"></circle>
											<circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-green-400" stroke-width="1" stroke-dasharray="${Math.max(1, Math.min(halfPercentage, 50))} 100" stroke-linecap="round"></circle>
										</svg>

										<div class="absolute top-9 start-1/2 transform -translate-x-1/2 text-center">
											<span class="text-3xl font-bold text-green-300">${halfPercentage >= 50 ? '✓' : total - completed}</span>
											<span class="text-xs text-green-400 block ${halfPercentage >= 50 ? 'hidden' : ''}">left in ${+year}</span>
										</div>
									</div>
								</div>

								<div class="flex items-center flex-col gap-6">
									<div class="flex items-center justify-cengter gap-4">
										<a onclick="Swal.close();" href="/games/${gameId}/${mode}/${year}/${previousLevel}#game"><button class="bg-neutral-200 text-neutral-900 rounded-xl px-3 py-2">Previous level</button></a>
										<a onclick="Swal.close();" href="/games/${gameId}/${mode}/${year}/${nextLevel}#game"><button class="bg-neutral-200 text-neutral-900 rounded-xl px-3 py-2">Next level</button></a>
									</div>

									<div class="flex items-center justify-cengter gap-4">
										<a onclick="Swal.close();" href="/#${gameId}"><button class="bg-transparent text-neutral-100 rounded-xl px-3 py-2underline ">Main menu</button></a>
										<a onclick="Swal.close();" href="/games/${gameId}/${mode}/${year}#board"><button class="bg-transparent text-neutral-100 rounded-xl px-3 py-2underline ">Level Selector</button></a>
									</div>
								</div>
							`,
						icon: 'none',
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
