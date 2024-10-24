import { Games } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		mode: params.mode,
		gameId: params.gameId,
		year: +params.year,
		game: Games[params.gameId],
		month: +params.month,
		day: +params.day
	};
};
