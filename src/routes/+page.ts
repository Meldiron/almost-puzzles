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

	const calendar: any = {};

	const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	let totalDailyLevels = 0;
	for (const gameId of Object.keys(Games)) {
		const game = Games[gameId];
		totalDailyLevels += Object.keys(game.modes).length;
	}

	for (let year = 2014; year <= todayYear; year++) {
		for (let month = 0; month < 12; month++) {
			if (year === todayYear && month > todayMonth - 1) {
				continue;
			}

			const days: any[] = [];

			for (let day = 1; day <= daysInMonths[month]; day++) {
				const finishesOnDay = finishes.filter(
					(finish) => finish.year === year && finish.levels.includes(`${month + 1}-${day}`)
				).length;
				const finishesOnSameDay = finishes.filter(
					(finish) => finish.year === year && finish.levelsSameDay.includes(`${month + 1}-${day}`)
				).length;

				days.push({
					finishesPercentage: Math.round((finishesOnDay / totalDailyLevels) * 100),
					finishesSameDayPercentage: Math.round((finishesOnSameDay / totalDailyLevels) * 100)
				});
			}

			calendar[`${year}-${month + 1}`] = days;
		}
	}

	return {
		todayFinishes,

		todayYear,
		todayMonth,
		todayDay,
		todayPath,

		calendar
	};
};
