import { Games } from '$lib';
import { Backend } from '$lib/backend';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const data = await parent();

	return {
		finishes: await Backend.getFinishes(data.user.$id, params.gameId, params.mode, +params.year),

		mode: params.mode,
		gameId: params.gameId,
		year: +params.year,
		game: Games[params.gameId]
	};
};
