import { Games } from '$lib';
import { Backend } from '$lib/backend';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const data = await parent();

	const currentYear = new Date().getFullYear();
	if (+params.year < 2014) {
		redirect(307, `/games/${params.gameId}/${params.mode}/2014`);
	} else if (+params.year > currentYear) {
		redirect(307, `/games/${params.gameId}/${params.mode}/${currentYear}`);
	}

	return {
		finishes: await Backend.getFinishes(data.user.$id, params.gameId, params.mode, +params.year),

		mode: params.mode,
		gameId: params.gameId,
		year: +params.year,
		game: Games[params.gameId]
	};
};
