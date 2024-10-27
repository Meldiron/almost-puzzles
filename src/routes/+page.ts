import { Games } from '$lib';
import { Backend } from '$lib/backend';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const todayYear = new Date().getFullYear();
	const todayMonth = new Date().getMonth() + 1;
	const todayDay = new Date().getDate();
	const todayPath = `${todayYear}/${todayMonth}-${todayDay}`;

	const data = await parent();

	const finishes = await Backend.getAllFinishes(data.user.$id);

	const todayFinishes: any = {};

	for (const gameId of Object.keys(Games)) {
		const game = Games[gameId];

		for (const mode of Object.keys(game.modes)) {
			const modeData = game.modes[mode];

			let isFinished = false;
			for (const finish of finishes) {
				if (finish.gameId === gameId && finish.mode === mode && finish.year === todayYear) {
					if (finish.levels.includes(`${todayMonth}-${todayDay}`)) {
						isFinished = true;
						break;
					}
				}
			}

			todayFinishes[`${gameId}-${mode}`] = isFinished;
		}
	}

	return {
		todayFinishes,

		todayYear,
		todayMonth,
		todayDay,
		todayPath
	};
};
