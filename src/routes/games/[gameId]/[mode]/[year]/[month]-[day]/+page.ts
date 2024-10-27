import { Games, isInFuture } from '$lib';
import { Backend } from '$lib/backend';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	if (isInFuture(+params.year, +params.month, +params.day)) {
		redirect(307, `/games/${params.gameId}/${params.mode}/${params.year}`);
	}

	const data = await parent();

	const finishes = await Backend.getFinishes(
		data.user.$id,
		params.gameId,
		params.mode,
		+params.year
	);

	return {
		finished: finishes.levels.includes(`${+params.month}-${+params.day}`),
		mode: params.mode,
		gameId: params.gameId,
		year: +params.year,
		game: Games[params.gameId],
		month: +params.month,
		day: +params.day
	};
};
