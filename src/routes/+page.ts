import { Games } from '$lib';
import { Backend } from '$lib/backend';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, parent }) => {
	const todayYear = new Date().getFullYear();
	const todayMonth = new Date().getMonth() + 1;
	const todayDay = new Date().getDate();

	const data = await parent();

	const finishes = await Backend.getAllFinishes(data.user.$id);

	let issueYear = todayYear;
	let issueMonth = todayMonth;
	let issueDay = todayDay;

	let issueDate = url.searchParams.get('issue');

	if (issueDate) {
		issueYear = parseInt(issueDate.split('-')[0]);
		issueMonth = parseInt(issueDate.split('-')[1]);
		issueDay = parseInt(issueDate.split('-')[2]);

		if (issueYear < 2014) {
			issueYear = todayYear;
			issueMonth = todayMonth;
			issueDay = todayDay;
		} else if (issueYear > todayYear) {
			issueYear = todayYear;
			issueMonth = todayMonth;
			issueDay = todayDay;
		} else if (issueYear === todayYear && issueMonth > todayMonth) {
			issueMonth = todayMonth;
			issueDay = todayDay;
		} else if (issueYear === todayYear && issueMonth === todayMonth && issueDay > todayDay) {
			issueDay = todayDay;
		}
	}

	const issuePath = `${issueYear}/${issueMonth}-${issueDay}`;

	const issueFinishes: any = {};

	for (const gameId of Object.keys(Games)) {
		const game = Games[gameId];

		for (const mode of Object.keys(game.modes)) {
			let isFinished = false;
			for (const finish of finishes) {
				if (finish.gameId === gameId && finish.mode === mode && finish.year === issueYear) {
					if (finish.levels.includes(`${issueMonth}-${issueDay}`)) {
						isFinished = true;
						break;
					}
				}
			}

			issueFinishes[`${gameId}-${mode}`] = isFinished;
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

				const isSelected = year === issueYear && month === issueMonth - 1 && day === issueDay;
				const isFuture =
					year > todayYear ||
					(year === todayYear && month > todayMonth - 1) ||
					(year === todayYear && month === todayMonth - 1 && day > todayDay);

				days.push({
					isSelected,
					isFuture,
					finishesPercentage: Math.round((finishesOnDay / totalDailyLevels) * 100),
					finishesSameDayPercentage: Math.round((finishesOnSameDay / totalDailyLevels) * 100)
				});
			}

			calendar[`${year}-${month + 1}`] = days;
		}
	}

	let issueTotal = 0;
	let issueFinished = 0;
	for (const gameId of Object.keys(Games)) {
		const game = Games[gameId];

		for (const mode of Object.keys(game.modes)) {
			const key = `${gameId}-${mode}`;
			if (issueFinishes[key]) {
				issueFinished++;
			}

			issueTotal++;
		}
	}

	return {
		issuePath,

		calendar,

		issueYear,
		issueMonth,
		issueDay,
		issueFinishes,
		issueFinished,
		issueTotal
	};
};
